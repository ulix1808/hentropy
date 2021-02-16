const express = require('express');
const path = require('path');
const randomId = require('random-id');
const { colaboradores_eventos } = require('./model');
var EmailCtrl = require('./mailCtrl');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


require('./model.js');

// place holder for the data
const users = [];
var base = require('./model');



app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/users', (req, res) => {
   console.log('api/users called!!!!!!!')

    //var eventos =  colaboradores_eventos();
    //EmailCtrl.sendEmail("pruuuuebbbbaaaaa", res)
    //console.log("33333"+JSON.stringify(eventos))
    //console.log("lo que llega al metodo: " + JSON.stringify(eventos))
    //console.log('!!!!!!')
    //res.json(eventos);


    //return res.send(JSON.stringify(colaboradores_eventos()));
    base.colaboradores_eventos(req, res);
    //res.json(colaboradores_eventos());

    //res.write(colaboradores_eventos());

});


app.get('/api/empresas', (req, res) => {
  console.log('api/empresas called!!!!!!!')

   //var eventos =  colaboradores_eventos();
   //EmailCtrl.sendEmail("pruuuuebbbbaaaaa", res)
   //console.log("33333"+JSON.stringify(eventos))
   //console.log("lo que llega al metodo: " + JSON.stringify(eventos))
   //console.log('!!!!!!')
   var resp = [{"name":"Pemex"},{"name":"Hertz"}]
   res.json(resp);


   //return res.send(JSON.stringify(colaboradores_eventos()));
   //base.colaboradores_eventos(req, res);
   //res.json(colaboradores_eventos());

   //res.write(colaboradores_eventos());

});


app.post('/api/user', (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));

});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});