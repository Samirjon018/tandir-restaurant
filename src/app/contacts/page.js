import { getT } from "@/i18n/server";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("meta.contacts") };
}

export default async function ContactsPage() {
  const { t } = await getT();

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t("contacts.title")}</h1>

        <div className="contacts">
          <div className="contact-card">
            <span>📍</span>
            <h3>{t("contacts.address")}</h3>
            <p>{t("contacts.addressValue")}</p>
          </div>
          <div className="contact-card">
            <span>📞</span>
            <h3>{t("contacts.phone")}</h3>
            <p><a href="tel:+998901234567">+998 90 123 45 67</a></p>
          </div>
          <div className="contact-card">
            <span>🕙</span>
            <h3>{t("contacts.hours")}</h3>
            <p>{t("contacts.hoursValue")}</p>
          </div>
          <div className="contact-card">
            <span>✈️</span>
            <h3>{t("contacts.telegram")}</h3>
            <p><a href="https://t.me/tandir_uz" target="_blank" rel="noreferrer">@tandir_uz</a></p>
          </div>
        </div>

        <div className="map-box">
          <iframe
            title={t("contacts.map")}
            src="https://www.openstreetmap.org/export/embed.html?bbox=66.9540%2C39.6500%2C66.9740%2C39.6600&layer=mapnik"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}