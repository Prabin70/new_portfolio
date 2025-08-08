import { sendEmail } from "../../api/sendEmail.js";
import sendMailToClient from "../lib/mail/sendMail.js";
import sendMailToAdmin from "../lib/mail/sendMailToAdmin.js";
import User from "../model/user.model.js";

export const userController = async (req, res) => {
  try {
    const data = req.body;
    const result = await User.create(data);

    await sendMailToClient({
      name: data.username,
      email: data.email,
    });
    await sendMailToAdmin({
      username: data.username,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
