import { render } from "@react-email/render";
import { AppointmentBookingEmail } from "@/emails/appointment-booking";
import { AdminNotificationEmail } from "@/emails/admin-notification";
import nodemailer from "nodemailer";

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface AppointmentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  preferredDate: Date;
  timezone: string | null;
  notes?: string | null;
  meetingLink?: string | null;
  meetingId?: string | null;
  timeSlot: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    duration: number;
  };
}

export async function sendAppointmentBookingEmails(
  appointment: AppointmentData
) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    const fromEmail = process.env.GMAIL_USER;

    if (!fromEmail) {
      throw new Error("Gmail user email not configured");
    }

    console.log("📧 Sending appointment emails via Gmail...");

    // Send confirmation email to user
    const userEmailHtml = await render(AppointmentBookingEmail({ appointment }));
    const userEmailResult = await transporter.sendMail({
      from: `"Northampton Clinic" <${fromEmail}>`,
      to: appointment.email,
      subject: "Appointment Request Received - Northampton Clinic",
      html: userEmailHtml,
    });

    console.log("✅ User email sent:", userEmailResult.messageId);

    // Send notification email to admin
    const adminEmailHtml = await render(AdminNotificationEmail({ appointment }));
    const adminEmailResult = await transporter.sendMail({
      from: `"Northampton Clinic" <${fromEmail}>`,
      to: adminEmail,
      subject: `New Appointment Request - ${appointment.name}`,
      html: adminEmailHtml,
    });

    console.log("✅ Admin email sent:", adminEmailResult.messageId);

    return {
      userEmailResult,
      adminEmailResult,
    };
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    throw error;
  }
}
