"use client";
import { motion } from "framer-motion";

export default function Hero({ dict, locale }: { dict: Record<string,string>; locale: "en" | "vi" }) {
  return (
    <section id="home" className="snap-section">
      <div className="section">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-gradient"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {dict["hero.greeting"]} Sắc Lê
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl opacity-90 max-w-prose"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {dict["hero.role"]}
            </motion.p>
            <motion.div className="mt-7 flex flex-wrap gap-3" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.2}}>
              <a href={`/${locale}/#projects`} className="btn btn-primary">{dict["hero.ctaPrimary"]}</a>
              <a href={`/${locale}/#contact`} className="btn btn-ghost">{dict["hero.ctaSecondary"]}</a>
            </motion.div>
          </div>
          <motion.div
            className="md:col-span-5 card hover-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="opacity-80">
              This card uses <strong>glassmorphism</strong>. Drop a short intro, a case study win, or your photo here.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
