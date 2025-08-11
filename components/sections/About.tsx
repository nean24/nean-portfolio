"use client";
import { motion } from "framer-motion";

export default function About({ dict }: { dict: Record<string,string> }) {
  return (
    <section id="about" className="snap-section">
      <div className="section">
        <h2 className="section-title">{dict["about.title"]}</h2>
        <motion.div className="grid md:grid-cols-3 gap-6" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="md:col-span-2 card">
            <p className="opacity-90 leading-relaxed">{dict["about.text"]}</p>
          </div>
          <div className="card">
            <ul className="space-y-2 opacity-90">
              <li>🚀 Next.js • React • Tailwind</li>
              <li>🎯 Framer Motion • UI polish</li>
              <li>🌐 EN / VI</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}