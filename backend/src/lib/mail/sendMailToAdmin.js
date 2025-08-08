import pug from "pug";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "../../../api/sendEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendMailToAdmin({ email, username, message }) {
  try {
    const htmlContent = pug.renderFile(
      path.join(__dirname, "./template/admin.pug"),
      {
        username,
        email,
        message,
      }
    );
    await sendEmail({
      to: "dev.prabinshrestha@gmail.com",
      subject: `New message from${email}`,
      html: htmlContent,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default sendMailToAdmin;
