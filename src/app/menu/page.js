import { getMenu } from "@/lib/store";
import MenuGrid from "@/components/MenuGrid";

export const metadata = { title: "Menyu — Tandir" };
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const menu = (await getMenu()).filter((d) => d.available !== false);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Bizning menyu</h1>
        <MenuGrid items={menu} />
      </div>
    </section>
  );
}