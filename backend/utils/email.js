const nodemailer = require("nodemailer");
module.exports = class Email {
  constructor(user, resetCode) {
    this.to = user.email;
    this.name = user.name.split(" ")[0];
    this.resetCode = resetCode;
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

  async sendPasswordReset(userName) {
    const message = `Hi ${userName}, \n we received a request to reset the password in your MHP Store account. \n ${this.resetCode} \n Enter this code to reset password. \n Thanks for helping us to keep your account secure.`;
    await this.send("Your password reset code valid for 5min.", message);
  }
};
