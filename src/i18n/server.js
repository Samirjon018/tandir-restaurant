import { cookies } from "next/headers";
import { DEFAULT_LANG, LANGS, translate } from "@/i18n/dictionaries";

export async function getLang() {
  const store = await cookies();
  const value = store.get("lang")?.value;
  return LANGS.includes(value) ? value : DEFAULT_LANG;
}

export async function getT() {
  const lang = await getLang();
  return { lang, t: (key, vars) => translate(lang, key, vars) };
}