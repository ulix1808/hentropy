


var Email = require('email-templates');
// email sender function



exports.sendEmail = function(req, res) {
// Definimos el transporter


console.log("mail part ............" + req.body.template)
console.log("............" + req.body.service)
console.log("..PASS.........." + req.body.pass)

const email = new Email({

    message: {
      from: req.body.from
    },
    send: true,
    transport: {
        service: req.body.service,
        auth: {
            user: req.body.user,
            pass: req.body.pass
        }
    }
   });

   email.send({
     template: req.body.template,
     message: {
       to: req.body.to
     },
     locals: req.body
   })
   .then(res.json({"estatus": "enviado"}))
   .catch( console.error );

   return res

};