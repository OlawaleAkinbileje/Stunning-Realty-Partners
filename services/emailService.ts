import nodemailer from "nodemailer";

// Use environment variables for sensitive info
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set in environment variables");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log("Email Service Check:", {
    hasUser: !!user,
    userLength: user?.length || 0,
    hasPass: !!pass,
    passLength: pass?.length || 0,
    env: process.env.NODE_ENV,
  });

  const transporter = createTransporter();

  if (!transporter) {
    return {
      success: false,
      error: "Email service not configured. Missing EMAIL_USER or EMAIL_PASS.",
    };
  }

  const mailOptions = {
    from: `"SRP Inquiry" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email successfully sent:", info.response);
    return { success: true, info };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Nodemailer Error:", errorMessage);

    // Check if it's a nodemailer error with a response
    if (error && typeof error === "object" && "response" in error) {
      console.error(
        "Nodemailer Response:",
        (error as { response: unknown }).response,
      );
    }

    return { success: false, error: errorMessage };
  }
};
