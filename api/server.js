const express = require('express');
const path = require('path');
const randomId = require('random-id');
const { colaboradores_eventos,insert_eventos,get_eventos, get_colaboradores,get_empresas,update_evento } = require('./model');
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


   //var resp = [{"Name":"Pemex","id":"602dd8de707cc1d0c05437ee"},{"Name":"Hertz","id":"602dd8de707cc1d0c05437f0"}]
   //res.json(resp);
   base.get_empresas(req,res);


  });

   app.post('/api/colaboradores', (req, res) => {
    console.log('api/colaboradores called!!!!!!!')
  
   base.get_colaboradores(req,res);
   // filtra por empresa

  });


  app.post('/api/colaborador_info', (req, res) => {
    console.log('api/colaboradores called!!!!!!!')
  
   base.get_colaboradores(req,res);
   // filtra por empresa

  });


app.post('/api/createEvent',(req,res)=>{
  console.log("Create Event" );
  console.log( req.body);
  //res="ok
  return base.insert_eventos(req,res);
});


app.post('/api/programarEvento',(req,res)=>{
  console.log(req.body.correo);
  console.log(req.body.id_colab);
  //body: JSON.stringify({correo: correo,email:email,asunto:auntoCorreo,id_colab:id_colab,tipo_evento:tipo_evento})
  evento = req.body;
  evento.bandera=1;
  //actualizar eventos
  base.update_evento(req,res);
  //insert_eventos(evento);

});


app.post('/api/empresa_selector', (req, res) => {
  console.log('api/selector called!!!!!!!')

  console.log(req.json)
  
   res.json("ok");

});


app.post('/api/eventos', (req, res) => {
  base.get_eventos(req, res);
  
  //metodo para obtener los colaborradores por empresa:
  
  //base.get_colaboradores(req,res);

});



app.post('/api/sendEmail', (req, res) => {

// llamamos al metodo que envia el mail y le pasamos los parametros que rertorna el buscar eventos
// le mandamos el JSON desde postman

console.log(JSON.stringify(req.body))
console.log("mail part ............" + req.body.template)
console.log("............" + req.body.service)
EmailCtrl.sendEmail(req,res);




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