import nodemailer from 'nodemailer';

export const emailRegister = async (dataRegister) => {
  const { email, name, token } = dataRegister;
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: `${process.env.USERMAIL}`,
      pass: `${process.env.PASSMAIL}`,
    },
  });
  const info = transport.sendMail({
    from: 'mxcodemexico@gmail.com',
    to: email,
    subject: 'Confirm your account',
    text: 'If you no are a robot, confirm your account',
    html: `<p>Hi ${name} we are excited for your register</p>
    <p>Welcome!</p>
    <p>For continue please confirm your email.</p>
    <a href="${process.env.FRONTED}/confirm/${token}" target="_blank">Click here for confirm account</a>
    <p>If you don't create account with us, please ignore this email</p>
    `,
  });
  console.log(info);
};

export const emailForget = () => {

};
