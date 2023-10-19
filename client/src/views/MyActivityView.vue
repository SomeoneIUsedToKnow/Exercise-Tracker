<script setup lang="ts">
import { ref } from 'vue';

  const newTaskName = ref('');
  const tasks = ref([] as { id?: number, text: string, completed: boolean }[] );

  const newExerciseDistance = ref('');
  const newExerciseTime = ref('');
  const newExerciseLocation = ref('');
  const newExerciseSpeed = ref('');
  const newExerciseDate = ref('');
  const exercises = ref([] as {Distance: string, location: string, speed: string, date: string, time: string}[]);
 

  const tabList = ['Current', 'Completed', 'All'];
  const tabState = ref('Current');

  function addTask() {
    tasks.value.push({ text: newTaskName.value, completed: false });
    newTaskName.value = '';
    
  };

  function addExercise() {
    exercises.value.push({ Distance: newExerciseDistance.value , location: newExerciseLocation.value, speed: newExerciseSpeed.value, date: newExerciseDate.value, time: newExerciseTime.value});
    newExerciseDate.value = '';
    newExerciseDistance.value = '';
    newExerciseLocation.value = '';
    newExerciseSpeed.value = '';
    
  };

  const shouldDisplay = (task: { id?: number, text: string, completed: boolean }) =>
    (tabState.value == 'Current' && !task.completed) ||
    (tabState.value == 'Completed' && task.completed) ||
    tabState.value == 'All';


</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title" >My Activity</h1>
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
          To Do
        </p>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" @click="addTask">
            Reset all filters
          </button>
        </div>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input  class="input" type="text" placeholder="What do you want to do"
                    @keypress.enter="addTask" v-model="newTaskName" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="What do you want to do"
                    @keypress.enter="addTask" v-model="newINput" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p class="panel-tabs">
          <a v-for="tab in tabList" :class="{ 'is-active': tabState == tab}" @click.prevent="tabState = tab">{{ tab }}</a>
        </p>
        <label class="panel-block" v-for="exercise in exercises">
         
          <p>Ran For: {{ exercise.time }}min   
             <br>Distance: {{exercise.Distance}}
             <br>Location: {{exercise.location}}
             <br>Date: {{ exercise.location }}</p>
        </label>
       
      </div>
    </div>
  </main>
</template>