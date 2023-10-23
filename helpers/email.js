import nodemailer from 'nodemailer';

const senderEmail = async (data, runTypeEmail) => {
  const { email } = data;
  const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.USERMAIL}`,
      pass: `${process.env.PASSMAIL}`,
    },
  });
  const info = await transport.sendMail({
    from: `${process.env.USERMAIL}`,
    to: email,
    subject: runTypeEmail(data).subject,
    text: 'If you no are a robot, confirm your account',
    html: runTypeEmail(data).body,
  });
  console.log(info);
};
export default senderEmail;
