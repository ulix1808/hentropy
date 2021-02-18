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



    //return res.send(JSON.stringify(colaboradores_eventos()));
    base.colaboradores_eventos(req, res);
    //res.json(colaboradores_eventos());

    //res.write(colaboradores_eventos());

});


app.get('/api/empresas', (req, res) => {
  //console.log('api/empresas called!!!!!!!')


   var resp = [{"Name":"Pemex","id":"1"},{"Name":"Hertz","id":"2"}]
   res.json(resp);


});


app.post('/api/empresa_selector', (req, res) => {
  console.log('api/selector called!!!!!!!')

  console.log(req.json)
  
   res.json("ok");



});


app.get('/api/eventos', (req, res) => {
  var resJson=[{"inicio":"2021-02-20 00:12:00","fin":"2021-02-20 16:00","nombre":"Aniversario"},{"inicio":"2021-02-05 00:00", "fin":"2021-02-05 23:59","nombre":"Aniversario"}]
  res.json(resJson);
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