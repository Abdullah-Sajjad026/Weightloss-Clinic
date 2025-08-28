import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment - Video Consultation",
  description: "Schedule your professional weight loss consultation at Northampton Clinic. Secure video calls with medical experts for Mounjaro and Wegovy treatments. Book your appointment today.",
  keywords: ["book appointment", "weight loss consultation", "video consultation", "medical appointment", "Northampton", "Mounjaro consultation", "Wegovy consultation"],
  openGraph: {
    title: "Book Weight Loss Consultation - Northampton Clinic",
    description: "Schedule your professional weight loss consultation via secure video call. Expert medical advice for weight loss treatments.",
  },
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}