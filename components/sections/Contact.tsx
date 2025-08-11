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
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Something went wrong");
    }
  }

  return (
    <section id="contact" className="snap-section">
      <div className="section">
        <h2 className="section-title text-gradient">{dict["contact.title"]}</h2>
        <p className="section-sub">{dict["contact.subtitle"]}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={onSubmit} className="card hover-card">
            <label className="block text-sm opacity-80">{dict["contact.name"]}</label>
            <input required value={name} onChange={e=>setName(e.target.value)} className="input mt-1" />

            <label className="block text-sm opacity-80 mt-4">{dict["contact.email"]}</label>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input mt-1" />

            <label className="block text-sm opacity-80 mt-4">{dict["contact.message"]}</label>
            <textarea required value={message} onChange={e=>setMessage(e.target.value)} rows={5} className="input mt-1" />

            <button disabled={status === "loading"} type="submit" className="btn btn-primary mt-4 disabled:opacity-60">
              {status === "loading" ? "Sending..." : dict["contact.send"]}
            </button>
            {status === "success" && <p className="mt-3 text-sm text-emerald-400">Thanks! I'll get back to you soon.</p>}
            {status === "error" && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </form>

          <div className="card hover-card">
            <p className="opacity-80">Prefer email? <a className="underline" href="mailto:hello@example.com">hello@example.com</a></p>
            <div className="mt-4 h-48 rounded-xl bg-gradient-to-br from-emerald-500/15 to-indigo-500/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
