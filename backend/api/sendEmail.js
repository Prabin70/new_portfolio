import nodemailer from "nodemailer";

const transportInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dev.prabinshrestha@gmail.com",
    pass: "knsm dayy waoe igcq",
  },
};

export const sendEmail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transportInfo);
    const info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error occured", error.message);
  }
};
