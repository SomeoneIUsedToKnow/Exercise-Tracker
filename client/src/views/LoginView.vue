<script setup lang="ts">
import { ref } from 'vue';

import { getSession, updateUserWorkouts ,createUser, useLogin } from '@/model/session';


const session = getSession()
const { login, logout } = useLogin()

const Email = ref('')
 const Password = ref('')


 const doLogin = (Email: string, Password: string) => {
  login(Email, Password)
}

</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-full">
    </div>

    <div class="column is-half-desktop is-centered">
      <div class="panel is-primary">
        <p class="panel-heading">
         Login  Form
        </p>
        <div class="panel-block">
          <button class="button is-link is-outlined is-fullwidth" @click="doLogin(Email,Password)">
          Login
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
           
          </p>
        </div>
       
      </div>
    </div>
  </main>
</template>