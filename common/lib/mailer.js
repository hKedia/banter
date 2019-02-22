const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const sendMail = (email) =>
  new Promise(async (resolve, reject) => {
    let transport = null;
    if (process.env.NODE_ENV === 'production') {
      transport = sendgridTransport({
        auth: {
          api_user: process.env.SENDGRID_USERNAME,
          api_key: process.env.SENDGRID_PASSWORD,
        },
      });
    } else {
      transport = {
        port: 1025,
        ignoreTLS: true,
      };
    }

    const client = nodemailer.createTransport(transport);
    client.sendMail(email, (error, info) => {
      if (error) {
        return reject(error);
      }
      return resolve(info);
    });
  });

const mentionedEmail = (user, message) => {
  const url = process.env.STAGING ? 'https://staging.banter.pub' : 'https://banter.pub';
  return {
    from: 'hello@banter.pub',
    to: 'hello@banter.pub',
    subject: `You were mentioned by @${message.createdBy}`,
    text: `
    You were mentioned in a message on Banter:\n
    ${message.content}\n
    ${url}/messages/${message._id}\n
    Happy Banting!
    `,
  };
};

module.exports = {
  sendMail,
  mentionedEmail,
};