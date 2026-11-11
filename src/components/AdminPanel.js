"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, formatPrice } from "@/data/menu";

const STATUSES = [
  { id: "new", label: "Yangi" },
  { id: "cooking", label: "Tayyorlanmoqda" },
  { id: "delivering", label: "Yo'lda" },
  { id: "done", label: "Yetkazildi" },
  { id: "cancelled", label: "Bekor qilindi" },
];

const emptyDish = {
  name: "",
  desc: "",
  price: "",
  category: "main",
  emoji: "🍽️",
  image: "",
  popular: false,
  available: true,
};

const json = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

function Thumb({ dish }) {
  const [failed, setFailed] = useState(false);

  if (!dish.image || failed) return <span className="dish-emoji">{dish.emoji}</span>;

  // eslint-disable-next-line @next/next/no-img-element
  return <img className="thumb" src={dish.image} alt={dish.name} onError={() => setFailed(true)} />;
}

export default function AdminPanel({ initialOrders, initialMenu }) {
  const router = useRouter();
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [menu, setMenu] = useState(initialMenu);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(null); // null = forma yopiq
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadOrders = useCallback(async () => {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    if (res.ok) setOrders(await res.json());
  }, [router]);

  const loadMenu = async () => {
    const res = await fetch("/api/admin/menu", { cache: "no-store" });
    if (res.ok) setMenu(await res.json());
  };

  // Yangi buyurtmalar uchun har 20 soniyada yangilab turadi
  useEffect(() => {
    const t = setInterval(loadOrders, 20000);
    return () => clearInterval(t);
  }, [loadOrders]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  /* ---------- Buyurtmalar ---------- */

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/admin/orders", json("PATCH", { id, status }));
    if (res.ok) setOrders(await res.json());
  };

  const removeOrder = async (id) => {
    if (!confirm(`#${id} buyurtmani o'chirasizmi?`)) return;
    const res = await fetch("/api/admin/orders", json("DELETE", { id }));
    if (res.ok) setOrders(await res.json());
  };

  const shownOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const newCount = orders.filter((o) => o.status === "new").length;

  /* ---------- Menyu ---------- */

  const onField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      setForm((f) => ({ ...f, image: data.path }));
    } else {
      setError(data.error || "Yuklashda xatolik");
    }

    setUploading(false);
    e.target.value = "";
  };

  const saveDish = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/menu", json(form.id ? "PUT" : "POST", form));
    if (res.ok) {
      await loadMenu();
      setForm(null);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Saqlashda xatolik");
    }
  };

  const removeDish = async (dish) => {
    if (!confirm(`"${dish.name}" ni menyudan o'chirasizmi?`)) return;
    const res = await fetch("/api/admin/menu", json("DELETE", { id: dish.id }));
    if (res.ok) await loadMenu();
  };

  const toggleAvailable = async (dish) => {
    const res = await fetch(
      "/api/admin/menu",
      json("PUT", { ...dish, available: dish.available === false })
    );
    if (res.ok) await loadMenu();
  };

  const catName = (id) => categories.find((c) => c.id === id)?.name || id;

  return (
    <section className="section">
      <div className="container">
        <div className="admin-bar">
          <h1>⚙️ Admin panel</h1>
          <div className="admin-tabs">
            <button className={`chip ${tab === "orders" ? "chip-active" : ""}`} onClick={() => setTab("orders")}>
              Buyurtmalar {newCount > 0 && <span className="badge">{newCount}</span>}
            </button>
            <button className={`chip ${tab === "menu" ? "chip-active" : ""}`} onClick={() => setTab("menu")}>
              Menyu ({menu.length})
            </button>
            <button className="chip" onClick={logout}>Chiqish</button>
          </div>
        </div>

        {/* ===== BUYURTMALAR ===== */}
        {tab === "orders" && (
          <>
            <div className="filters left">
              <button className={`chip ${filter === "all" ? "chip-active" : ""}`} onClick={() => setFilter("all")}>
                Hammasi ({orders.length})
              </button>
              {STATUSES.map((s) => (
                <button
                  key={s.id}
                  className={`chip ${filter === s.id ? "chip-active" : ""}`}
                  onClick={() => setFilter(s.id)}
                >
                  {s.label} ({orders.filter((o) => o.status === s.id).length})
                </button>
              ))}
              <button className="chip" onClick={loadOrders}>🔄 Yangilash</button>
            </div>

            {shownOrders.length === 0 ? (
              <p className="no-results">Buyurtmalar yo'q.</p>
            ) : (
              <div className="orders">
                {shownOrders.map((o) => (
                  <div key={o.id} className={`order-card status-${o.status}`}>
                    <div className="order-head">
                      <b>#{o.id}</b>
                      <span className="order-date" suppressHydrationWarning>
                        {new Date(o.createdAt).toLocaleString("ru-RU")}
                      </span>
                      <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)}>
                        {STATUSES.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="order-body">
                      <p>👤 {o.customer.name}</p>
                      <p>📞 <a href={`tel:${o.customer.phone}`}>{o.customer.phone}</a></p>
                      <p>📍 {o.customer.address}</p>
                      {o.customer.comment && <p>💬 {o.customer.comment}</p>}
                      <ul>
                        {o.items.map((i) => (
                          <li key={i.id}>
                            {i.name} × {i.qty} — {formatPrice(i.price * i.qty)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="order-foot">
                      <b>Jami: {formatPrice(o.total)}</b>
                      <button className="link-btn danger" onClick={() => removeOrder(o.id)}>O'chirish</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== MENYU ===== */}
        {tab === "menu" && (
          <>
            {form === null && (
              <button className="btn" onClick={() => setForm({ ...emptyDish })}>+ Yangi taom</button>
            )}

            {form !== null && (
              <form className="dish-form" onSubmit={saveDish}>
                <h2>{form.id ? "Taomni tahrirlash" : "Yangi taom"}</h2>

                <div className="dish-form-grid">
                  <label>Nomi
                    <input name="name" value={form.name} onChange={onField} required />
                  </label>
                  <label>Narxi (so'm)
                    <input name="price" type="number" min="0" step="500" value={form.price} onChange={onField} required />
                  </label>
                  <label>Kategoriya
                    <select name="category" value={form.category} onChange={onField}>
                      {categories.filter((c) => c.id !== "all").map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>Emoji
                    <input name="emoji" value={form.emoji} onChange={onField} />
                  </label>

                  <div className="wide">
                    <span className="field-title">Rasm</span>
                    <div className="image-field">
                      {form.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="image-preview" src={form.image} alt="Ko'rinish" />
                      ) : (
                        <div className="image-preview empty">{form.emoji || "🍽️"}</div>
                      )}

                      <div className="image-actions">
                        <label className="btn btn-small btn-outline file-btn">
                          {uploading ? "Yuklanmoqda..." : "📷 Rasm yuklash"}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="file-hidden"
                            onChange={uploadImage}
                            disabled={uploading}
                          />
                        </label>
                        {form.image && (
                          <button
                            type="button"
                            className="link-btn danger"
                            onClick={() => setForm({ ...form, image: "" })}
                          >
                            Rasmni olib tashlash
                          </button>
                        )}
                        <small>JPG, PNG yoki WebP, 3 MB gacha</small>
                      </div>
                    </div>

                    <label className="image-path">Yoki rasm yo'li (qo'lda)
                      <input name="image" value={form.image} onChange={onField} placeholder="/images/menu/osh.jpg" />
                    </label>
                  </div>

                  <label className="wide">Tavsif
                    <textarea name="desc" rows={2} value={form.desc} onChange={onField} />
                    <label className="wide">Nomi (ruscha)
                    <input name="nameRu" value={form.nameRu || ""} onChange={onField} />
                      </label>
                       <label className="wide">Tavsif (ruscha)
                    <textarea name="descRu" rows={2} value={form.descRu || ""} onChange={onField} />
                     </label>
                  </label>
                </div>

                <div className="checks">
                  <label><input type="checkbox" name="popular" checked={form.popular} onChange={onField} /> Ommabop (bosh sahifada)</label>
                  <label><input type="checkbox" name="available" checked={form.available !== false} onChange={onField} /> Menyuda ko'rinsin</label>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="form-buttons">
                  <button className="btn" disabled={uploading}>Saqlash</button>
                  <button type="button" className="btn btn-outline" onClick={() => { setForm(null); setError(""); }}>
                    Bekor qilish
                  </button>
                </div>
              </form>
            )}

            <div className="dish-list">
              {menu.map((d) => (
                <div key={d.id} className={`dish-row ${d.available === false ? "hidden-dish" : ""}`}>
                  <Thumb dish={d} />
                  <div className="dish-info">
                    <b>{d.name}</b>
                    <small>
                      {catName(d.category)} · {formatPrice(d.price)}
                      {d.popular && " · ⭐ Ommabop"}
                      {d.available === false && " · 🚫 Yashirilgan"}
                    </small>
                  </div>
                  <div className="dish-actions">
                    <button
                      className="link-btn"
                      onClick={() => { setForm({ ...d }); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      Tahrirlash
                    </button>
                    <button className="link-btn" onClick={() => toggleAvailable(d)}>
                      {d.available === false ? "Ko'rsatish" : "Yashirish"}
                    </button>
                    <button className="link-btn danger" onClick={() => removeDish(d)}>O'chirish</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}