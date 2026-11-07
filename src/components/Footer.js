import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>🔥 Tandir</h3>
          <p>O'zbek milliy taomlari. Tandirdan yangi, issiq, mehr bilan.</p>
        </div>
        <div>
          <h4>Sahifalar</h4>
          <Link href="/">Bosh sahifa</Link>
          <Link href="/menu">Menyu</Link>
          <Link href="/cart">Savat</Link>
          <Link href="/contacts">Kontaktlar</Link>
        </div>
        <div>
          <h4>Ish vaqti</h4>
          <p>Har kuni: 10:00 – 23:00</p>
          <p>📞 +998 90 123 45 67</p>
          <p>📍 Samarqand, Registon ko'chasi 12</p>
        </div>
      </div>
      <div className="copyright">© 2026 Tandir. Barcha huquqlar himoyalangan.</div>
    </footer>
  );
}