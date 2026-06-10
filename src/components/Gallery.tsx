"use client";

import { motion } from "framer-motion";

const images = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYfzbJns8fXh4X8o_a-wRWXvHZ1QWXGMoUpsGNk_VDEtkYoQTIk7dMrxkNGZuP0TcHvagKXCB4Vbmks182PgkhBilpRom2H4h69G_V9_Wyd1b4AGEExtsaBISAICZChsjMMN1iiwnqjolvFWPLW6vtie--OfJ6qfNUkn0rIs-GHBWRRtQRZchPPq-4zNyR5jmYxA8_KirHvwlRu2SaydYUeVoTCvk2CYLkUnrjQZsVchNujRvYVyb2hPFZifh9NBNv9Vm5nikkrjQ",
    alt: "Theatrical cocktail preparation with dramatic lighting",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCETnwH68MIKmmePtc7CvKz3E-CUH5lcxUv9L8xxDukW57yYvUwLlPsgynmjZWDJkOUvydMo_H_9lrdb0aDd02jS7D8JxH9Vs-CZq8ZSAEvQXQ8mthTwGBbiSLdji_sdV7r8djicWkcYRP_91pTFjcvdDk9mjcAzcILmLaTy7KUlqCi7hjGsDSzEFSeNi4zDYm_vjpSTWzNotdquGgozuzGtViqh4sJXZOvhGDEoELcjtmi_BrIZ_RW1nPgQ5MI1PTQfdJxi2JhjOI",
    alt: "Decadent dessert with gold leaf",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMm9nXS4whHYlQspMB8uE_SxOsCdpwfK-xLxPGXccbwijBz5uybf2G4q3b-FluSP39SGboJ77DDREnWyLyQwsBH1azllkDe_kAH5FOI6rRkFihdRMJrkL_EzVBZYuqnw3x1U6vkhvXbLMu2dfOjc-BSKIvJppMPgPKiDUAGtNoZHcfV-6KWZrhnSv063znxKZqwOWjBrgCO_wBjuwSngf1so0B7U0Wt69WsgTkxgdrJe0-pPJfQ8pe50vt4kaf9_-8oOJmPrBI4s0",
    alt: "Outdoor cafe at night with fairy lights and lanterns",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUy_dl3njIph5n90RnP4RkygCPPHy1NcNiFRTdYnDKdwm_WwaOXS4R5cg4azTrNXSPo6WT0416xkWgFvDfbdMn4vS9C7PshwM0qXGdvfZTitGm6K9hFeEZZNzs3bF-RjxOZqzHQo3X8W49xrSw4VwAZam5YW5BxYQze4OxLbsnqG4MPWKITI69g-SgsmbuSjV59EqWF2Ld4deBHf2zuqi9gKUpbGnG-V6i-Zl5HDK7izsNhWk7cf9RoO-y7mrPZkihT-lFjff6xSo",
    alt: "Atmospheric theatre interior",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2BxrtQXq5eWhmg_99opBZR8GieXHYJFYH1XLgrIZ-uhWYydFtmIPefoiUx9XbLEdgvsBBUvVKX1yKTorzHvX0XQ8dLqqZI4rBPHrYNbPMUs4g3X5QLp7w0RV83y94tFdgIRfr3CfR74yPRMY-W4HmWANh01Aw1SnRjG428uozLW1dBrNZNgSA2P9CioprWrghS7-k3BcExhfhJVWg076WXIs07AVCJwElFmJ3lfN7rSahWfcD4NzXWbKUQ92sysPqg-yoXbPlNMY",
    alt: "Evening view of Prithvi Cafe exterior",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 md:py-24 px-5 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="font-[family-name:var(--font-display)] text-4xl text-on-surface mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Atmosphere of <em className="font-normal italic">Wonder</em>
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Column 1 */}
          <div className="space-y-4">
            <motion.div
              className="overflow-hidden rounded-sm h-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[0].src}
                alt={images[0].alt}
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-sm h-40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[1].src}
                alt={images[1].alt}
              />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4 pt-12">
            <motion.div
              className="overflow-hidden rounded-sm h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[2].src}
                alt={images[2].alt}
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-sm h-48"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[3].src}
                alt={images[3].alt}
              />
            </motion.div>
          </div>

          {/* Column 3 (desktop only) */}
          <div className="hidden md:block space-y-4">
            <motion.div
              className="overflow-hidden rounded-sm h-48"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[0].src}
                alt={images[0].alt}
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-sm h-96"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[2].src}
                alt={images[2].alt}
              />
            </motion.div>
          </div>

          {/* Column 4 (desktop only) */}
          <div className="hidden md:block space-y-4 pt-12">
            <motion.div
              className="overflow-hidden rounded-sm h-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[1].src}
                alt={images[1].alt}
              />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-sm h-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                src={images[4].src}
                alt={images[4].alt}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
