"use client";

import { motion } from "framer-motion";

export default function Reservation() {
  return (
    <section id="reservation" className="py-20 md:py-24 px-5 md:px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass-card p-12 md:p-20 rounded-sm border-white/5 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {/* Header */}
          <div className="text-center space-y-4 mb-16 relative">
            <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-primary">
              Table Reservation
            </h3>
            <p className="text-on-surface-variant font-light max-w-sm mx-auto">
              Immerse yourself in a dramatic culinary experience. Book your
              stage-side table.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-10 relative" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">
                  Guest Count
                </label>
                <select className="w-full bg-transparent border-b border-white/10 text-on-surface py-4 focus:border-primary outline-none appearance-none cursor-pointer font-[family-name:var(--font-body)]">
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>Exclusive Party (8+)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">
                    Date
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 text-on-surface py-4 focus:border-primary outline-none font-[family-name:var(--font-body)]"
                    type="date"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block">
                    Time
                  </label>
                  <input
                    className="w-full bg-transparent border-b border-white/10 text-on-surface py-4 focus:border-primary outline-none font-[family-name:var(--font-body)]"
                    type="time"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-primary text-background font-bold text-xs py-6 rounded-sm uppercase tracking-[0.3em] gold-shimmer active:scale-95 transition-all shadow-[0_15px_40px_rgba(242,202,80,0.15)]"
              >
                Confirm Your Presence
              </button>
              <p className="text-[10px] text-center text-on-surface-variant mt-6 uppercase tracking-widest opacity-50">
                Reservation held for 15 minutes past scheduled time
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
