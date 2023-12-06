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
  <!-- Basic admin page no real data here whatsoever until users can be added -->

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"  >

      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Emails</th>
          <th>Is Admin</th>
          <th>
            <div class="dropdown is-hoverable is-right">
              <div class="dropdown-trigger">
                  <span>Actions</span>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
               
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          
          
          <td>{{user.FirstName}}</td>
          <td>{{user.LastName}}</td>
          <td>{{user.email}}</td>
          <td>{{user.isAdmin}}</td>
          <td>
          
             
              <button class="button" @click="Delete(user._id)" >Delete</button>
             
            </td>
        </tr>

      </tbody>
    </table>

</template>

<script setup lang="ts">



</script>

<style scoped>
.photo {
  width: 128px;
}

.table tbody {
  word-break: break-word;
}

.title {
  text-align: center;
}
</style>