<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">

    </div>
    <div class="row mrgnbtm">
        <Empresa v-if="empresas.length > 0" :empresas="empresas" :object="object" />
    </div>
    <div class="row mrgnbtm">
        <Users v-if="users.length > 0" :users="users" />
    </div>

    
  </div>

</template>

<script>
import Header from './Header.vue'
import Empresa from './Empresa.vue'
//import DisplayBoard from './DisplayBoard.vue'
import Users from './Users.vue'
//import calendar from './calendar.vue'
//import Calendar2 from './Calendar2.vue'
import { getAllUsers, getAllEmpresas } from '../services/UserService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    Empresa,
   // DisplayBoard,
    Users,
 //   calendar,
    //Calendar2
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0,
          empresas: [],
          EmpresaSeleccionada:0,
   
          object: {
              name: 'Object Name',
            }

        }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      })
    },
        getAllEmpresas() {
        getAllEmpresas().then(response => {
        console.log("Empresas-----------------------------------------  ");
        console.log(response);
        console.log("Empresas----------------------------------------- ");
        this.empresas = response
        
      })
    },
  

    /*
   empresa(data) {
      console.log('data:::', data)
      empresa(data).then(response => {
        
        console.log(response);
        this.getAllUsers();
      });
    }*/
  },
  mounted () {
    this.getAllEmpresas();
    this.getAllUsers();
    
  }
}
</script>