 import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";

import Header from "@/components/Header";

import Footer from "@/components/Footer";



const playfair = Playfair_Display({

  subsets: ["latin", "cyrillic"],

  variable: "--font-title",

});

const inter = Inter({

  subsets: ["latin", "cyrillic"],

  variable: "--font-body",

});



export const metadata = {

  title: "Tandir — O'zbek milliy taomlari restorani",

  description:

    "Tandir go'sht, osh, manti, samsa va boshqa milliy taomlar. Onlayn buyurtma bering.",

  openGraph: {

    title: "Tandir — O'zbek milliy taomlari",

    description: "Tandirdan chiqqan haqiqiy ta'm. Onlayn buyurtma bering.",

    type: "website",

  },

};



export default function RootLayout({ children }) {

  return (

    <html lang="uz" data-scroll-behavior="smooth">

      <body className={`${playfair.variable} ${inter.variable}`}>

        <CartProvider>

          <Header />

          <main>{children}</main>

          <Footer />

        </CartProvider>

      </body>

    </html>

  );

}





export default function RootLayout({ children }) {

  return (

    <html lang="uz">

      <body>

        <LanguageProvider>

          {children}

        </LanguageProvider>

      </body>

    </html>

  );

} 