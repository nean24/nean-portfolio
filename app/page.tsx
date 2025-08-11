import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default async function Page({ params }: { params: { locale: "en" | "vi" } }) {
  const dict = await getDictionary(params.locale);
  return (
    <>
      <Hero dict={dict} locale={params.locale} />
      <About dict={dict} />
      <Projects dict={dict} />
      <Experience dict={dict} />
      <Skills dict={dict} />
      <Contact dict={dict} />
    </>
  );
}