import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    // Send email to your waitlist email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.WAITLIST_EMAIL,
      subject: "New Waitlist Signup",
      text: `New waitlist signup: ${email}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email added to waitlist" });
    } catch (error) {
      res.status(500).json({ error: "Error adding email to waitlist" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}