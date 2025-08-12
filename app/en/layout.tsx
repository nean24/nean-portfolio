import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import Navbar from "@/components/Navbar";
import SnapScroll from "@/components/SnapScroll";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Portfolio — Sắc Lê",
  description: "Modern glass portfolio with EN/VI, dark & light modes.",
  icons: { icon: "/favicon.ico" }
};

// Next.js 15: params is a Promise in App Router
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale?: "en" | "vi" }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  const locale: "en" | "vi" = raw === "vi" ? "vi" : "en";
  const dict = await getDictionary(locale);

  return (
    <ThemeProvider>
      <AnimatedBlobs />
      <Navbar dict={dict} locale={locale} />
      <main>
        <SnapScroll />
        {children}
      </main>
    </ThemeProvider>
  );
}