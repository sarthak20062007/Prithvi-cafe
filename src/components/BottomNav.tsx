"use client";

import { Home, UtensilsCrossed, Ticket, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Stage", active: true, href: "#" },
  { icon: UtensilsCrossed, label: "Taste", active: false, href: "#dishes" },
  { icon: Ticket, label: "Book", active: false, href: "#reservation" },
  { icon: User, label: "Club", active: false, href: "#" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center h-20 px-6 pb-6 shadow-2xl lg:hidden">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center justify-center py-2 min-h-[44px] ${
            item.active
              ? "text-primary"
              : "text-on-surface-variant opacity-60"
          }`}
        >
          <item.icon
            size={24}
            strokeWidth={1.5}
            fill={item.active ? "currentColor" : "none"}
          />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] mt-1">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
