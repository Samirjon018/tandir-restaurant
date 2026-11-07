"use client";

import Image from "next/image";
import { useState } from "react";
import { categories, formatPrice } from "@/data/menu";
import { useCart } from "@/context/CartContext";

function DishImage({ dish }) {
  const [failed, setFailed] = useState(false);

  if (!dish.image || failed) {
    return <div className="card-img card-img-emoji">{dish.emoji}</div>;
  }

  return (
    <div className="card-img">
      <Image
        src={dish.image}
        alt={dish.name}
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

  const q = query.trim().toLowerCase();

  const list = items.filter((d) => {
    const byCategory = active === "all" || d.category === active;
    const bySearch =
      !q || d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
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
              placeholder="🔎 Taom qidirish..."
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
                {c.name}
              </button>
            ))}
          </div>
        </>
      )}

      {list.length === 0 ? (
        <p className="no-results">Hech narsa topilmadi 😔 Boshqa so'z bilan urinib ko'ring.</p>
      ) : (
        <div className="grid">
          {list.map((dish) => (
            <article key={dish.id} className="card">
              {dish.popular && <span className="ribbon">⭐ Ommabop</span>}
              <DishImage dish={dish} />
              <div className="card-body">
                <h3>{dish.name}</h3>
                <p>{dish.desc}</p>
                <div className="card-bottom">
                  <span className="price">{formatPrice(dish.price)}</span>
                  <button className="btn btn-small" onClick={() => handleAdd(dish)}>
                    {justAdded === dish.id ? "✓ Qo'shildi" : "+ Savatga"}
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