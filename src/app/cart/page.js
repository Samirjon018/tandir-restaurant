"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { formatPriceLang, localName } from "@/i18n/dictionaries";

export default function CartPage() {
  const { items, add, decrease, remove, clear, total, loaded } = useCart();
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [orderId, setOrderId] = useState(null);

  const fp = (n) => formatPriceLang(n, lang);
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

  if (!loaded) {
    return (
      <section className="section">
        <div className="container">{t("cart.loading")}</div>
      </section>
    );
  }

  if (status === "done") {
    return (
      <section className="section">
        <div className="container empty">
          <div className="big">✅</div>
          <h1>{t("cart.doneTitle")}</h1>
          <p>
            {t("cart.orderNumber")} <b>#{orderId}</b>. {t("cart.contactSoon")}
          </p>
          <Link href="/menu" className="btn">{t("cart.again")}</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container empty">
          <div className="big">🛒</div>
          <h1>{t("cart.emptyTitle")}</h1>
          <p>{t("cart.emptyText")}</p>
          <Link href="/menu" className="btn">{t("cart.toMenu")}</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t("cart.title")}</h1>

        <div className="cart-layout">
          <div className="cart-list">
            {items.map((i) => (
              <div key={i.id} className="cart-item">
                <div className="cart-emoji">{i.emoji}</div>
                <div className="cart-info">
                  <h3>{localName(i, lang)}</h3>
                  <span>{fp(i.price)}</span>
                </div>
                <div className="qty">
                  <button onClick={() => decrease(i.id)}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => add(i)}>+</button>
                </div>
                <div className="cart-sum">{fp(i.price * i.qty)}</div>
                <button className="remove" onClick={() => remove(i.id)} aria-label={t("cart.remove")}>✕</button>
              </div>
            ))}
          </div>

          <form className="order-form" onSubmit={submit}>
            <h2>{t("cart.formTitle")}</h2>

            <label>{t("cart.name")}
              <input name="name" value={form.name} onChange={onChange} required placeholder={t("cart.namePh")} />
            </label>
            <label>{t("cart.phone")}
              <input name="phone" value={form.phone} onChange={onChange} required placeholder="+998 90 123 45 67" type="tel" />
            </label>
            <label>{t("cart.address")}
              <input name="address" value={form.address} onChange={onChange} required placeholder={t("cart.addressPh")} />
            </label>
            <label>{t("cart.comment")}
              <textarea name="comment" value={form.comment} onChange={onChange} rows={3} placeholder={t("cart.commentPh")} />
            </label>

            <div className="total-row">
              <span>{t("cart.total")}</span>
              <b>{fp(total)}</b>
            </div>

            {status === "error" && <p className="error">{t("cart.error")}</p>}

            <button className="btn btn-full" disabled={status === "sending"}>
              {status === "sending" ? t("cart.sending") : t("cart.submit")}
            </button>
            <button type="button" className="link-btn" onClick={clear}>{t("cart.clear")}</button>
          </form>
        </div>
      </div>
    </section>
  );
}