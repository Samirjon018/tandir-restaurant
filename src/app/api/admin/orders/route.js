import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getOrders, updateOrderStatus, deleteOrder, ORDER_STATUSES } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  return NextResponse.json(await getOrders());
}

export async function PATCH(request) {
  if (!(await isAdmin())) return unauthorized();
  const { id, status } = await request.json();

  if (!ORDER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Holat noto'g'ri" }, { status: 400 });
  }
  return NextResponse.json(await updateOrderStatus(Number(id), status));
}

export async function DELETE(request) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await request.json();
  return NextResponse.json(await deleteOrder(Number(id)));
}