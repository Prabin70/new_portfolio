import pug from "pug";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "../../../api/sendEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendMailToClient({ email, name }) {
  try {
    const htmlContent = pug.renderFile(
      path.join(__dirname, "./template/email.pug"),
      {
        name,
      }
    );
    await sendEmail({
      to: email,
      subject: "Thanks for contacting me",
      html: htmlContent,
    });
  } catch (error) {
    console.log(error);
  }
}

export default sendMailToClient;
