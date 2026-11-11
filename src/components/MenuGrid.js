"use client";

import Image from "next/image";
import { useState } from "react";
import { categories } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { formatPriceLang, localDesc, localName } from "@/i18n/dictionaries";

function DishImage({ dish, alt }) {
  const [failed, setFailed] = useState(false);

  if (!dish.image || failed) {
    return <div className="card-img card-img-emoji">{dish.emoji}</div>;
  }

  return (
    <div className="card-img">
      <Image
        src={dish.image}
        alt={alt}
        fill
        sizes="(max-width: 600px) 100vw, 280px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function MenuGrid({ items, showFilters = true }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [justAdded, setJustAdded] = useState(null);
  const { add } = useCart();
  const { t, lang } = useLang();

  const q = query.trim().toLowerCase();

  const list = items.filter((d) => {
    const byCategory = active === "all" || d.category === active;
    // Qidiruv ikkala tilda ham ishlaydi
    const bySearch =
      !q ||
      [d.name, d.nameRu, d.desc, d.descRu].some((s) => s && s.toLowerCase().includes(q));
    return byCategory && bySearch;
  });

  const handleAdd = (dish) => {
    add(dish);
    setJustAdded(dish.id);
    setTimeout(() => setJustAdded(null), 900);
  };

  return (
    <>
      {showFilters && (
        <>
          <div className="search-box">
            <input
              type="search"
              placeholder={t("menu.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="filters">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`chip ${active === c.id ? "chip-active" : ""}`}
                onClick={() => setActive(c.id)}
              >
                {t(`cat.${c.id}`)}
              </button>
            ))}
          </div>
        </>
      )}

      {list.length === 0 ? (
        <p className="no-results">{t("menu.noResults")}</p>
      ) : (
        <div className="grid">
          {list.map((dish) => (
            <article key={dish.id} className="card">
              {dish.popular && <span className="ribbon">⭐ {t("menu.popular")}</span>}
              <DishImage dish={dish} alt={localName(dish, lang)} />
              <div className="card-body">
                <h3>{localName(dish, lang)}</h3>
                <p>{localDesc(dish, lang)}</p>
                <div className="card-bottom">
                  <span className="price">{formatPriceLang(dish.price, lang)}</span>
                  <button className="btn btn-small" onClick={() => handleAdd(dish)}>
                    {justAdded === dish.id ? t("menu.added") : t("menu.add")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}