"use client";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-xl font-bold">Restoran Logo</div>
      <div className="flex gap-6 items-center">
        <a href="#menu">{t("header.menu")}</a>
        <a href="#about">{t("header.about")}</a>
        <a href="#contacts">{t("header.contacts")}</a>
        
        {/* Tilni o'zgartirish tugmasi */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}