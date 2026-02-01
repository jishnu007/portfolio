import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false, 
      error: "Method not allowed" 
    });
  }

  const { name, email, message, phone } = req.body as ContactFormData;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "Missing required fields" 
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      replyTo: email,
      to: "jishnupavithran007@gmail.com",
      subject: `Contact form submission from ${name}`,
      html: `
        <p>You have a new contact form submission</p><br>
        <p><strong>Name: </strong> ${name} </p><br>
        <p><strong>Phone: </strong> ${phone || "Not provided"} </p><br>
        <p><strong>Email: </strong> ${email} </p><br>
        <p><strong>Message: </strong> ${message} </p><br>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully" 
    });
  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to send message" 
    });
  }
}
