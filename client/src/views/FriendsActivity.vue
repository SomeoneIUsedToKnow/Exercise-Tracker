<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsersForUserView, deleteaUser,findUserByEmail, useLogin,updateUserFriends } from '@/model/session';
import { ref } from 'vue'
import type { Exercise } from '@/model/exercise';
/*
let session = getSession()
getAllUsersForUserView();
*/
let exerciseStructure: Exercise 

let session = getSession();

let myFriends = ref([] as User[])

  
let users = ref([] as User[])

getAllUsersForUserView().then((data) => {
  if(data)
  users.value = data
})

if(session.user){

    for(let i = 0 ; i < session.user.friends.length; i++){
    findUserByEmail(session.user.friends[i], '').then((data) => {
  if(data){
    if(data.workouts){
      myFriends.value.push(data)
    }
  }
  
})
  }
}



function RemoveFriend(email: string){
  if(session.user)
  for(let i = 0 ; i < session.user?.friends.length; i++){
      if(session.user.friends[i] == email){
        session.user.friends.splice(i,1)
      }
      updateUserFriends(session.user.friends)
      
  }
    
}



</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title" >Friends Most Recent Activity</h1>
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
        Friends Runs
        </p>     
        <label class="box" v-for="variable in myFriends">
      
          <p>Email: {{ variable.email }}
            <br>Ran For: {{ variable.workouts[0].time }}min   
             <br>Distance Ran: {{ variable.workouts[0].Distance }}miles
             <br>Latitude: {{ variable.workouts[0].Lat }}
             <br>Longitude:  {{ variable.workouts[0].Long }}
             <br>Date:  {{ variable.workouts[0].date }}
              <br>Average Speed:  {{ variable.workouts[0].speed }} miles per hour</p>
              <button  @click="RemoveFriend(variable.email)" >Remove Friend</button>
        </label>
       
      </div>
    </div>
  </main>
</template>