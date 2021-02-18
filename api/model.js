


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
                
                try { colaborador.fecha_ingreso.getMonth() 
                
                    //console.log("---" + colaborador.fecha_nacimiento.getMonth() );
                    if (colaborador.fecha_nacimiento.getMonth() ==  today.getMonth()) {


                        colaborador.evento="Cumpleaños :) !!"
                        eventos.push(colaborador);
                        console.log("zzz" + colaborador.nombre);

                      } 

                    } catch (error) {

                      console.error(error);
    
                  }

                  try { colaborador.fecha_ingreso.getMonth() 
                
                    //console.log(  "--- aniversario month" + colaborador.fecha_ingreso.getMonth() );
                    if (colaborador.fecha_ingreso.getMonth() ==  today.getMonth()) {

                       colaborador.evento="Aniversario :) "
                        eventos.push(colaborador);
                      //  console.log("xxxx" + colaborador.nombre);

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