<template>
  <div id="app">
  <v-app id="inspire">
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
              <agregar class="mr-4" :idEmpresa="idEmpresa" v-on:banderacambio="banderacambio"/>
            <v-btn
              fab
              text
              small
              color="#adbacf"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="500px"
              min-height="400px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-alert
                  border="top"
                  color="red lighten-2"
                  dark
                  v-show="correoError"
                >
                  Faltan datos para el correo
                </v-alert>
                <span v-html="selectedEvent.details"></span>
                <v-text-field label="Correo de destino"
                  hide-details="auto" v-model="selectedEvent.email" :readonly="true" >
                </v-text-field>
                <v-text-field label="Asunto"
                  hide-details="auto" v-model="auntoCorreo">
                </v-text-field>
                <v-textarea name="mensajeCorreo"
                  label="Mensaje del correo"
                  hint="Agenda el correo"
                  v-model="correo">
                </v-textarea>
                <qr-code text="Text to encode"></qr-code>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="envioCorreo()"
                  
                >
                  Agendar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
  
  
</div>
</template>

<script>
import { setCorreo,getAllEventos } from '../services/UserService'
import agregar from '../components/agregar'
  export default {
    
    props:{
      events:{
        type:Array,
        required:true
      },
      idEmpresa:String,
    },
    components:{
    agregar,
  },
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      correo:"",
      correoError:false,
      auntoCorreo:"",
      allEvents:[],
      //events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      banderacambio(valor){
        console.log(valor)
        const events = []
        getAllEventos(this.idEmpresa).then(response => {
        this.allEvents = response

        for(let i = 0;i< this.allEvents.length;i++){
          events.push({
            name: this.allEvents[i].evento ,
            start:this.allEvents[i].inicio ,
            end: this.allEvents[i].fin,
            color: this.allEvents[i].color,
            email: this.allEvents[i].email,
            id_colab: this.allEvents[i].id_colab,
             _id: this.allEvents[i]._id,
            tipo: this.allEvents[i].tipo_evento,

            //timed: !allDay,
          })
          this.events = events
          this.eventosEmpresa=events
        }

        })
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      actualizarXEmpresa(identificador){
        console.log(identificador);
      },
      envioCorreo(){
        if(this.correo.length==0|| this.auntoCorreo==0){
          this.correoError=true;
        }else{
    setCorreo(this.selectedEvent.email,this.correo,this.auntoCorreo,this.selectedEvent.id_colab,this.selectedEvent.tipo,this.selectedEvent.start,this.selectedEvent._id).then( response => {
          console.log(response)
          this.selectedOpen = false
         this.correoError=false
         this.correo=""
         this.auntoCorreo=""
        })
         
        }
      
            
       
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          console.log(event)
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        console.log(start);
        console.log(end);
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>