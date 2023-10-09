<script setup lang="ts">
import { RouterLink } from 'vue-router';
import {ref} from 'vue';
const isActive = ref(false);

//READ HIS CODE FOR NAVBAR THERE ARE MISSED ITEMS
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="112" />
    </a>

    <a role="button" class="navbar-burger" @click="isActive = !isActive" :class="{'is-active' : isActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isActive}">
    <div class="navbar-start">
        
        <RouterLink class="navbar-item" to="/">My Activity</RouterLink>
        <RouterLink class="navbar-item" to="/about">About</RouterLink>
      

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.router-link-active{
    font-weight: bold;
    
}
</style>