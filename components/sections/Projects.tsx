"use client";
import { motion } from "framer-motion";
import { ExternalLink, Film, MessageSquareMore, LayoutDashboard, Rocket } from "lucide-react";

const data = [
  { title: "AZM Cinema", desc: "Full-featured cinema website: auth, booking, seat selection, schedule — built with Next.js & Supabase.", href: "https://azmcinema.example.com", icon: Film, tags: ["Next.js", "Supabase", "Stripe", "Vercel"] },
  { title: "AI Web Chat App", desc: "ChatGPT-like app with conversation history, Firebase auth, and Studio AI integration.", href: "https://chat.example.com", icon: MessageSquareMore, tags: ["React", "Firebase", "Studio AI"] },
  { title: "Portfolio v2 (This Site)", desc: "Modern glassmorphism + animated gradients, EN/VI, dark/light, fully responsive.", href: "https://portfolio.example.com", icon: Rocket, tags: ["Next.js", "Tailwind", "Framer Motion"] },
  { title: "Minimal Productivity App (WIP)", desc: "Notion-like tasks/notes/scheduling with offline-first sync.", href: "https://github.com/yourname/productivity", icon: LayoutDashboard, tags: ["React Native", "Expo", "Supabase"] }
];

export default function Projects({ dict }: { dict: Record<string,string> }) {
  return (
    <section id="projects" className="snap-section">
      <div className="section">
        <h2 className="section-title text-gradient">{dict["projects.title"]}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {data.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="card hover-card group flex flex-col h-full"
              initial={{opacity:0, y:10}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{delay: i*0.05}}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <p.icon className="h-5 w-5 opacity-70" />
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>
                <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="opacity-80 mt-2">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags?.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full glass text-xs">{t}</span>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 h-28" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
