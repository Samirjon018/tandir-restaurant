"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Xatolik");
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <form className="admin-login" onSubmit={submit}>
          <h1>🔐 Admin</h1>
          <p>Davom etish uchun parolni kiriting.</p>
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="btn btn-full" disabled={loading}>
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </section>
  );
}