import { createClient } from "redis";
import { menu as defaultMenu } from "@/data/menu";

export const ORDER_STATUSES = ["new", "cooking", "delivering", "done", "cancelled"];

let clientPromise;

// Redis bilan ulanishni bir marta ochib, qayta ishlatamiz
function db() {
  if (!clientPromise) {
    const url = (process.env.REDIS_URL || "").trim();
    if (!url) {
      throw new Error("REDIS_URL yo'q: Vercel → Storage da Redis ni loyihaga ulang");
    }

    const client = createClient({ url });
    client.on("error", (e) => console.error("Redis xatosi:", e));

    clientPromise = client
      .connect()
      .then(() => client)
      .catch((e) => {
        clientPromise = undefined;
        throw e;
      });
  }
  return clientPromise;
}

/* ---------- Menyu ---------- */

const normalize = (d) => ({
  ...d,
  popular: Boolean(d.popular),
  available: d.available !== false,
});

export async function getMenu() {
  try {
    const r = await db();
    const raw = await r.get("menu");
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) return saved;
    }
  } catch (e) {
    console.error("getMenu xatosi:", e);
  }
  // Hali saqlanmagan bo'lsa yoki baza ishlamasa, boshlang'ich menyu
  return defaultMenu.map(normalize);
}

export async function saveMenu(items) {
  const r = await db();
  await r.set("menu", JSON.stringify(items));
}

/* ---------- Buyurtmalar ---------- */

export async function getOrders() {
  const r = await db();
  const all = await r.hGetAll("orders");

  return Object.values(all)
    .map((s) => JSON.parse(s))
    .sort((a, b) => b.id - a.id);
}

export async function addOrder(order) {
  const r = await db();
  const id = 1000 + (await r.incr("order:seq"));

  const full = {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    ...order,
  };

  await r.hSet("orders", String(id), JSON.stringify(full));
  return full;
}

export async function updateOrderStatus(id, status) {
  const r = await db();
  const raw = await r.hGet("orders", String(id));
  if (raw) {
    await r.hSet("orders", String(id), JSON.stringify({ ...JSON.parse(raw), status }));
  }
  return getOrders();
}

export async function deleteOrder(id) {
  const r = await db();
  await r.hDel("orders", String(id));
  return getOrders();
}