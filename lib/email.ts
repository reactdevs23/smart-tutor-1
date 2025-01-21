import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "talrocktest@gmail.com",
    pass: "rdxfqgahngmqpcep",
  },
});
const sendMail = (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: "talrocktest@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };

    transporter
      .sendMail(mailOptions)
      .catch((error) => {
        console.log("Error send email: ", error);
      })
      .then((value) => {
        console.log("Email sended");
      });
  } catch (error) {
    console.log("Error", error);
  }
};

export default sendMail;
