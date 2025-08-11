"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/20 px-1 py-1">
      <button className={`p-1 rounded-lg ${theme === 'light' ? 'bg-white/60 text-black' : 'opacity-80 hover:opacity-100'}`} onClick={() => setTheme('light')} aria-label="Light">
        <Sun className="h-4 w-4" />
      </button>
      <button className={`p-1 rounded-lg ${theme === 'system' ? 'bg-white/60 text-black' : 'opacity-80 hover:opacity-100'}`} onClick={() => setTheme('system')} aria-label="System">
        <Laptop className="h-4 w-4" />
      </button>
      <button className={`p-1 rounded-lg ${theme === 'dark' ? 'bg-white/60 text-black' : 'opacity-80 hover:opacity-100'}`} onClick={() => setTheme('dark')} aria-label="Dark">
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}