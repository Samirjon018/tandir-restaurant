"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price, emoji, qty }]
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tandir-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("tandir-cart", JSON.stringify(items));
  }, [items, loaded]);

  const add = (dish) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === dish.id);
      if (found) return prev.map((i) => (i.id === dish.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, emoji: dish.emoji, qty: 1 }];
    });

  const decrease = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    );

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, add, decrease, remove, clear, count, total, loaded }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);