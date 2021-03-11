


const {MongoClient} = require('mongodb');
const { callbackPromise } = require('nodemailer/lib/shared');
const { ObjectId }= require('mongodb');

const uri = "mongodb+srv://ulises:Kr4k3n1808!@cluster0.rcr7z.mongodb.net/hentropy?retryWrites=true&w=majority";

module.exports = {
    
     
    async colaboradores_eventos(req, res) { 
        
        /**
        * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
        * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
        */

       var eventos=[];
   
      
   
       const client = new MongoClient(uri);
   
       try {
   
           // Connect to the MongoDB cluster
   
           await client.connect();
   
           // Make the appropriate DB calls
   
           colaboradoresList = await client.db("hentropy").collection("colaborador").find().toArray(function(err, docs) {

            //console.log(JSON.stringify(docs));
            colaboradoresList = docs;


            var today = new Date();
            //console.log( "actual month ---> " + today.getMonth());

            
           
            colaboradoresList.forEach(function(colaborador) {
                
                try { colaborador.fecha_nacimiento.getMonth() 
                
                    //console.log("---" + colaborador.fecha_nacimiento.getMonth() );
                    if (colaborador.fecha_nacimiento.getMonth() ==  today.getMonth()) {

                        let cumpleanero = colaborador;
                        cumpleanero.evento="Cumpleaños :) !!" + cumpleanero.nombre
                        cumpleanero.tipo_evento=1;
                        formatted_date_ = today.getFullYear() + "-" + (cumpleanero.fecha_nacimiento.getMonth() + 1) + "-" + (cumpleanero.fecha_nacimiento.getDate()+1 )
                        cumpleanero.inicio=formatted_date_
                        //colaborador.fin= formatted_date
                        console.log("FORMATED DATE  NACIMIENTO" + cumpleanero.nombre+ "    " + formatted_date_);
                        
                        eventos.push(cumpleanero);
                        console.log("zzz" + cumpleanero.nombre);

                      } 

                    } catch (error) {

                      console.error(error);
    
                  }

                  try { colaborador.fecha_ingreso.getMonth() 
                
                    //console.log(  "--- aniversario month" + colaborador.fecha_ingreso.getMonth() );
                    if (colaborador.fecha_ingreso.getMonth() ==  today.getMonth()) {

                       let aniversario = colaborador 
                       aniversario.evento="Aniversario :)  " + aniversario.nombre
                       aniversario.tipo_evento=2;
                       formatted_date = today.getFullYear() + "-" + (aniversario.fecha_ingreso.getMonth() + 1) + "-" + (aniversario.fecha_ingreso.getDate()+1) 
                       console.log("FORMATED DATE  INGRESO" + aniversario.nombre+ "    " + formatted_date);
                       aniversario.inicio=formatted_date
                       console.log("Fecha de Ingreso" + formatted_date)
                       //colaborador.fin=formatted_date
                        eventos.push(aniversario);
                        console.log("xxxx" + aniversario.nombre);

                      } 
                  } catch (error) {

                    //console.error(error);
  
                 }

        
            });

            //console.log(JSON.stringify(eventos));
            return res.json(eventos)
            //callbackPromise(eventos);


        });

       
           //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));

   
       } catch (e) {
   
           console.error(e);
   
       } finally {
   
           await client.close();
   
       }
       
    console.log("EVENTOS" +JSON.stringify(eventos) )   ;
   

    },


    async insert_eventos(req,res) {

      
      const db = new MongoClient(uri);

      try {
              await db.connect();
              data = (req.body[0]);

              data.estatus="generado";
              fecha=data.fecha
              data.fecha = new Date(fecha);
              if (data.tipo =="global"){

                  // obtener la empresa
                let result = await this.get_empresa_by_id(data.id)

                console.log("EMAIL -----"  + result)
                data.email = result;
                
              }


              db.db("hentropy").collection("eventos").insertOne(data, function(err) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                return res.json("ok");
              });
              // whatever

            } catch (e) {
    
              console.error(e);
               return "error al insertar";
      
          } finally {
      
              await db.close();
              return "ok";
      
          }

    
    },

        async get_colaboradores(req, res) {
            
        // Comentar la linea que simula que esta recibiendo un empresa ID
        
        //req = "602dd8de707cc1d0c05437ee"

        //console.log("--------------------------------------------- " + req.json)
        var colaboradores=[];
    
        const client = new MongoClient(uri);
    
        try {
    
            // Connect to the MongoDB cluster
    
            await client.connect();
    
            // Make the appropriate DB calls
    
            colaboradoresList = await client.db("hentropy").collection("colaborador").find({ empresa_id:req.body.empresa_id }).toArray(function(err, docs) {

              //console.log(JSON.stringify(docs));
              colaboradoresList = docs;



              //console.log(""JSON.stringify(eventos));
              //return res.json(colaboradoresList);
              //callbackPromise(eventos);


          });

            //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));

    
        } catch (e) {
    
            console.error(e);
    
        } finally {
    
            await client.close();
    
        }
        

        //console.log("COLABORADORES" +JSON.stringify(colaboradoresList) )   ;
        return res.json(colaboradoresList);
    

      },

      async get_eventos(req, res) {
            
        /**
        * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
        * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
        */

      var eventos=[];

      const client = new MongoClient(uri);

      try {

          // Connect to the MongoDB cluster

          await client.connect();

          // Make the appropriate DB calls
          //console.log("EMPRESA ID AARON " +req.body.empresa );

          EventosList = await client.db("hentropy").collection("eventos").find({"id" : req.body.empresa}).toArray(function(err, docs) {



          //  Extraer los colaboradores de la empresa y luego rrecorrer la lista de eventos y si concide el colaborador ID o empresa ID se ingresa el evento ---

          // for each recorre la lista de colaboradores otro for each para eventos y dentro del if un hacemmos el push del evento 

            //console.log(JSON.stringify(docs));
            EventosList = docs;

            var today = new Date();
            //console.log( "actual month ---> " + today.getMonth());
          
            EventosList.forEach(function(evento) {
                
                try { evento.fecha.getMonth() 
                
                    //console.log("---" + colaborador.fecha_nacimiento.getMonth() );
                    if (evento.fecha.getMonth() ==  today.getMonth()) {

                  
                        evento.evento= evento.nombreEvento
                        formatted_date_ = today.getFullYear() + "-" + (evento.fecha.getMonth()+ 1) + "-" + (evento.fecha.getDate()+1 )
                        evento.inicio=formatted_date_
                        if (evento.estatus=="generado" ) {
                          evento.color = "orange";
                        }


                        if (evento.estatus=="programado" ) {
                          evento.color = "green";
                        }

                        if (evento.estatus=="enviado" ) {
                          evento.color = "grey darken-1";
                        }
                        //colaborador.fin= formatted_date
                        //console.log("FORMATED DATE  " + evento.nombre+ "    " + formatted_date_);
                        eventos.push(evento);
                        //console.log("zzz" + evento.nombre);

                      } 

                    } catch (error) {

                      console.error(error);
    
                  }



        
            });

            //console.log(JSON.stringify(eventos));
            return res.json(eventos)
            //callbackPromise(eventos);


        });

      
          //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));


      } catch (e) {

          console.error(e);

      } finally {

          await client.close();

      }
      
    console.log("EVENTOS" +JSON.stringify(eventos) )   ;


    },


    async get_empresas(req, res) {
            
      /**
      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
      */

      var eventos=[];

      const client = new MongoClient(uri);

      try {

          // Connect to the MongoDB cluster

          await client.connect();

          // Make the appropriate DB calls

          EmpresasList = await client.db("hentropy").collection("empresa").find().toArray(function(err, docs) {

            //console.log(JSON.stringify(docs));
            EmpresasList = docs;

            //console.log( "actual month ---> " + today.getMonth());
          
            console.log("ppppppppppppppppppppppppppppppp" + JSON.stringify(EmpresasList));
            return res.json(EmpresasList)
            //callbackPromise(eventos);


        });

      
          //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));


      } catch (e) {

          console.error(e);

      } finally {

          await client.close();

      }
   


    },


    async get_empresa_by_id(id) {
            
      /**
      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
      */

      var eventos=[];

      const client = new MongoClient(uri);

      try {

          // Connect to the MongoDB cluster

          await client.connect();

          // Make the appropriate DB calls
          console.log("Id...................." + String(id))

          Empresa = await client.db("hentropy").collection("empresa").findOne({"_id" : ObjectId(id)})
    
            //console.log(JSON.stringify(docs));
         
          email = Empresa.email
            //console.log( "actual month ---> " + today.getMonth());
          
            console.log("empreeeeesaaaaaaaaaaa" + JSON.stringify(Empresa));
          
            //callbackPromise(eventos);



      
          //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));


      } catch (e) {

          console.error(e);

      } finally {

          
          await client.close();
          return email

      }
   


    },


    async update_evento(req,res) {
            
      /**
      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
      */

      var eventos=[];

      const client = new MongoClient(uri);

      try {

          // Connect to the MongoDB cluster

          await client.connect();

          // Make the appropriate DB calls
          console.log("Actualiza evento...................." + String(req.body._id));
          console.log("Actualiza evento...................." + String(req.body.mensaje));

          //Empresa = await client.db("hentropy").collection("eventos").findOne({"_id" : ObjectId(req.body._id)})
    
            //console.log(JSON.stringify(docs));


            var myquery = {"_id" : ObjectId(req.body._id)};
            var newvalues = { $set: {asunto:req.body.asunto , mensaje:req.body.mensaje, estatus:"programado" } };
         
            client.db("hentropy").collection("eventos").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              client.close();
    

            });
      
          //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));


      } catch (e) {

          console.error(e);
          return  res.json({error:e});

      } finally {

          
          await client.close();
          return  res.json("ok");

      }
   


    }



 };