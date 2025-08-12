"use client";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useEffect, useState } from "react";

interface Props {
  dict: Record<string, string>;
  locale: "en" | "vi";
}

const items: Array<{ key: string; href: string; id: string }> = [
  { key: "nav.about", href: "#about", id: "about" },
  { key: "nav.projects", href: "#projects", id: "projects" },
  { key: "nav.experience", href: "#experience", id: "experience" },
  { key: "nav.skills", href: "#skills", id: "skills" },
  { key: "nav.contact", href: "#contact", id: "contact" }
];

export default function Navbar({ dict, locale }: Props) {
  const base = `/${locale}`;
  const [active, setActive] = useState<string>("about");

  // Scrollspy for active item (observes sections inside <main>)
  useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const sections = items
      .map(i => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: scroller, threshold: [0.5, 0.75] }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-[100]">
      <nav className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="glass rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-white/10">
          <Link href={base} className="font-semibold tracking-tight text-sm md:text-base text-gradient">
            <span>nean</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 rounded-xl bg-black/10 dark:bg-white/5 px-1 py-1">
            {items.map(({ key, href, id }) => (
              <a
                key={key}
                href={`${base}/${href}`}
                className={`text-sm px-3 py-1 rounded-lg transition ${
                  active === id ? "bg-white/20 dark:bg-white/10 text-white" : "opacity-80 hover:opacity-100"
                }`}
              >
                {dict[key]}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <LangToggle locale={locale} />
            <ThemeToggle />
            <a href="mailto:hello@example.com" className="opacity-80 hover:opacity-100" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/yourname"
              target="_blank"
              rel="noreferrer"
              className="opacity-80 hover:opacity-100"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
