import { isAdmin } from "@/lib/auth";
import { getMenu, getOrders } from "@/lib/store";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";

export const metadata = {
  title: "Admin — Tandir",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />;

  const [orders, menu] = await Promise.all([getOrders(), getMenu()]);
  return <AdminPanel initialOrders={orders} initialMenu={menu} />;
}