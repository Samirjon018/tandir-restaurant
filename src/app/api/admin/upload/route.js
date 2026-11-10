import { NextResponse } from "next/server";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { isAdmin } from "@/lib/auth";

const MAX_SIZE = 3 * 1024 * 1024; // 3 MB
const MIME = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

// Fayl turini nomiga emas, ichidagi haqiqiy belgilariga qarab aniqlaymiz
function detectType(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (
    buf.length > 8 &&
    buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  )
    return "png";
  if (
    buf.length > 12 &&
    buf.subarray(0, 4).toString() === "RIFF" &&
    buf.subarray(8, 12).toString() === "WEBP"
  )
    return "webp";
  return null;
}

export async function POST(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Fayl tanlanmagan" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Rasm 3 MB dan katta bo'lmasin" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = detectType(buf);
    if (!ext) {
      return NextResponse.json({ error: "Faqat JPG, PNG yoki WebP rasm mumkin" }, { status: 400 });
    }

    const name = `menu/${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
    const blob = await put(name, buf, { access: "public", contentType: MIME[ext] });

    return NextResponse.json({ path: blob.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Yuklashda xatolik" }, { status: 500 });
  }
}