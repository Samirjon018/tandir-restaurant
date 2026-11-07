import { supabase } from "@/lib/supabase";
import { menu as defaultMenu } from "@/data/menu";

export const ORDER_STATUSES = ["new", "cooking", "delivering", "done", "cancelled"];

/* ---------- Menyu ---------- */

const toDish = (r) => ({
  id: r.id,
  name: r.name,
  desc: r.description ?? "",
  price: r.price,
  category: r.category,
  emoji: r.emoji ?? "🍽️",
  image: r.image ?? "",
  popular: r.popular,
  available: r.available,
});

const fromDish = (d) => ({
  id: d.id,
  name: d.name,
  description: d.desc ?? "",
  price: d.price,
  category: d.category,
  emoji: d.emoji ?? "🍽️",
  image: d.image ?? "",
  popular: Boolean(d.popular),
  available: d.available !== false,
});

export async function getMenu() {
  const db = supabase();
  const { data, error } = await db.from("menu_items").select("*").order("id");
  if (error) throw error;

  // Baza bo'sh bo'lsa, boshlang'ich menyuni bir marta yozib qo'yamiz
  if (data.length === 0) {
    const rows = defaultMenu.map(fromDish);
    const { error: seedError } = await db.from("menu_items").upsert(rows);
    if (seedError) throw seedError;
    return rows.map(toDish);
  }

  return data.map(toDish);
}

export async function saveMenu(items) {
  const db = supabase();
  const rows = items.map(fromDish);

  const { error } = await db.from("menu_items").upsert(rows);
  if (error) throw error;

  // Ro'yxatda yo'q taomlarni bazadan o'chiramiz
  const ids = rows.map((r) => r.id);
  const del = db.from("menu_items").delete();
  const { error: delError } =
    ids.length > 0 ? await del.not("id", "in", `(${ids.join(",")})`) : await del.gte("id", 0);
  if (delError) throw delError;
}

/* ---------- Buyurtmalar ---------- */

const toOrder = (r) => ({
  id: r.id,
  createdAt: r.created_at,
  status: r.status,
  customer: r.customer,
  items: r.items,
  total: r.total,
});

export async function getOrders() {
  const { data, error } = await supabase()
    .from("orders")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data.map(toOrder);
}

export async function addOrder(order) {
  const { data, error } = await supabase()
    .from("orders")
    .insert({
      customer: order.customer,
      items: order.items,
      total: order.total,
      status: "new",
    })
    .select()
    .single();
  if (error) throw error;
  return toOrder(data);
}

export async function updateOrderStatus(id, status) {
  const { error } = await supabase().from("orders").update({ status }).eq("id", id);
  if (error) throw error;
  return getOrders();
}

export async function deleteOrder(id) {
  const { error } = await supabase().from("orders").delete().eq("id", id);
  if (error) throw error;
  return getOrders();
}