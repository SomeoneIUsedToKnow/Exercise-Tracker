<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsersForUserView, deleteaUser, useLogin, admindeleteaUser, adminUpdateUser } from '@/model/session';
import { ref } from 'vue'
import type { Exercise } from '@/model/exercise';


const isActive = ref(false);
let myuser!: User 


function Delete(id: string): void {
  admindeleteaUser(id);
 
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
interface updatedUser {
  
  FirstName: string,
  LastName: string,
  email: string,
  password: string,
  isAdmin: true ,

 
}

function editUser(user: User){
  
 let editedUser: updatedUser;

 editedUser = {
  
  FirstName: user.FirstName,
  LastName: user.LastName,
  email: user.email,
  password: user.password,
  isAdmin: user.isAdmin,
 }

 adminUpdateUser(editedUser, user)

}

</script>

<template>
  
<main>
  
  
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
              <button class="button" @click="isActive = !isActive; myuser = user">Edit</button>
            </td>
        </tr>

      </tbody>
    </table>
    <div v-if="isActive">
      <div class="panel-block">
          <p class="control has-icons-left">
            <input  class="input" type="text" placeholder="First Name" v-model="myuser.FirstName"
                   >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Last Name" v-model="myuser.LastName"
                  >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Email" v-model="myuser.email"
                   >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="Password" v-model="myuser.password"
                    >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
            <input  class="input" type="text" placeholder="admin? (true or false)" v-model="myuser.isAdmin"
                    >
            <span class="icon is-left">
              <i class="fas fa-plus" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <button class="button" @click="isActive = !isActive">cancel</button>
        <button class="button" @click="isActive = !isActive; editUser(myuser)">Edit User</button>
    </div>
</main>
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