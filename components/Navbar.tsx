"use client";
import Link from "next/link";
import { Mail, Menu, X, GitBranch } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useEffect, useState } from "react";

interface Props {
  dict: Record<string, string>;
  locale: "en" | "vi";
  email?: string;
  githubUrl?: string;
}

const items: Array<{ key: string; href: string; id: string }> = [
  { key: "nav.about", href: "#about", id: "about" },
  { key: "nav.projects", href: "#projects", id: "projects" },
  { key: "nav.experience", href: "#experience", id: "experience" },
  { key: "nav.skills", href: "#skills", id: "skills" },
  { key: "nav.contact", href: "#contact", id: "contact" }
];

export default function Navbar({ dict, locale, email = "hello@example.com", githubUrl = "https://github.com/yourname" }: Props) {
  const base = `/${locale}`;
  const [active, setActive] = useState<string>("about");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scrollspy for active item (observes sections inside <main>)
  useEffect(() => {
    // Wait for DOM to be fully ready
    const timer = setTimeout(() => {
      const scroller = document.querySelector("main");
      if (!scroller) return;
      
      const sections = items
        .map(i => document.getElementById(i.id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return; // No sections found, exit early

      const obs = new IntersectionObserver(
        (entries) => {
          // Filter for visible sections with meaningful intersection
          const visibleSections = entries
            .filter(e => e.isIntersecting && e.intersectionRatio > 0.3)
            .sort((a, b) => {
              // Prioritize sections that are more visible
              if (b.intersectionRatio !== a.intersectionRatio) {
                return b.intersectionRatio - a.intersectionRatio;
              }
              // If equal visibility, prioritize the one closer to the top
              return a.boundingClientRect.top - b.boundingClientRect.top;
            });
          
          if (visibleSections.length > 0 && visibleSections[0].target?.id) {
            setActive(visibleSections[0].target.id);
          }
        },
        { 
          root: scroller, 
          threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
          rootMargin: "-10% 0px -10% 0px" // Ignore top/bottom 10% for better UX
        }
      );

      sections.forEach(s => obs.observe(s));
      return () => obs.disconnect();
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
                href={href}
                className={`text-sm px-3 py-1 rounded-lg transition ${
                  active === id ? "bg-white/20 dark:bg-white/10 text-white" : "opacity-80 hover:opacity-100"
                }`}
              >
                {dict[key]}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg opacity-80 hover:opacity-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            <LangToggle locale={locale} />
            <ThemeToggle />
            <a href={`mailto:${email}`} className="opacity-80 hover:opacity-100" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="opacity-80 hover:opacity-100"
              aria-label="GitHub"
            >
              <GitBranch className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 border border-white/10">
            <div className="flex flex-col gap-2">
              {items.map(({ key, href, id }) => (
                <a
                  key={key}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  className={`text-sm px-3 py-2 rounded-lg transition ${
                    active === id ? "bg-white/20 dark:bg-white/10 text-white" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {dict[key]}
                </a>
              ))}
              <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-white/10">
                <a href={`mailto:${email}`} className="opacity-80 hover:opacity-100" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-80 hover:opacity-100"
                  aria-label="GitHub"
                >
                  <GitBranch className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
