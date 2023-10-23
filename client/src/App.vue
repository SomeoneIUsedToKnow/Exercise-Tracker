<script setup lang="ts">
import { RouterView } from 'vue-router'
import navbar from './components/Navbar.vue'
import { ref } from 'vue';
/*
const personObj = {
  haircolor:"blue"
};
const person = ref(personObj); */
</script>

<template>
  <header>
    <navbar />
  </header>

    <div class="container">
    
      <RouterView />
    </div>
  

</template>

<style scoped>
body {
  background-color: aliceblue;
}
.container{
  background-color: white;
  box-shadow:burlywood ;
  padding: 5px;
  min-height: 100vh;
}
</style>
