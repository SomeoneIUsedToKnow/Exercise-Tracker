<script setup lang="ts">
import { ref } from 'vue';

import { getSession, updateUserWorkouts } from '@/model/session';
import type { Exercise} from '@/model/exercise';
import type { User } from '@/model/users';
 
const session = getSession()

 
  const newExerciseDistance = ref('');
  const newExerciseTime = ref('');
  
  const newExerciseSpeed = ref('');
  const newExerciseDate = ref('');
  const newExerciseLat = ref('');
  const newExerciseLong = ref('');
  const newExerciseId = ref('');
  
  //let exercises = ref([] as Exercise[])
 
  let myExercises: Exercise[]


  function Delete(id: number): void {
    let exercises = ref([] as Exercise[])
if(session.user){
 
 
for(let i = 0; i < session.user.workouts.length; i++){
  if(session.user.workouts[i].id != id){
    exercises.value.push(session.user.workouts[i])
  }
}
session.user.workouts = exercises.value
updateUserWorkouts(exercises.value)
  }
  }
let continueId: number
  function addExercise() {
    
   
   let id = Number((Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4)); 
    let distance = Number(newExerciseDistance.value);
    let time = Number(newExerciseTime.value);
    let timeInHours = time/60;
    let avgSpeed = distance / timeInHours;
   
    let exercise: Exercise;
    exercise = {id: id,
    Distance: distance, 
    Lat: newExerciseLat.value, 
    Long: newExerciseLong.value, 
    speed: avgSpeed, 
    date: newExerciseDate.value, 
    time: String(time)
  };
   
  if(session.user){

    if(!exercise.Distance || !exercise.Lat || !exercise.Long || !exercise.date ||!exercise.speed ||!exercise.time){
      throw new Error('No fields can be empty')
    }
    session.user.workouts.push(exercise);
    updateUserWorkouts(session.user.workouts)
  }
    
    newExerciseDate.value = '';
    newExerciseDistance.value = '';
   newExerciseLong.value = '';
   newExerciseLat.value = '';
    newExerciseSpeed.value = '';
    newExerciseTime.value = '';
    
  };

 
  
 

</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title" >My Activity</h1>
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
          My Runs
        </p>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" @click="addExercise">
            Add New Run
          </button>
        </div>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input  class="input" type="text" placeholder="How long did you run?"
                   v-model="newExerciseTime" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="How far did you run?"
                   v-model="newExerciseDistance" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="When did you run?"
                    v-model="newExerciseDate" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Latitude of where you ran?"
                    v-model="newExerciseLat" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Longitude of where you ran?"
                    v-model="newExerciseLong" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        
        <label class="box" v-for="variable in session.user?.workouts">
         
          <p>Ran For: {{ variable.time }}min   
             <br>Distance Ran: {{variable.Distance}}miles
             <br>Latitude: {{variable.Lat}}
             <br>Longitude: {{variable.Long}}
             <br>Date: {{ variable.date }}
              <br>Average Speed: {{ variable.speed }} miles per hour</p>
              <button  @click="Delete(variable.id)" >Delete</button>
        </label>
       
      </div>
    </div>
  </main>
</template>