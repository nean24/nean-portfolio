import { ThemeProvider } from "@/components/ThemeProvider";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import Navbar from "@/components/NavBar";
import { getDictionary } from "@/lib/dictionary";
import SnapScroll from "@/components/SnapScroll";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: "en" | "vi" };
}) {
  const locale = (params.locale ?? "en") as "en" | "vi";
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
