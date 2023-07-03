import { Router } from "express";
import transport from "../utils/email.utils.js";
import config from "../config/index.js";

const { emailUser } = config.email;

const router = Router();

router.get("/recovery", async (req, res) => {
  try {
    const email = JSON.parse(decodeURIComponent(req.query.email));
    const subject = "Link for password recovery";

    const link = oneHourValidLink();
    function oneHourValidLink() {
      const link = "http://localhost:8080/forgotPass";
      const time = Date.now();
      const validLink = `${link}?expiration=${time}`;
      return validLink;
    }
    const html = `<html>
        <div>
          <a href=${link}><button>Click here</button></a>
        </div>
        </html>`;
    const mailOptions = {
      from: emailUser,
      to: email,
      subject,
      html,
    };
    const result = await transport.sendMail(mailOptions);
    res.json({ status: "success", message: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.get("/deleteusers", async (req, res) => {
  try {
    let result = []
    const emails = JSON.parse(decodeURIComponent(req.query.email));

    await emails.forEach((element) => {
      const subject = "Account deleted";
     
      const html = `<html>
            <div>
             <h2>
              Your account has been deleted by admin
             </h2>
            </div>
            </html>`;

      const mailOptions = {
        from: emailUser,
        to: element,
        subject,
        html,
      };

    transport.sendMail(mailOptions);
    });

    res.json({ status: "success", message: emails });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
