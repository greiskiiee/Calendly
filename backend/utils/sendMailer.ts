import nodemailer, { Transporter } from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "stmp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

export const sendMail = async (
  email: string,
  subject: string,
  text: string
): Promise<void> => {
  const info = {
    from: `Calendly <${process.env.EMAIL}>`,
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(info);
  } catch (error) {
    console.error(error);
  }
};