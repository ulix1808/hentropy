<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>-</h2>
            <form>
                <dropdown :options="empresas" :reduce="empresa => empresas.nombre"  :selected="object" v-on:updateOption="methodToRunOnSelect"  ></dropdown>
            </form>
        </div>
    </div>
    </div>
</template>

<script>

import dropdown from 'vue-dropdowns';

export default {

        name: 'Empresa',
        props: ['empresas','object'],

 
        components: {
            'dropdown': dropdown,
          
        },

        methods: {
          
    methodToRunOnSelect(payload) {
            this.object = payload;
          }
        }
      }
</script>




