import nodemailer from "nodemailer";
import { envSettings } from "../utils/envSettings";

export default async function handler(req, res) {
  if (!envSettings.mailer.user && !envSettings.mailer.password) {
    return res.status(500).json({ message: "Failed to send email" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: envSettings.mailer.user,
        pass: envSettings.mailer.password,
      },
    });

    await transporter.sendMail({
      from: envSettings.mailer.user,
      to: "drg.anamaria12@gmail.com",
      subject: "New Message",
      html: `<p>Name: ${req.body.name}</p> <p>Email: ${req.body.email}</pr> <p>Phone: ${req.body.phone}</p> <p>Mesaj: ${req.body.message}</p>`,
    });
    console.log("200");
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (e) {
    console.log("e", e);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
