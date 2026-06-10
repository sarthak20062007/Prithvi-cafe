"use client";

import { motion } from "framer-motion";

const events = [
  {
    tag: "Drama",
    tagColor: "primary",
    day: "24",
    month: "October",
    title: "Shadows of the Past",
    description:
      "A minimalist dramatic journey exploring Mumbai's forgotten heritage through poetic movement.",
    buttonText: "Secure Entry",
  },
  {
    tag: "Acoustic",
    tagColor: "tertiary",
    day: "27",
    month: "October",
    title: "Soulful Nights",
    description:
      "Unplugged sessions featuring independent artists in an intimate candlelit garden setting.",
    buttonText: "Secure Entry",
  },
];

export default function CuratedActs() {
  return (
    <section id="events" className="py-20 md:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          className="flex justify-between items-end mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
              Stage Performance
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-4xl text-on-surface">
              Curated Acts
            </h3>
          </div>
          <a
            className="text-primary font-bold text-xs border-b-2 border-primary/20 pb-1 uppercase tracking-widest hover:border-primary transition-all"
            href="#"
          >
            All Events
          </a>
        </motion.div>

        {/* Event Cards */}
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory">
          {events.map((event, i) => {
            const isPrimary = event.tagColor === "primary";
            return (
              <motion.div
                key={event.title}
                className="min-w-[340px] snap-center glass-card p-10 rounded-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Tag + Date */}
                <div className="flex justify-between items-start mb-10">
                  <span
                    className={`${
                      isPrimary
                        ? "bg-primary text-background"
                        : "bg-tertiary text-background"
                    } px-4 py-1 text-[10px] font-bold uppercase tracking-widest`}
                  >
                    {event.tag}
                  </span>
                  <div className="text-right">
                    <p
                      className={`${
                        isPrimary ? "text-primary" : "text-tertiary"
                      } font-[family-name:var(--font-display)] text-4xl`}
                    >
                      {event.day}
                    </p>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                      {event.month}
                    </p>
                  </div>
                </div>

                {/* Event Content */}
                <h4 className="font-[family-name:var(--font-display)] text-3xl text-on-surface mb-4">
                  {event.title}
                </h4>
                <p className="text-on-surface-variant font-light leading-relaxed mb-8">
                  {event.description}
                </p>

                {/* Button */}
                <button
                  className={`w-full py-4 border ${
                    isPrimary
                      ? "border-primary/30 text-primary hover:bg-primary hover:text-background"
                      : "border-tertiary/30 text-tertiary hover:bg-tertiary hover:text-background"
                  } text-[10px] font-bold uppercase tracking-[0.2em] transition-all`}
                >
                  {event.buttonText}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
