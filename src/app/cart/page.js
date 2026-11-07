"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/menu";

export default function CartPage() {
  const { items, add, decrease, remove, clear, total, loaded } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [orderId, setOrderId] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items, total }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrderId(data.id);
      clear();
      setForm({ name: "", phone: "", address: "", comment: "" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!loaded) return <section className="section"><div className="container">Yuklanmoqda...</div></section>;

  if (status === "done") {
    return (
      <section className="section">
        <div className="container empty">
          <div className="big">✅</div>
          <h1>Buyurtmangiz qabul qilindi!</h1>
          <p>Buyurtma raqami: <b>#{orderId}</b>. Tez orada operatorimiz siz bilan bog'lanadi.</p>
          <Link href="/menu" className="btn">Yana buyurtma berish</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container empty">
          <div className="big">🛒</div>
          <h1>Savat bo'sh</h1>
          <p>Menyudan o'zingizga yoqqan taomlarni tanlang.</p>
          <Link href="/menu" className="btn">Menyuga o'tish</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Savat</h1>

        <div className="cart-layout">
          <div className="cart-list">
            {items.map((i) => (
              <div key={i.id} className="cart-item">
                <div className="cart-emoji">{i.emoji}</div>
                <div className="cart-info">
                  <h3>{i.name}</h3>
                  <span>{formatPrice(i.price)}</span>
                </div>
                <div className="qty">
                  <button onClick={() => decrease(i.id)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => add(i)}>+</button>
                </div>
                <div className="cart-sum">{formatPrice(i.price * i.qty)}</div>
                <button className="remove" onClick={() => remove(i.id)} aria-label="O'chirish">✕</button>
              </div>
            ))}
          </div>

          <form className="order-form" onSubmit={submit}>
            <h2>Buyurtma berish</h2>

            <label>Ismingiz
              <input name="name" value={form.name} onChange={onChange} required placeholder="Ism" />
            </label>
            <label>Telefon
              <input name="phone" value={form.phone} onChange={onChange} required placeholder="+998 90 123 45 67" type="tel" />
            </label>
            <label>Manzil
              <input name="address" value={form.address} onChange={onChange} required placeholder="Ko'cha, uy, xonadon" />
            </label>
            <label>Izoh
              <textarea name="comment" value={form.comment} onChange={onChange} rows={3} placeholder="Qo'shimcha istaklar (ixtiyoriy)" />
            </label>

            <div className="total-row">
              <span>Jami:</span>
              <b>{formatPrice(total)}</b>
            </div>

            {status === "error" && <p className="error">Xatolik bo'ldi, qayta urinib ko'ring.</p>}

            <button className="btn btn-full" disabled={status === "sending"}>
              {status === "sending" ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
            </button>
            <button type="button" className="link-btn" onClick={clear}>Savatni tozalash</button>
          </form>
        </div>
      </div>
    </section>
  );
}