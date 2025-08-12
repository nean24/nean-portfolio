import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";      // above the fold – keep normal import
import About from "@/components/sections/About";    // small – keep normal import

const Projects   = dynamic(() => import("@/components/sections/Projects"),   {
  ssr: true,
  loading: () => <SectionSkeleton title="Projects" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: true,
  loading: () => <SectionSkeleton title="Experience" />,
});
const Skills     = dynamic(() => import("@/components/sections/Skills"),     {
  ssr: true,
  loading: () => <SectionSkeleton title="Skills" />,
});
const Contact    = dynamic(() => import("@/components/sections/Contact"),    {
  ssr: true,
  loading: () => <SectionSkeleton title="Contact" />,
});

// simple placeholder that matches section height to keep snap smooth
function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="snap-section">
      <div className="section">
        <h2 className="section-title opacity-50">{title}</h2>
        <div className="mt-4 h-32 rounded-2xl glass animate-pulse" />
      </div>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ locale?: "en"|"vi" }>}) {
  const { locale: raw } = await params;
  const locale = raw === "vi" ? "vi" : "en";
  const dict = await (await import("@/lib/dictionary")).getDictionary(locale);

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
