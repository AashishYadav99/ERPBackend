const nodemailer = require("nodemailer");
// const sgMail = require('@sendgrid/mail')

const sendMail = async (from, to, subject, content, attachment = []) => {

    const transporter = nodemailer.createTransport({
        host: "mail.infomaniak.com",
        port: 587,
        secure: false, 
        auth: {
            user: 'support@cph4.ch', 
            pass: '7BE#Zas$1#4b9',
        },
    });

    const mailOptions = {
        from: 'support@cph4.ch',
        to: to,
        subject: subject,
        html: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}

module.exports = {
    sendMail
}