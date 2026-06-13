"use client";

import { motion } from "framer-motion";

const dishes = [
  {
    name: "Pav Bhaji Fondue",
    description: "A contemporary reimagination of heritage street flavor.",
    price: "₹450",
    tag: "Iconic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFXdtZ8yp4Kv5pxVq7rKG0tYt7oTXVKNlq3WwyN9W2XHVS6GeoAIrE_hvKfiuHE99QJmn47j6HPn6zbzbgJURVf1B4HvINn-lv41Ik4CemLVFb_hFAE9gH_8nVPuW6xFmKlVPLBFruFcZKpNQNbrNDjsD1EYkaqG1xfAq9Hlo74HNYZo_NmURLNXsp5rZdcgoYAc0SiNwe_1FllUcWC63G0hRo9UHnyp2Q0TwyGQfhCZyVtLeSaGGOUoVkM4MmRhsDBOPpXhsfb4k",
  },
  {
    name: "Chicken Kheema Pav",
    description: "Slow-cooked minced chicken infused with secret theatre spices.",
    price: "₹525",
    tag: "Chef's Edit",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArazCiVDEt57M_euFk0K_kjYzPtlvjBGtwMaSMM1zZqyvnpeGddMhUtevvTyk0cJ0V0Yy07-dFZQ_SYSB2DncjBdBTbbOg3XEoSp_Rw7gfXktvBDk4-l9ILSq5xQSwSMZcyM2_Q2a7WYO40eVjx8KdGr5UlZTCDwzGjdyr0ax0flVgJHRgzY9XHrgvHtSTA1elbssyUZyscmISH6ZkeLBu7mJ_v7P-9SvdfxjVLy9MBM1jFTY-G0Q1eUB8v8TYeSHa5RJjlR72lXI",
  },
  {
    name: "Alfredo Pasta",
    description: "Velvety white sauce pasta with a hint of roasted garlic.",
    price: "₹480",
    tag: "Popular",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI4vKFwkKc0-q4Iej2kPUitNNDyeroaPGgIdg-KrtULX1TDbhv2JWkzxfkybkuJPFiyhfiPsGguvQwk1RAeBiI4FzVpoFcOe5Cvo8-khwTHUBwEqq8yp1mQExLVjcHjZxTscnDXwmQlqm10o9kCz7BnZPqsIx4hA5f9-8y_2k04so36CKB8JQCM0K3rmyxmEwMz5oVXRHgi48ikpxF7jr4slgwHd8VHXmB70W4_hiwQocYdQuStBsv0-lCmZ1IrE4pFlWjDNH-Zag",
  },
];

export default function FeaturedDishes() {
  return (
    <section id="dishes" className="py-20 md:py-24 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col gap-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            Curated Culinary
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-4xl text-on-surface">
            The Signature Edit
          </h3>
        </motion.div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              className="w-[85vw] min-w-[85vw] sm:w-[320px] sm:min-w-[320px] lg:w-auto lg:min-w-0 lg:flex-1 snap-center group shrink-0 lg:shrink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src={dish.image}
                  alt={dish.name}
                />
                <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {dish.tag}
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-[family-name:var(--font-display)] text-2xl text-on-surface mb-2">
                    {dish.name}
                  </h4>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>
                <span className="text-primary font-[family-name:var(--font-display)] text-xl">
                  {dish.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
