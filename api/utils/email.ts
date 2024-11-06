import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

// Define a custom type for the options object
interface EmailOptions {
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  message: string;
}

// Define the sendEmail function with proper types
const sendEmail = async (options: EmailOptions): Promise<void> => {
  // 1) Create a transporter
  const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME as string,
      pass: process.env.EMAIL_PASSWORD as string,
    },
  });

  // 2) Define the email options
  const mailOptions: SendMailOptions = {
    from: options.senderEmail,
    to: [options.recipientEmail],
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
