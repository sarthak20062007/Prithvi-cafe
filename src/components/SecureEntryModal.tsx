"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface EventData {
  tag: string;
  tagColor: string;
  day: string;
  month: string;
  title: string;
  description: string;
  buttonText?: string;
  time?: string;
  venue?: string;
}

interface SecureEntryModalProps {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = "booking" | "success";

function generateConfirmationNumber(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `PRT-${num}`;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const successContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const successItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SecureEntryModal({
  event,
  isOpen,
  onClose,
}: SecureEntryModalProps) {
  const [step, setStep] = useState<ModalStep>("booking");
  const [seats, setSeats] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isPrimary = event?.tagColor === "primary";
  const accentColor = isPrimary ? "primary" : "tertiary";

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("booking");
      setSeats(1);
      setGuestName("");
      setNameError("");
      setConfirmationNumber("");
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && step === "booking") {
      // Small delay to let animation play
      const timer = setTimeout(() => nameInputRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  function decrementSeats() {
    setSeats((prev) => Math.max(1, prev - 1));
  }

  function incrementSeats() {
    setSeats((prev) => Math.min(6, prev + 1));
  }

  function handleConfirm() {
    const trimmed = guestName.trim();
    if (!trimmed) {
      setNameError("Please enter your name.");
      nameInputRef.current?.focus();
      return;
    }
    setNameError("");
    setConfirmationNumber(generateConfirmationNumber());
    setStep("success");
  }

  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Secure Entry for ${event.title}`}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto glass-card rounded-sm border border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 2L14 14M14 2L2 14" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {step === "booking" ? (
                <motion.div
                  key="booking"
                  className="p-8 sm:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Event Info Header */}
                  <div className="mb-10">
                    <div className="flex items-start justify-between mb-6">
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
                          } font-[family-name:var(--font-display)] text-3xl`}
                        >
                          {event.day}
                        </p>
                        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                          {event.month}
                        </p>
                      </div>
                    </div>
                    <h4 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-on-surface mb-2">
                      {event.title}
                    </h4>
                    {event.time && (
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest">
                        {event.time}
                      </p>
                    )}
                    {event.venue && (
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">
                        {event.venue}
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mb-8" />

                  {/* Reserve Your Seats */}
                  <p
                    className={`text-${accentColor} text-[10px] font-bold uppercase tracking-[0.3em] mb-6`}
                  >
                    Reserve Your Seats
                  </p>

                  {/* Seat Selector */}
                  <div className="mb-8">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-4">
                      Number of Seats
                    </label>
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={decrementSeats}
                        disabled={seats <= 1}
                        className={`w-10 h-10 border ${
                          isPrimary
                            ? "border-primary/30 text-primary hover:bg-primary/10 disabled:border-primary/10 disabled:text-primary/30"
                            : "border-tertiary/30 text-tertiary hover:bg-tertiary/10 disabled:border-tertiary/10 disabled:text-tertiary/30"
                        } flex items-center justify-center transition-all text-lg`}
                        aria-label="Decrease seats"
                      >
                        −
                      </button>
                      <span className="font-[family-name:var(--font-display)] text-3xl text-on-surface min-w-[2ch] text-center">
                        {seats}
                      </span>
                      <button
                        type="button"
                        onClick={incrementSeats}
                        disabled={seats >= 6}
                        className={`w-10 h-10 border ${
                          isPrimary
                            ? "border-primary/30 text-primary hover:bg-primary/10 disabled:border-primary/10 disabled:text-primary/30"
                            : "border-tertiary/30 text-tertiary hover:bg-tertiary/10 disabled:border-tertiary/10 disabled:text-tertiary/30"
                        } flex items-center justify-center transition-all text-lg`}
                        aria-label="Increase seats"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Guest Name */}
                  <div className="mb-10">
                    <label
                      htmlFor="guest-name"
                      className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] block mb-4"
                    >
                      Guest Name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-white/10 text-on-surface py-3 focus:border-primary outline-none font-[family-name:var(--font-body)] placeholder:text-on-surface-variant/40 transition-colors"
                      autoComplete="name"
                    />
                    {nameError && (
                      <motion.p
                        className="text-error text-[10px] uppercase tracking-widest mt-2"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {nameError}
                      </motion.p>
                    )}
                  </div>

                  {/* Confirm Button */}
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className={`w-full ${
                      isPrimary
                        ? "bg-primary text-background"
                        : "bg-tertiary text-background"
                    } font-bold text-[10px] py-5 uppercase tracking-[0.2em] transition-all active:scale-[0.98] gold-shimmer`}
                  >
                    Confirm Seats
                  </button>
                </motion.div>
              ) : (
                /* Success Confirmation */
                <motion.div
                  key="success"
                  className="p-8 sm:p-10 text-center"
                  variants={successContentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Checkmark */}
                  <motion.div
                    className="mb-6"
                    variants={successItemVariants}
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-full border-2 ${
                        isPrimary ? "border-primary" : "border-tertiary"
                      } flex items-center justify-center`}
                    >
                      <motion.svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <motion.path
                          d="M6 14L12 20L22 8"
                          stroke={isPrimary ? "#f2ca50" : "#7fe671"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </motion.svg>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h4
                    className={`font-[family-name:var(--font-display)] text-2xl sm:text-3xl ${
                      isPrimary ? "text-primary" : "text-tertiary"
                    } mb-2`}
                    variants={successItemVariants}
                  >
                    Entry Confirmed
                  </motion.h4>
                  <motion.p
                    className="text-on-surface-variant text-sm font-light mb-8"
                    variants={successItemVariants}
                  >
                    Your seats have been reserved.
                  </motion.p>

                  {/* Divider */}
                  <motion.div
                    className="w-full h-px bg-white/10 mb-8"
                    variants={successItemVariants}
                  />

                  {/* Event Name */}
                  <motion.p
                    className="font-[family-name:var(--font-display)] text-xl text-on-surface uppercase tracking-wide mb-1"
                    variants={successItemVariants}
                  >
                    {event.title}
                  </motion.p>
                  <motion.p
                    className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
                    variants={successItemVariants}
                  >
                    {event.day} {event.month}
                    {event.time ? ` · ${event.time}` : ""}
                  </motion.p>

                  {/* Details Grid */}
                  <motion.div
                    className="grid grid-cols-2 gap-6 mb-8"
                    variants={successItemVariants}
                  >
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1">
                        Guest
                      </p>
                      <p className="text-on-surface font-[family-name:var(--font-display)] text-lg">
                        {guestName.trim()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1">
                        Seats
                      </p>
                      <p className="text-on-surface font-[family-name:var(--font-display)] text-lg">
                        {seats}
                      </p>
                    </div>
                  </motion.div>

                  {/* Confirmation Number */}
                  <motion.div className="mb-8" variants={successItemVariants}>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">
                      Confirmation No.
                    </p>
                    <p
                      className={`font-[family-name:var(--font-display)] text-2xl ${
                        isPrimary ? "text-primary" : "text-tertiary"
                      }`}
                    >
                      {confirmationNumber}
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="w-full h-px bg-white/10 mb-6"
                    variants={successItemVariants}
                  />

                  {/* Instruction */}
                  <motion.p
                    className="text-on-surface-variant text-xs font-light mb-8 italic"
                    variants={successItemVariants}
                  >
                    Please show this confirmation number at the entrance.
                  </motion.p>

                  {/* Done Button */}
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className={`w-full ${
                      isPrimary
                        ? "border border-primary/30 text-primary hover:bg-primary hover:text-background"
                        : "border border-tertiary/30 text-tertiary hover:bg-tertiary hover:text-background"
                    } font-bold text-[10px] py-5 uppercase tracking-[0.2em] transition-all`}
                    variants={successItemVariants}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
