"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";

const menuLinks = [
  { label: "Home", href: "#", active: true },
  { label: "The Menu", href: "#dishes" },
  { label: "Live Acts", href: "#events" },
  { label: "Reserve", href: "#reservation" },
  { label: "Our Story", href: "#story" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Header */}
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${
          scrolled
            ? "py-4 bg-surface/80 backdrop-blur-xl border-b border-white/5"
            : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-primary active:scale-90 transition-transform"
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>

          <h1 className="font-[family-name:var(--font-display)] text-xl tracking-[0.3em] text-primary uppercase absolute left-1/2 -translate-x-1/2">
            PRITHVI
          </h1>

          <div className="flex items-center gap-6">
            <ShoppingBag
              size={24}
              strokeWidth={1.5}
              className="text-primary"
            />
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-surface flex flex-col justify-center px-6 md:px-16"
            initial={{ clipPath: "circle(0% at 0% 0%)" }}
            animate={{ clipPath: "circle(150% at 0% 0%)" }}
            exit={{ clipPath: "circle(0% at 0% 0%)" }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 left-8 text-primary"
              aria-label="Close menu"
            >
              <X size={36} strokeWidth={1.5} />
            </button>

            <nav className="space-y-8">
              {menuLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-[family-name:var(--font-display)] text-4xl sm:text-5xl ${
                    link.active ? "text-primary" : "text-on-surface"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 left-6 md:left-16"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">
                Visit Us
              </p>
              <p className="text-on-surface-variant text-sm">
                Janki Kutir, Juhu Church Road,
                <br />
                Mumbai, Maharashtra 400049
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
