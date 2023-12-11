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

  



if(session.user){

    for(let i = 0 ; i < session.user.friends.length; i++){
    findUserByEmail(session.user.friends[i], '').then((data) => {
  if(data){
  
      myFriends.value.push(data)
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
            <br>First Name: {{ variable.FirstName }}   
             <br>Last Name: {{ variable.LastName }}
                </p>
              <button  @click="RemoveFriend(variable.email)" >Remove Friend</button>
        </label>
       
      </div>
    </div>
  </main>
</template>