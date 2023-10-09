<script setup lang="ts">
//copy from his home as well
import {ref} from 'vue';
const newTask = ref('');
const tasks = ref([] as string[]);

function addTask(){
  tasks.value.push(newTask.value);
  newTask.value = '';
}
</script>

<template>
  <main>
    <h1 class="title">Home</h1>
    <h2 class="subtitle">welcome to vuejs and typescript</h2>
    <nav class="panel">
  <p class="panel-heading">
    Exercises
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="What do you want to do?" @keypress.enter="addTask"
      v-model="newTask">
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  
  <label class="panel-block" v-for="task in tasks">
    {{ task }}
  </label>
 
</nav>
  </main>
</template>
