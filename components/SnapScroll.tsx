"use client";
import { useEffect } from "react";

type ScrollEndTarget = HTMLElement & {
  addEventListener(
    type: "scrollend",
    listener: (e: Event) => void,
    options?: AddEventListenerOptions
  ): void;
  removeEventListener(
    type: "scrollend",
    listener: (e: Event) => void,
    options?: EventListenerOptions
  ): void;
};

export default function SnapScroll() {
  useEffect(() => {
    const scrollerEl = document.querySelector("main");
    if (!scrollerEl) return;
    const scroller = scrollerEl as HTMLElement;

    let locked = false;
    const sections = Array.from(scroller.querySelectorAll<HTMLElement>(".snap-section"));

    const currentIndex = (): number => {
      const y = scroller.scrollTop;
      let best = 0, bestDist = Infinity;
      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.offsetTop - y);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const unlock = (): void => {
      locked = false;
      scroller.removeAttribute("data-lock");
    };

    const goTo = (idx: number): void => {
      const target = sections[idx];
      if (!target) return;
      locked = true;
      scroller.setAttribute("data-lock", "true");
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      const el = scroller as ScrollEndTarget;
      const onEnd: (e: Event) => void = () => {
        el.removeEventListener("scrollend", onEnd);
        unlock();
      };
      try {
        el.addEventListener("scrollend", onEnd, { once: true });
        // fallback timer in case scrollend isn't supported
        window.setTimeout(unlock, 800);
      } catch {
        window.setTimeout(unlock, 800);
      }
    };

    const onWheel: (e: WheelEvent) => void = (e) => {
      if (locked) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 40) return;
      e.preventDefault();
      const idx = currentIndex();
      const next = e.deltaY > 0 ? Math.min(idx + 1, sections.length - 1) : Math.max(idx - 1, 0);
      if (next !== idx) goTo(next);
    };

    const onKey: (e: KeyboardEvent) => void = (e) => {
      if (locked) { e.preventDefault(); return; }
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        const idx = currentIndex();
        goTo(Math.min(idx + 1, sections.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const idx = currentIndex();
        goTo(Math.max(idx - 1, 0));
      }
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      scroller.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
