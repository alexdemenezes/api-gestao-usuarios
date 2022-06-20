import nodemailer  from 'nodemailer';
import 'dotenv/config';

class EmailSender {

  public validateAccount(to: string, token:string) {
    const PORT = process.env.APP_PORT;
    const body = `<a href=http://localhost:${PORT}/user/validate?token=${token}>Click here to verify your account</a>`;
    let mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'Please, verify your account',
      html: body,
    }

    return mailOptions;
  }

  public recoveryPassword(to: string, token: string) {
    const PORT = process.env.APP_PORT;
    const body = `<a href=http://localhost:${PORT}/recovery/${token}>Click here to change your password account.</a>`;
    let mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: 'Recovery password',
      html: body,
    }

    return mailOptions;
  }

  public async send(to: string, token: string, method:string):Promise<void> {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERV,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
    

    if (method === 'validateAccount') {
    try {
      const mailOptions = this.validateAccount(to, token);
      await transporter.sendMail(mailOptions)
    } catch (e) {
      console.log(e)
    }
    } else {
      try {
        const mailOptions = this.recoveryPassword(to, token);
        await transporter.sendMail(mailOptions);
      } catch (e) {
        console.log(e);
      }

    }
  }
}

export default new EmailSender;
