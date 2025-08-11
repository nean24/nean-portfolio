"use client";
import { usePathname, useRouter } from "next/navigation";

export function LangToggle({ locale }: { locale: "en" | "vi" }) {
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: "en" | "vi") {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return router.push(`/${target}`);
    segments[0] = target;
    router.push("/" + segments.join("/"));
  }

  return (
    <div className="flex items-center rounded-xl border border-white/20 overflow-hidden">
      <button onClick={() => switchTo("en")} className={`px-2 py-1 text-sm ${locale === 'en' ? 'bg-white/60 text-black' : 'opacity-80 hover:opacity-100'}`}>EN</button>
      <button onClick={() => switchTo("vi")} className={`px-2 py-1 text-sm ${locale === 'vi' ? 'bg-white/60 text-black' : 'opacity-80 hover:opacity-100'}`}>VI</button>
    </div>
  );
}