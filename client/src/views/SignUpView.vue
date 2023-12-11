<script setup lang="ts">
import { ref } from 'vue';

import { getSession, updateUserWorkouts ,createUser, useLogin } from '@/model/session';
import type { Exercise} from '@/model/exercise';
import type { User } from '@/model/users';

const session = getSession()
const { login, logout } = useLogin()
 const myWorkout = ref([] as Exercise[])
 const myFriends = ref([] as string[])
const Email = ref('')
 const Password = ref('')
const firstName = ref('')
const lastName = ref('')
 interface CreationUser {
  
  FirstName: string,
  LastName: string,
  email: string,
  password: string,
 
  isAdmin: boolean ,
 workouts: Exercise[],
  friends: string[]
}

function createNewUser(email: string, password: string, FirstName: string, LastName: string){
    let newUser: CreationUser = {
      FirstName: FirstName,
  LastName: LastName,
  email: email,
  password: password,
 
  isAdmin: false ,
 workouts: myWorkout.value,
  friends: myFriends.value
    }
  createUser(newUser)

    Email.value = ''
    Password.value = ''
    firstName.value = ''
    lastName.value = ''

    login(email, password)
    

}

</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
      
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
         Sign Up Form
        </p>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" @click="createNewUser(Email,Password,firstName,lastName)">
           Sign Up
          </button>
        </div>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input  class="input" type="text" placeholder="Email"
                   v-model="Email" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Password"
                   v-model="Password" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="First Name"
                   v-model="firstName" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Last Name"
                   v-model="lastName" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
       
      </div>
    </div>
  </main>
</template>