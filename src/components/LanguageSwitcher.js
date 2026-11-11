"use client";

import { useLang } from "@/context/LanguageContext";

const options = [
  { id: "uz", label: "UZ" },
  { id: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={lang === o.id ? "active" : ""}
          onClick={() => setLang(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}