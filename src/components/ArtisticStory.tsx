"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "1978",
    title: "The Curtain Rises",
    description: "The foundation of a cultural monument in Juhu.",
    active: true,
  },
  {
    year: "1990s",
    title: "The Cafe Culture",
    description: "Evolving into the epicenter of bohemian art.",
    active: false,
  },
  {
    year: "Today",
    title: "The Modern Stage",
    description: "A sensory fusion of heritage and high-end dining.",
    active: false,
  },
];

export default function ArtisticStory() {
  return (
    <section id="story" className="py-20 md:py-24 bg-surface-container/30 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + Timeline */}
          <div>
            <motion.h3
              className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-on-surface mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              An Artistic <br />
              <em className="font-normal italic">Legacy</em>
            </motion.h3>

            <motion.p
              className="text-on-surface-variant text-lg font-light leading-relaxed mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Prithvi Cafe isn&apos;t just a destination; it&apos;s the living
              heartbeat of Mumbai&apos;s theatrical soul. Born from the vision of
              Prithviraj Kapoor, we&apos;ve hosted dreamers and legends alike
              since 1978.
            </motion.p>

            {/* Timeline */}
            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[1px] before:bg-primary/20">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="relative pl-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border ${
                      item.active ? "border-primary" : "border-primary/30"
                    } bg-background flex items-center justify-center`}
                  >
                    {item.active && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-primary font-bold text-xs tracking-widest uppercase mb-1 block">
                    {item.year}
                  </span>
                  <h5 className="font-[family-name:var(--font-display)] text-xl text-on-surface mb-2">
                    {item.title}
                  </h5>
                  <p className="text-sm text-on-surface-variant font-light">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image with Quote Overlay */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="aspect-[3/4] rounded-sm overflow-hidden border border-white/5">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUy_dl3njIph5n90RnP4RkygCPPHy1NcNiFRTdYnDKdwm_WwaOXS4R5cg4azTrNXSPo6WT0416xkWgFvDfbdMn4vS9C7PshwM0qXGdvfZTitGm6K9hFeEZZNzs3bF-RjxOZqzHQo3X8W49xrSw4VwAZam5YW5BxYQze4OxLbsnqG4MPWKITI69g-SgsmbuSjV59EqWF2Ld4deBHf2zuqi9gKUpbGnG-V6i-Zl5HDK7izsNhWk7cf9RoO-y7mrPZkihT-lFjff6xSo"
                alt="Atmospheric interior of Prithvi Theatre with vintage posters and plush seating"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-sm max-w-[240px]">
              <p className="font-[family-name:var(--font-display)] italic text-lg text-primary">
                &ldquo;Art is not what you see, but what you make others
                see.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
