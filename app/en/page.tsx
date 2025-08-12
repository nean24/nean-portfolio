import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Next.js 15: params is a Promise in App Router
type PageProps = {
  params: Promise<{ locale?: "en" | "vi" }>;
};

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: "en" | "vi" = raw === "vi" ? "vi" : "en";
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <About dict={dict} />
      <Projects dict={dict} />
      <Experience dict={dict} />
      <Skills dict={dict} />
      <Contact dict={dict} />
    </>
  );
}