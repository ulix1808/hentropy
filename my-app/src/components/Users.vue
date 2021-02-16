<template>
    <div class="container">
        <h2>Eventos</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
             
                <th>Nombre</th>
                <th>Email</th>
                <th>Evento</th>
           
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.id">
              
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.evento}}</td>
     
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Users',
        props: ['users']
     }
</script>