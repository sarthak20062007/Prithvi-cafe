import { z } from "zod";

/**
 * Allowed guest count options — matches the <select> options in Reservation.tsx.
 * Using an enum prevents injection of arbitrary values.
 */
export const GUEST_OPTIONS = [
  "2 Guests",
  "4 Guests",
  "6 Guests",
  "Exclusive Party (8+)",
] as const;

/**
 * Zod schema for the reservation form.
 * Validates guest count, date (must be today or future, within 90 days),
 * and time (must be within operating hours 11:00–23:00).
 */
export const reservationSchema = z.object({
  guestCount: z.enum(GUEST_OPTIONS, {
    message: "Please select a valid guest count.",
  }),

  date: z
    .string()
    .min(1, "Please select a date.")
    .refine(
      (val) => {
        const selected = new Date(val);
        return !isNaN(selected.getTime());
      },
      { message: "Please enter a valid date." }
    )
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(val);
        return selected >= today;
      },
      { message: "Date must be today or in the future." }
    )
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 90);
        const selected = new Date(val);
        return selected <= maxDate;
      },
      { message: "Reservations can be made up to 90 days in advance." }
    ),

  time: z
    .string()
    .min(1, "Please select a time.")
    .refine(
      (val) => {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);
      },
      { message: "Please enter a valid time (HH:MM)." }
    )
    .refine(
      (val) => {
        const [hours] = val.split(":").map(Number);
        return hours >= 11 && hours <= 22;
      },
      { message: "Reservations are available between 11:00 AM and 11:00 PM." }
    ),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
