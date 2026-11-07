import { NextResponse } from "next/server";
import { addOrder, getMenu } from "@/lib/store";

const escapeHtml = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmt = (n) => new Intl.NumberFormat("ru-RU").format(n) + " so'm";

async function sendToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram sozlanmagan (.env.local ni tekshiring)");
    return false;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!res.ok) {
    console.error("Telegram xatosi:", await res.text());
    return false;
  }
  return true;
}

export async function POST(request) {
  try {
    const { customer, items } = await request.json();

    if (!customer?.name || !customer?.phone || !customer?.address || !items?.length) {
      return NextResponse.json({ error: "Ma'lumot to'liq emas" }, { status: 400 });
    }

    // Narxlarni mijozdan emas, serverdagi menyudan olamiz
    const menu = await getMenu();
    const safeItems = items
      .map((i) => {
        const dish = menu.find((d) => d.id === i.id);
        if (!dish || dish.available === false) return null;
        const qty = Math.min(50, Math.max(1, Math.floor(Number(i.qty) || 0)));
        return { id: dish.id, name: dish.name, price: dish.price, qty };
      })
      .filter(Boolean);

    if (safeItems.length === 0) {
      return NextResponse.json({ error: "Savatdagi taomlar topilmadi" }, { status: 400 });
    }

    const total = safeItems.reduce((s, i) => s + i.price * i.qty, 0);

    const order = await addOrder({
      customer: {
        name: String(customer.name).trim().slice(0, 100),
        phone: String(customer.phone).trim().slice(0, 30),
        address: String(customer.address).trim().slice(0, 300),
        comment: String(customer.comment || "").trim().slice(0, 500),
      },
      items: safeItems,
      total,
    });

    const lines = safeItems
      .map((i) => `• ${escapeHtml(i.name)} × ${i.qty} = ${fmt(i.price * i.qty)}`)
      .join("\n");

    const text =
      `🔥 <b>Yangi buyurtma #${order.id}</b>\n\n` +
      `👤 ${escapeHtml(order.customer.name)}\n` +
      `📞 ${escapeHtml(order.customer.phone)}\n` +
      `📍 ${escapeHtml(order.customer.address)}\n` +
      (order.customer.comment ? `💬 ${escapeHtml(order.customer.comment)}\n` : "") +
      `\n${lines}\n\n💰 <b>Jami: ${fmt(total)}</b>`;

    await sendToTelegram(text);

    return NextResponse.json({ id: order.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}