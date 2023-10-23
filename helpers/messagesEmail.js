export default {
  confirm: (data) => {
    const { name, token } = data;
    return {
      subject: 'Confirm your account',
      body: `<p>Hi ${name} we are excited for your register</p>
      <p>Welcome!</p>
      <p>For continue please confirm your email.</p>
      <a href="${process.env.FRONTED}/confirm/${token}" target="_blank">Click here for confirm account</a>
      <p>If you don't create account with us, please ignore this email</p>
      `,
    };
  },
  forgetPassword: (data) => {
    const { name, token } = data;
    return {
      subject: 'Recovery your password',
      body: `<p>Hi ${name} your request of recovery password is here!</p>
      <p>The next step is click on the next link for create a new password</p>
      <a href="${process.env.FRONTED}/forget-password/${token}" target="_blank">Click here change password</a>
      <p>If you don't request change your password, please ignore this email</p>
      `,
    };
  },
};
