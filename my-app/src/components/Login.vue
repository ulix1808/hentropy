<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              append-icon="mdi-account"
                              label="Login"
                              type="text"
                              v-model="usuario"
                           ></v-text-field>
                           <v-text-field
                              append-icon="mdi-lock"
                              label="Password"
                              type="password"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import { login } from '../services/UserService'
export default {
   name: 'Login',
   
   props: {
      source: String,
   },
   data: () => ({
      usuario:'',
   password:'',
   }),
   methods:{
      login(){
         login().then(response => {
            console.log(response)
            if(response=='true'){
               window.location.href = 'home';
            }
         })
      }
   },
};
</script>

<style></style>