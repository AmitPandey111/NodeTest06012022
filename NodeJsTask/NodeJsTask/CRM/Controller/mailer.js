
const nodemailer = require("nodemailer");
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "amitpandey638834@gmail.com",
        pass: "8512816511"
    }
};

var transporter = nodemailer.createTransport(smtpConfig);
function sendMailViaSmtp(params) {
    try {
        let mailOptions = {
            from: `amitpandey638834@gmail.com`,
            to: "amitpandey851281@gmail.com",
            subject: "Use register successfully",
            html: `<h1>Hi User has register<h1>`,
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error");
                    console.log(error);
                    resolve(false);
                } else {
                    console.log("Success");
                    console.log("Message sent: " + info.response);
                    resolve(true);
                }
            });
        })
    } catch (error) {
        console.error(error);
    }
}
//sendMailViaSmtp()

module.exports={sendMailViaSmtp}
