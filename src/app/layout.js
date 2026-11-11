import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLang, getT } from "@/i18n/server";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-title",
});
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

export async function generateMetadata() {
  const { t } = await getT();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.ogDescription"),
      type: "website",
    },
  };
}

export default async function RootLayout({ children }) {
  const lang = await getLang();

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <LanguageProvider initialLang={lang}>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}