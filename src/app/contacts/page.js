export const metadata = { title: "Kontaktlar — Tandir" };

export default function ContactsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Kontaktlar</h1>

        <div className="contacts">
          <div className="contact-card">
            <span>📍</span>
            <h3>Manzil</h3>
            <p>Samarqand shahri, Sho'rboi mahallasi</p>
          </div>
          <div className="contact-card">
            <span>📞</span>
            <h3>Telefon</h3>
            <p><a href="tel:+998901234567">+998 33 300 30 00</a></p>
          </div>
          <div className="contact-card">
            <span>🕙</span>
            <h3>Ish vaqti</h3>
            <p>Har kuni 10:00 - 23:00</p>
          </div>
          <div className="contact-card">
            <span>✈️</span>
            <h3>Telegram</h3>
            <p><a href="https://t.me/Samirjon018" target="_blank" rel="noreferrer">@Samirjon018</a></p>
          </div>
        </div>

        <div className="map-box">
          <iframe
            title="Xarita"
            src="https://www.openstreetmap.org/export/embed.html?bbox=66.9540%2C39.6500%2C66.9740%2C39.6600&layer=mapnik"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}