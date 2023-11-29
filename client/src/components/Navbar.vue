<script setup lang="ts">
import LoginBadge from './LoginBadge.vue';
import { RouterLink } from 'vue-router';
import {ref} from 'vue';
import { getSession } from '@/model/session';

const session = getSession();
const isActive = ref(false);

</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <RouterLink class="navbar-item" to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="112" />
       </RouterLink>
    

    <a role="button" class="navbar-burger" @click="isActive = !isActive" :class="{'is-active' : isActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isActive}">
    <div class="navbar-start">
        
        <RouterLink class="navbar-item" to="/myactivity">My Activity</RouterLink>
        <RouterLink class="navbar-item" to="/statistics">Statistics</RouterLink>
        <RouterLink class="navbar-item" to="/friendsactivity">Friends Activity</RouterLink>
        <RouterLink class="navbar-item" to="/peoplesearch">People Search</RouterLink>
      
      

       
      <div class="navbar-item has-dropdown is-hoverable" v-if="session.user?.isAdmin">
        <a class="navbar-link">
          Admin
        </a>
       
        <div class="navbar-dropdown">
          <a class="navbar-item">
            <RouterLink class="navbar-item" to="/users">Users</RouterLink>

          </a>
      </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <LoginBadge />
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.router-link-active{
    font-weight: bold;
    
}
.navbar{
  background-color:rgb(64, 224, 160);
}
.navbar-item:hover{
  background-color: rgb(55, 197, 140);
}


</style>