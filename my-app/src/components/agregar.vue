<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      max-width="700px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#4c8bf1"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
          <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="guardarEvento"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-title>
          <span class="headline">Nuevo evento</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12">
                <v-text-field
                  label="Empresa"
                  v-model="idEmpresa"
                  :readonly="true"
                ></v-text-field>
              </v-col>
              <v-col cols="12" 
                sm="6"
                md="6">
                <v-text-field
                    label="Nombre del evento"
                  v-model="nombreEvento"
                ></v-text-field>
              </v-col>
              <v-col cols="12" 
                sm="6"
                md="6">
                <v-text-field
                    label="Descripcion del evento"
                  v-model="descripcionEvento"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="3"
              >
              <v-datetime-picker label="Select Datetime" v-model="fechaEvento"> </v-datetime-picker>

              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="9">

                <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      @click:row="handleClick"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
    <small>Seleccionado: {{seleccionado.nombre}}</small>
  </div>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
       <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { getColaboradores} from '../services/UserService'
  export default {
          props:{
              idEmpresa:String,
    },
    data: () => ({
      dialog: false,
      fechaEvento:"",
      search: '',
      calories: '',
      nombreEvento:"",
      descripcionEvento:"",
      seleccionado:[],
      desserts:[]
    }),
    computed: {
      headers () {
        return [
            { text: 'Id', value: '_id',
            visibility:false },
          {
            text: 'Nombre',
            align: 'start',
            sortable: false,
            value: 'nombre',
          },

          { text: 'Apellido paterno', value: 'apellido_paterno' },
          { text: 'Apellido Materno', value: 'apellido_materno' },
          { text: 'Email', value: 'email' },
          { text: 'Fecha Ingreso', value: 'fecha_ingreso' },
        ]
      },
    },
    watch:{
        idEmpresa(nuevoValor,valorAnterior){
            console.log("El nombre pasó de ser %s a %s", valorAnterior, nuevoValor);

           getColaboradores().then(response => {
               console.log("lista de colaboradores--------------");
            console.log(response)
            this.desserts=response

            
            })
        }
    },
    methods: {
      filterOnlyCapsText (value, search, item) {
          console.log(item);
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
      handleClick(value){
          console.log("valor agregado "+ value._id);
          this.seleccionado=value;
      },
      guardarEvento(){
          console.log(this.seleccionado._id)
          console.log(this.nombreEvento)
          console.log(this.descripcionEvento)
          console.log(this.seleccionado.email)
          console.log(this.fechaEvento)
          this.dialog = false

      },
    },
  }
  
</script>