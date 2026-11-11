import Link from "next/link";
import { getMenu } from "@/lib/store";
import MenuGrid from "@/components/MenuGrid";
import Reveal from "@/components/Reveal";
import { getT } from "@/i18n/server";

export const dynamic = "force-dynamic";

const STEP_ICONS = ["🍽️", "📝", "🚚"];

export default async function Home() {
  const { t } = await getT();
  const menu = await getMenu();
  const visible = menu.filter((d) => d.available !== false);
  const popular = visible.filter((d) => d.popular);

  const steps = [1, 2, 3].map((n) => ({
    icon: STEP_ICONS[n - 1],
    title: t(`steps.${n}.title`),
    text: t(`steps.${n}.text`),
  }));

  const reviews = [1, 2, 3].map((n) => ({
    name: t(`review.${n}.name`),
    city: t("review.city"),
    text: t(`review.${n}.text`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-tag">{t("hero.tag")}</p>
          <h1>{t("hero.title")}</h1>
          <p className="hero-text">{t("hero.text")}</p>
          <div className="hero-buttons">
            <Link href="/menu" className="btn">{t("hero.btnMenu")}</Link>
            <Link href="/contacts" className="btn btn-outline">{t("hero.btnContact")}</Link>
          </div>
        </div>
      </section>

      {/* Statistika */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat"><b>{visible.length}+</b><span>{t("stats.dishes")}</span></div>
          <div className="stat"><b>10+</b><span>{t("stats.years")}</span></div>
          <div className="stat"><b>5000+</b><span>{t("stats.clients")}</span></div>
          <div className="stat"><b>45</b><span>{t("stats.delivery")}</span></div>
        </div>
      </section>

      {/* Ommabop taomlar */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">{t("popular.title")}</h2>
          </Reveal>
          <Reveal delay={100}>
            <MenuGrid items={popular} showFilters={false} />
          </Reveal>
          <div className="center">
            <Link href="/menu" className="btn btn-outline">{t("popular.all")}</Link>
          </div>
        </div>
      </section>

      {/* Qanday buyurtma beramiz */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">{t("steps.title")}</h2>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="step">
                  <div className="step-num">{i + 1}</div>
                  <div className="step-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Afzalliklar */}
      <section className="section">
        <div className="container features">
          {[
            { icon: "🔥", n: 1 },
            { icon: "🌿", n: 2 },
            { icon: "🚚", n: 3 },
          ].map((f, i) => (
            <Reveal key={f.n} delay={i * 120}>
              <div className="feature">
                <span>{f.icon}</span>
                <h3>{t(`feature.${f.n}.title`)}</h3>
                <p>{t(`feature.${f.n}.text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Biz haqimizda + ish vaqti */}
      <section className="section section-alt">
        <div className="container about">
          <Reveal>
            <div className="about-img">🍖</div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 className="section-title left">{t("about.title")}</h2>
              <p>{t("about.text")}</p>
              <ul className="hours">
                <li><span>{t("hours.weekdays")}</span><b>10:00 – 23:00</b></li>
                <li><span>{t("hours.weekend")}</span><b>09:00 – 00:00</b></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sharhlar */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">{t("reviews.title")}</h2>
          </Reveal>
          <div className="reviews">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="review">
                  <div className="stars">★★★★★</div>
                  <p>“{r.text}”</p>
                  <div className="review-author">
                    <b>{r.name}</b>
                    <span>{r.city}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Yakuniy chaqiruv */}
      <section className="cta">
        <div className="container">
          <Reveal>
            <h2>{t("cta.title")}</h2>
            <p>{t("cta.text")}</p>
            <Link href="/menu" className="btn">{t("cta.btn")}</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}