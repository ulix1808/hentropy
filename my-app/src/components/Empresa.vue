<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>-</h2>
          <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
         Empresa
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="select"
          :hint="`${select.Name}, ${select.id}`"
          :items="items"
          item-text="Name"
          item-value="Id"
          label="Select"
          persistent-hint
          return-object
          single-line
          v-on:change="onChange()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
        </div>
    </div>
    </div>
</template>

<script>
import { getAllEmpresas } from '../services/UserService'
  export default {
    data () {
      return {
        select: { },
        items: [],
      }
    },
    mounted(){
      console.log("el list fue creado");
      //let aux=[]
      this.items= []
      getAllEmpresas().then(response => {
      this.select={Name:response[0].Name, id:response[0].id}
      this.items=response
      

      //console.log(aux.length)
      //this.items=aux
      })
      
    },
    methods:{
      onChange(){
        console.log(this.select.Empresa);
      }
    },
  }
</script>
 




