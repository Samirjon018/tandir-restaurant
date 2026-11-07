import { promises as fs } from "fs";
import path from "path";
import { menu as defaultMenu } from "@/data/menu";

const DIR = path.join(process.cwd(), ".data");

export const ORDER_STATUSES = ["new", "cooking", "delivering", "done", "cancelled"];

async function read(file, fallback) {
  try {
    const raw = await fs.readFile(path.join(DIR, file), "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function write(file, data) {
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, file), JSON.stringify(data, null, 2), "utf8");
}

/* ---------- Menyu ---------- */

export async function getMenu() {
  const saved = await read("menu.json", null);
  return saved ?? defaultMenu;
}

export async function saveMenu(items) {
  await write("menu.json", items);
}

/* ---------- Buyurtmalar ---------- */

export async function getOrders() {
  return read("orders.json", []);
}

export async function addOrder(order) {
  const orders = await getOrders();
  const id = orders.reduce((max, o) => Math.max(max, o.id), 1000) + 1;
  const full = {
    id,
    createdAt: new Date().toISOString(),
    status: "new",
    ...order,
  };
  orders.unshift(full);
  await write("orders.json", orders);
  return full;
}

export async function updateOrderStatus(id, status) {
  const orders = await getOrders();
  const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
  await write("orders.json", next);
  return next;
}

export async function deleteOrder(id) {
  const orders = await getOrders();
  const next = orders.filter((o) => o.id !== id);
  await write("orders.json", next);
  return next;
}