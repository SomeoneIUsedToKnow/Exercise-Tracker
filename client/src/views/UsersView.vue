<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsers, deleteaUser, useLogin } from '@/model/session';


let session = getSession()
const { login } = useLogin()
getAllUsers()


function Delete(id: string): void {
  deleteaUser(id);
   location.reload()
 
  login('TestingAdmin1@newpaltz.edu', '12345678')
  
}
  

 
let users: User[] | null = session.users;


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