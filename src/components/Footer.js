import Link from "next/link";
import { getT } from "@/i18n/server";

export default async function Footer() {
  const { t } = await getT();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>🔥 Tandir</h3>
          <p>{t("footer.tagline")}</p>
        </div>
        <div>
          <h4>{t("footer.pages")}</h4>
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/menu">{t("nav.menu")}</Link>
          <Link href="/cart">{t("nav.cart")}</Link>
          <Link href="/contacts">{t("nav.contacts")}</Link>
        </div>
        <div>
          <h4>{t("footer.hours")}</h4>
          <p>{t("footer.hoursValue")}</p>
          <p>📞 +998 90 123 45 67</p>
          <p>📍 {t("footer.address")}</p>
        </div>
      </div>
      <div className="copyright">© 2026 Tandir. {t("footer.rights")}</div>
    </footer>
  );
}