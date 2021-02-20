


const {MongoClient} = require('mongodb');
const { callbackPromise } = require('nodemailer/lib/shared');

module.exports = {
    

    async colaboradores_eventos(req, res) { 
        
        /**
        * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
        * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
        */

       var eventos=[];
   
       const uri = "mongodb+srv://ulises:Kr4k3n1808!@cluster0.rcr7z.mongodb.net/hentropy?retryWrites=true&w=majority";
   
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


    bar: function () {
      // whatever
    }
  };