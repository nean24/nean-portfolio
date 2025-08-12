"use client";
import { useState } from "react";

export default function Contact({ dict }: { dict: Record<string,string> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setName(""); setEmail(""); setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="snap-section">
      <div className="section">
        <h2 className="section-title">{dict["contact.title"]}</h2>
        <p className="opacity-80 mb-6">{dict["contact.subtitle"]}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={onSubmit} className="card">
            <label className="block text-sm opacity-80">{dict["contact.name"]}</label>
            <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 bg-white/70 dark:bg-black/30 border border-white/30 outline-none" />

            <label className="block text-sm opacity-80 mt-4">{dict["contact.email"]}</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl px-3 py-2 bg-white/70 dark:bg-black/30 border border-white/30 outline-none" />

            <label className="block text-sm opacity-80 mt-4">{dict["contact.message"]}</label>
            <textarea required value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="mt-1 w-full rounded-xl px-3 py-2 bg-white/70 dark:bg-black/30 border border-white/30 outline-none" />

            <button disabled={status === "loading"} type="submit" className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:opacity-90 disabled:opacity-60">
              {status === "loading" ? "Sending..." : dict["contact.send"]}
            </button>
            {status === "success" && <p className="mt-3 text-sm text-emerald-600">Thanks! I&apos;ll get back to you soon.</p>}
            {status === "error" && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </form>

          <div className="card">
            <p className="opacity-80">Prefer email? <a className="underline" href="mailto:hello@example.com">hello@example.com</a></p>
            <div className="mt-4 h-48 rounded-xl bg-gradient-to-br from-emerald-500/15 to-indigo-500/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
