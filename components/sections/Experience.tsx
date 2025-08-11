"use client";
import { motion } from "framer-motion";

const xp = [
  { role: "Technical Solutions Intern", company: "ClassIn Vietnam", period: "May 2024 – Present", bullets: ["Built customer walkthrough project", "Led small team for onboarding guides", "Optimized internal tooling"]},
  { role: "Freelance Frontend", company: "Self-employed", period: "2023 – Present", bullets: ["Shipped React/Next apps", "Set up CI/CD on VPS", "Performance & UX polish"]}
];

export default function Experience({ dict }: { dict: Record<string,string> }) {
  return (
    <section id="experience" className="snap-section">
      <div className="section">
        <h2 className="section-title text-gradient">{dict["experience.title"]}</h2>
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-white/15" />
          <div className="space-y-5">
            {xp.map((x, i) => (
              <motion.div key={i} className="relative pl-10 card hover-card" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
                <span className="absolute left-1.5 top-5 h-3 w-3 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 shadow" />
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-semibold">{x.role} • {x.company}</h3>
                  <span className="text-sm opacity-70">{x.period}</span>
                </div>
                <ul className="mt-2 list-disc pl-5 space-y-1 opacity-90">
                  {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
