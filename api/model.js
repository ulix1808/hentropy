


const {MongoClient} = require('mongodb');

module.exports = {
    

    async colaboradores () { 
        
        /**
        * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
        * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
        */
   
       const uri = "mongodb+srv://ulises:Kr4k3n1808!@cluster0.rcr7z.mongodb.net/hentropy?retryWrites=true&w=majority";
   
       const client = new MongoClient(uri);
   
       try {
   
           // Connect to the MongoDB cluster
   
           await client.connect();
   
           // Make the appropriate DB calls
   
           colaboradoresList = await client.db("hentropy").collection("colaborador").find().toArray(function(err, docs) {

            console.log(JSON.stringify(docs));
            colaboradoresList = docs;

            var today = new Date();
            console.log( "actual month ---> " + today.getMonth());

            colaboradoresList.forEach(function(colaborador) {
                console.log("---" + colaborador.fecha_nacimiento.getMonth());

              
            });
        });
    
 
       
           //colaboradoresList.colaboradores.forEach(cl => console.log(` - ${cl}`));

   
       } catch (e) {
   
           console.error(e);
   
       } finally {
   
           await client.close();
   
       }
    

    },




    bar: function () {
      // whatever
    }
  };