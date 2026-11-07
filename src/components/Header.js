"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/menu", label: "Menyu" },
  { href: "/contacts", label: "Kontaktlar" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
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
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/cart" className="cart-link" onClick={() => setOpen(false)}>
            🛒 Savat
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menyu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}