import { getMenu } from "@/lib/store";
import MenuGrid from "@/components/MenuGrid";
import { getT } from "@/i18n/server";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { t } = await getT();
  return { title: t("meta.menu") };
}

export default async function MenuPage() {
  const { t } = await getT();
  const menu = (await getMenu()).filter((d) => d.available !== false);

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t("menu.title")}</h1>
        <MenuGrid items={menu} />
      </div>
    </section>
  );
}