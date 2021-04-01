import nodemailer from 'nodemailer';
import enviromentVars from '../enviroment.vars';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: enviromentVars.EMAIL_AUTH, 
      pass: enviromentVars.PASS_APPLICATION_AUTH
    },
    tls: {
      rejectUnauthorized: false
    }
  });

transporter.verify().then(() => {
  console.log('Ready for send emails');
});