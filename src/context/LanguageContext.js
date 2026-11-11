"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LANG, translate } from "@/i18n/dictionaries";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ initialLang, children }) {
  const router = useRouter();
  const [lang, setLangState] = useState(initialLang);

  const setLang = (next) => {
    if (next === lang) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    setLangState(next);
    router.refresh(); // server komponentlar yangi tilda qayta chiziladi
  };

  const t = (key, vars) => translate(lang, key, vars);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);