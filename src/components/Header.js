"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/menu", key: "nav.menu" },
  { href: "/contacts", key: "nav.contacts" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          🔥 Tandir
        </Link>

        <nav className={`nav ${open ? "open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <Link href="/cart" className="cart-link" onClick={() => setOpen(false)}>
            🛒 {t("nav.cart")}
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <button className="burger" onClick={() => setOpen(!open)} aria-label={t("nav.toggle")}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}