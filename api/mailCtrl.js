var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ulises.m.1808@gmail.com',
            pass: ''
        }
    });
// Definimos el email
var mailOptions = {
    from: 'humanentropy',
    to: 'abel.diego@humanentropy.io',
    subject: 'Happy Valentines Day',
    text: 'Toque 1 - Test - :) '
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        //res.send(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req);
    }
});
};