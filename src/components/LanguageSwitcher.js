"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center font-bold">
      <button
        onClick={() => changeLanguage("uz")}
        className={`px-2 py-1 rounded ${lang === "uz" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"}`}
      >
        UZ
      </button>
      <button
        onClick={() => changeLanguage("ru")}
        className={`px-2 py-1 rounded ${lang === "ru" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"}`}
      >
        RU
      </button>
    </div>
  );
}