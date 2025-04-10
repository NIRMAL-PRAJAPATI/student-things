const nodemailer = require('nodemailer');
const { Transform } = require('nodemailer/lib/xoauth2');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nirmalprajapati4008@gmail.com',
    pass: 'xgoi wmxk vzae aoec',
  },
});

const mail = transporter;
module.exports = mail;