<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
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
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Fecha del Evento"
                  v-model="fechaEvento"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="8"
              >
              <v-datetime-picker label="Select Datetime" v-model="fechaEvento"> </v-datetime-picker>

              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
          props:{
              idEmpresa:String,
    },
    data: () => ({
      dialog: false,
      fechaEvento:"",
    }),
  }
</script>