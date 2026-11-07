import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "tandir_admin";
export const MAX_AGE = 60 * 60 * 24 * 7; // 7 kun

const secret = () => process.env.ADMIN_SECRET || "";

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createToken() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;

  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  return Number(exp) > Date.now();
}

export function checkPassword(input) {
  const pass = process.env.ADMIN_PASSWORD || "";
  if (!pass) return false;
  const a = crypto.createHash("sha256").update(String(input)).digest();
  const b = crypto.createHash("sha256").update(pass).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}