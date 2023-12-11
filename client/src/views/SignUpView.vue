<script setup lang="ts">
import { ref } from 'vue';

import { getSession, updateUserWorkouts } from '@/model/session';
import type { Exercise} from '@/model/exercise';
import type { User } from '@/model/users';
 
const Email = ref('')
 const Password = ref('')



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
          <button class="button is-link is-outlined is-fullwidth" @click="">
           Sign Up
          </button>
        </div>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input  class="input" type="text" placeholder="How long did you run?"
                   v-model="Email" >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="How far did you run?"
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