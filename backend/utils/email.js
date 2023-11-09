const nodemailer = require("nodemailer");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_NAME;
  }
  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, message) {
    const mailOption = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: message,
    };
    this.newTransport().sendMail(mailOption);
  }

  async sendWelcome() {
    await this.send(
      "Welcome to Our MHP Store.",
      `Hi, ${this.name}. \n Congratulations! your registration has been done successfully. \n best regards MHP.`
    );
  }

  async sendPasswordReset() {
    const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to: ${this.url}.\n if you didn't forget your password, please ignore this message.`;
    await this.send("Your password reset token valid for 5min.", message);
  }
};
