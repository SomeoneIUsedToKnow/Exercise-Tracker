<script setup lang="ts">
//copy from his home as well
import {ref} from 'vue';
const newActivity = ref('');
const activities = ref([] as string[]);

function addActivity(){
  activities.value.push(newActivity.value);
  newActivity.value = '';
}
</script>

<template>
  <main>
    <h1 class="title">My Activity</h1>
   
    <nav class="panel">
  <p class="panel-heading">
    Exercises
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="What do you want to do?" @keypress.enter="addActivity"
      v-model="newActivity">
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
  </div>
  
  <label class="panel-block" v-for="activity in activities">
    {{ activity }}
  </label>
 
</nav>
  </main>
</template>
