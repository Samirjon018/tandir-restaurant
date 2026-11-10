"use client";
import { createContext, useContext, useState, useEffect } from "react";
import uz from "../locales/uz.json";
import ru from "../locales/ru.json";

const translations = { uz, ru };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("uz"); // Boshlang'ich til: O'zbekcha

  // Sahifa yuklanganda saqlangan tilni o'qib olish (Local Storage)
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && (savedLang === "uz" || savedLang === "ru")) {
      setLang(savedLang);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (path) => {
    // Matnlarni key bo'yicha topish (masalan: "header.menu")
    const keys = path.split(".");
    let result = translations[lang];
    for (const key of keys) {
      if (result[key]) {
        result = result[key];
      } else {
        return path; // Topilmasa keyning o'zi qaytadi
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);