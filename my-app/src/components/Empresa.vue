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
    <div class="container mrgnbtm">
      <Calendar2 :events= "eventosEmpresa"/>
    </div>
    </div>
</template>

<script>

import { getAllEmpresas, getAllEventos, setEmpresa } from '../services/UserService'
import Calendar2 from '../components/Calendar2'

  export default {
    components:{
    Calendar2,
  },
    data () {
      return {
        select: { },
        items: [],
        eventosEmpresa:[],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      }
    },
    mounted(){
      console.log("el list fue creado");
      this.items= []
      getAllEmpresas().then(response => {
      this.select={Name:response[0].Name, id:response[0].id}
      this.items=response
      })
      
    },
    methods:{
      onChange(){
         
        console.log(this.select.id);

      setEmpresa(this.select.id).then( response => {
        console.log(response)

        })
        const events = []

        getAllEventos().then(response => {
        this.allEvents = response

        for(let i = 0;i< this.allEvents.length;i++){
          events.push({
            name: this.allEvents[i].evento ,
            start:this.allEvents[i].inicio ,
            end: this.allEvents[i].fin,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            email: this.allEvents[i].email,
            id_colab: this.allEvents[i]._id,
            tipo_evento: this.allEvents[i].tipo_evento,

            //timed: !allDay,
          })
          this.events = events
          this.eventosEmpresa=events
        }

        })
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

    },
  }
</script>
 




