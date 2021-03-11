<template>
  <div id="app">
    <!--<Dashboard />-->

  <!--    <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Rimorsoft</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <router-link tag="li" to="/" >
                            <a>Home</a>
                        </router-link>
                        <router-link tag="li" to="/Home">
                            <a>Dashboard</a>
                        </router-link>
                     
                    </ul>
                </div>
            </div>
        </nav>-->
     <router-view >
    </router-view>
  </div>
   
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    //Dashboard
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>