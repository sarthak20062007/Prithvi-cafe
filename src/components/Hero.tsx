"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Ember particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * -0.8 - 0.2,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(242, 202, 80, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animationId = requestAnimationFrame(animate);
    };

    initCanvas();
    createParticles();
    animate();

    const handleResize = () => initCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Ember Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[5]"
      />

      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0 scale-110"
        style={{ y: imageY }}
      >
        <img
          className="w-full h-full object-cover brightness-50"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2BxrtQXq5eWhmg_99opBZR8GieXHYJFYH1XLgrIZ-uhWYydFtmIPefoiUx9XbLEdgvsBBUvVKX1yKTorzHvX0XQ8dLqqZI4rBPHrYNbPMUs4g3X5QLp7w0RV83y94tFdgIRfr3CfR74yPRMY-W4HmWANh01Aw1SnRjG428uozLW1dBrNZNgSA2P9CioprWrghS7-k3BcExhfhJVWg076WXIs07AVCJwElFmJ3lfN7rSahWfcD4NzXWbKUQ92sysPqg-yoXbPlNMY"
          alt="A magical evening view of Prithvi Cafe in Mumbai with warm fairy lights and rustic wooden structures"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-10 space-y-8 max-w-2xl">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em]">
            The Hub of Mumbai Arts
          </span>
        </motion.div>

        <motion.h2
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-on-surface leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Where Art Meets <br />
          <em className="font-normal italic">The Senses</em>
        </motion.h2>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <a
            href="#reservation"
            className="bg-primary text-background font-bold text-xs py-5 rounded-sm uppercase tracking-[0.2em] gold-shimmer active:scale-95 transition-all shadow-[0_10px_30px_rgba(242,202,80,0.2)] text-center"
          >
            Reserve a Table
          </a>
          <a
            href="#dishes"
            className="bg-white/5 backdrop-blur-md border border-white/10 text-on-surface font-bold text-xs py-5 rounded-sm uppercase tracking-[0.2em] active:scale-95 transition-all text-center"
          >
            View The Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 scroll-indicator opacity-60">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface">
          Scroll
        </span>
      </div>
    </section>
  );
}
