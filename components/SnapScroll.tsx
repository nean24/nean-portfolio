"use client";
import { useEffect } from "react";

export default function SnapScroll() {
  useEffect(() => {
    const scroller = document.querySelector("main");
    if (!scroller) return;

    let locked = false;
    const sections = Array.from(scroller.querySelectorAll<HTMLElement>(".snap-section"));

    const currentIndex = () => {
      const y = (scroller as HTMLElement).scrollTop;
      let best = 0, bestDist = Infinity;
      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.offsetTop - y);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const unlock = () => {
      locked = false;
      (scroller as HTMLElement).removeAttribute("data-lock");
    };

    const goTo = (idx: number) => {
      const target = sections[idx];
      if (!target) return;
      locked = true;
      (scroller as HTMLElement).setAttribute("data-lock", "true");
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Use scrollend if available; fall back to a timeout
      const onEnd = () => {
        (scroller as HTMLElement).removeEventListener("scrollend", onEnd as any);
        unlock();
      };
      (scroller as HTMLElement).addEventListener("scrollend", onEnd as any, { once: true });
      // Fallback for browsers without scrollend
      setTimeout(() => unlock(), 800);
    };

    const onWheel = (e: WheelEvent) => {
      if (locked) { e.preventDefault(); return; }
      // ignore tiny touchpad jitters
      if (Math.abs(e.deltaY) < 40) return;
      e.preventDefault();
      const idx = currentIndex();
      const next = e.deltaY > 0 ? Math.min(idx + 1, sections.length - 1) : Math.max(idx - 1, 0);
      if (next !== idx) goTo(next);
    };

    const onKey = (e: KeyboardEvent) => {
      if (locked) { e.preventDefault(); return; }
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        const idx = currentIndex();
        goTo(Math.min(idx + 1, sections.length - 1));
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        const idx = currentIndex();
        goTo(Math.max(idx - 1, 0));
      }
    };

    (scroller as HTMLElement).addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      (scroller as HTMLElement).removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKey as any);
    };
  }, []);

  return null;
}