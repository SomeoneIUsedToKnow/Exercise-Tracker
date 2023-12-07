<script setup lang="ts">
import { ref } from 'vue';

import { getSession, updateUserWorkouts,getAllUsersForSearch,getuser } from '@/model/session';
import type { Exercise} from '@/model/exercise';
import { getUsers, type User } from '@/model/users';


const session = getSession()


function Delete(){

}

let users = ref([] as User[])
let correctUsers = ref([] as User[])
let myuser: User

if(session.user){

getAllUsersForSearch().then((data) => {
  if(data){
  users.value = data
  }
})


}




 </script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title" >Friend's Most Recent Activities</h1>
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
          Friend's Runs:
        </p>
       
        <label class="box" v-for="variable in users" >

         Email: {{  variable.email }}
         <p>Ran For: {{ variable.workouts[0].time }}min   
            <br>Distance Ran:{{variable.workouts[0].Distance   }}miles
            <br>Latitude: {{  variable.workouts[0].Lat }}
            <br>Longitude:{{ variable.workouts[0].Long }}
            <br>Date: {{ variable.workouts[0].date }}
             <br>Average Speed: {{variable.workouts[0].speed   }} miles per hour</p>
             <button  @click="Delete()" >Remove</button>
       </label>
       </div>
      </div>
  </main>
</template>