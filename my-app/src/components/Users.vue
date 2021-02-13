<template>
    <div class="container">
        <h2>Eventos</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>User Id</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.firstName }}</td>
                  <td>{{ item.lastName }}</td>
                  <td>{{ item.email }}</td>
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