<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsersForUserView, deleteaUser, useLogin } from '@/model/session';
import { ref } from 'vue'
/*
let session = getSession()
getAllUsersForUserView();
*/
function Delete(id: string): void {
  deleteaUser(id);
 
getAllUsersForUserView().then((data) => {
  if(data)
  users.value = data
})
  
}
  
let users = ref([] as User[])

getAllUsersForUserView().then((data) => {
  if(data)
  users.value = data
})


</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      <h1 class="title" >My Activity</h1>
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
        Friends Runs
        </p>     
        <label class="box" v-for="variable in users">
         
          <p>Ran For: {{ variable.FirstName }}min   
             <br>Distance Ran: {{variable.FirstName}}miles
             <br>Latitude: {{variable.FirstName}}
             <br>Longitude: {{variable.FirstName}}
             <br>Date: {{ variable.FirstName }}
              <br>Average Speed: {{ variable.FirstName }} miles per hour</p>
              <button  @click="Delete(variable.FirstName)" >Delete</button>
        </label>
       
      </div>
    </div>
  </main>
</template>