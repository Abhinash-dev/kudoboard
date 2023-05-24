
const nodeMailer = require("nodemailer");
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmailWithNodemailer = async(req, res, emailData) => {
   try {
    await sgMail.send(emailData);
    console.log('Email sent successfully');
   } catch (error) {
    console.error(error);
   }
}