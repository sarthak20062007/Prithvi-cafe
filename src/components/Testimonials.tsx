"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24 px-5 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Quote
          size={72}
          strokeWidth={1}
          className="text-primary opacity-20 mb-8"
          fill="currentColor"
        />

        <motion.div
          className="w-full max-w-3xl px-4 space-y-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl italic text-on-surface leading-relaxed font-light">
            &ldquo;Prithvi is more than a cafe; it&apos;s a sanctuary for the
            creative mind. The atmosphere is thick with history, perfectly
            complemented by a modern culinary vision.&rdquo;
          </p>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-primary/30 p-1.5 mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3XZPCmapz-4dYVtrtYuKvdJWKPB7yYQNkOoStvIclTfNronF-8oKvoF98m2WEGDkKDjwbD8SfndNkEv0m3IU1jAqbP3i6s1WGA0zm9dhznyXLq26e3TfEwuZfbYX0ULS5VbKwy6gaD0LCFwjMZMmt6MjNV03ialdAXpFpBc5XKYhRQ_9DeDKyyzCbanHcJlvuaOhyotw_WezjfXA-pP01l1j0CM1SmJobG08cN76QyP5VA0yXPbnANwsmxDoBurScLoGJDEgmTw0"
                alt="Ananya Sharma"
              />
            </div>
            <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-1">
              Ananya Sharma
            </p>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest opacity-60">
              Creative Director &amp; Patron
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
