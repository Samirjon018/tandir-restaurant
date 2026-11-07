import Link from "next/link";
import { getMenu } from "@/lib/store";
import MenuGrid from "@/components/MenuGrid";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

const steps = [
  { icon: "🍽️", title: "Taom tanlang", text: "Menyudan o'zingizga yoqqan taomlarni savatga qo'shing." },
  { icon: "📝", title: "Buyurtma bering", text: "Ism, telefon va manzilni yozing, qolganini biz hal qilamiz." },
  { icon: "🚚", title: "Issiq yetkazamiz", text: "Buyurtmangiz tayyor bo'lgach, tezda eshigingizgacha olib boramiz." },
];

const reviews = [
  { name: "Dilshod", city: "Samarqand", text: "Tandir go'shtini yeb ko'rdim, juda yumshoq va mazali. Yetkazib berish ham tez bo'ldi." },
  { name: "Madina", city: "Samarqand", text: "Oilaviy tushlik uchun osh va samsa buyurtma berdik. Hammaga yoqdi, albatta yana buyurtma beramiz!" },
  { name: "Jasur", city: "Samarqand", text: "Sayt qulay, buyurtma berish bir daqiqa oldi. Taomlar issiq va yangi keldi." },
];

export default async function Home() {
  const menu = await getMenu();
  const visible = menu.filter((d) => d.available !== false);
  const popular = visible.filter((d) => d.popular);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-tag">O'zbek milliy oshxonasi</p>
          <h1>Tandirdan chiqqan haqiqiy ta'm</h1>
          <p className="hero-text">
            Samarqand oshi, tandir go'sht, issiq non va samsa. Barchasi yangi, issiq
            va an'anaviy retsept bo'yicha tayyorlanadi.
          </p>
          <div className="hero-buttons">
            <Link href="/menu" className="btn">Menyuni ko'rish</Link>
            <Link href="/contacts" className="btn btn-outline">Bog'lanish</Link>
          </div>
        </div>
      </section>

      {/* Statistika */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat"><b>{visible.length}+</b><span>xil taom</span></div>
          <div className="stat"><b>10+</b><span>yillik tajriba</span></div>
          <div className="stat"><b>5000+</b><span>mamnun mijoz</span></div>
          <div className="stat"><b>45</b><span>daqiqada yetkazish</span></div>
        </div>
      </section>

      {/* Ommabop taomlar */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Ommabop taomlar</h2>
          </Reveal>
          <Reveal delay={100}>
            <MenuGrid items={popular} showFilters={false} />
          </Reveal>
          <div className="center">
            <Link href="/menu" className="btn btn-outline">Barcha menyu →</Link>
          </div>
        </div>
      </section>

      {/* Qanday buyurtma beramiz */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Qanday buyurtma beramiz?</h2>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
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
          <Reveal>
            <div className="feature">
              <span>🔥</span>
              <h3>Haqiqiy tandir</h3>
              <p>Go'sht va non loydan yasalgan tandirda pishiriladi.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="feature">
              <span>🌿</span>
              <h3>Yangi mahsulotlar</h3>
              <p>Har kuni bozordan olingan yangi go'sht va sabzavotlar.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="feature">
              <span>🚚</span>
              <h3>Tez yetkazib berish</h3>
              <p>Shahar bo'ylab 45 daqiqa ichida eshigingizgacha.</p>
            </div>
          </Reveal>
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
              <h2 className="section-title left">Biz haqimizda</h2>
              <p>
                Tandir — oilaviy restoran. Biz ota-bobolarimizdan qolgan retseptlarni
                asrab, mehmonlarimizga har kuni issiq va mazali taomlar taqdim etamiz.
                Bizda har bir mehmon aziz.
              </p>
              <ul className="hours">
                <li><span>Dushanba – Juma</span><b>10:00 – 23:00</b></li>
                <li><span>Shanba – Yakshanba</span><b>09:00 – 00:00</b></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sharhlar */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Mijozlarimiz fikri</h2>
          </Reveal>
          <div className="reviews">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 120}>
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
            <h2>Ochqadingizmi? Hoziroq buyurtma bering!</h2>
            <p>Issiq taomlar tez orada eshigingizda bo'ladi.</p>
            <Link href="/menu" className="btn">Buyurtma berish</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}