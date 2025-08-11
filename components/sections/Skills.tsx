"use client";
import { motion } from "framer-motion";

const groups = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"]},
  { title: "Backend / DB", items: ["Node.js", "Supabase", "Firebase"]},
  { title: "Tools", items: ["Git", "Vite", "Nginx", "Linux"]}
];

export default function Skills({ dict }: { dict: Record<string,string> }) {
  return (
    <section id="skills" className="snap-section">
      <div className="section">
        <h2 className="section-title text-gradient">{dict["skills.title"]}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <motion.div key={g.title} className="card hover-card" initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}}>
              <h3 className="font-semibold mb-2">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full glass text-sm">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
