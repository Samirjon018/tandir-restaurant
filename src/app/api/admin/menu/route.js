import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getMenu, saveMenu } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });

function clean(d) {
  return {
    name: String(d.name || "").trim(),
    desc: String(d.desc || "").trim(),
    price: Math.max(0, Math.round(Number(d.price) || 0)),
    category: String(d.category || "main"),
    emoji: String(d.emoji || "🍽️"),
    image: String(d.image || "").trim(),
    popular: Boolean(d.popular),
    available: d.available !== false,
  };
}

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  return NextResponse.json(await getMenu());
}

export async function POST(request) {
  if (!(await isAdmin())) return unauthorized();

  const data = clean(await request.json());
  if (!data.name || !data.price) {
    return NextResponse.json({ error: "Nom va narx kerak" }, { status: 400 });
  }

  const items = await getMenu();
  const id = items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
  const item = { id, ...data };
  await saveMenu([...items, item]);
  return NextResponse.json(item);
}

export async function PUT(request) {
  if (!(await isAdmin())) return unauthorized();

  const body = await request.json();
  const id = Number(body.id);
  const data = clean(body);

  if (!data.name || !data.price) {
    return NextResponse.json({ error: "Nom va narx kerak" }, { status: 400 });
  }

  const items = await getMenu();
  await saveMenu(items.map((i) => (i.id === id ? { id, ...data } : i)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!(await isAdmin())) return unauthorized();

  const { id } = await request.json();
  const items = await getMenu();
  await saveMenu(items.filter((i) => i.id !== Number(id)));
  return NextResponse.json({ ok: true });
}