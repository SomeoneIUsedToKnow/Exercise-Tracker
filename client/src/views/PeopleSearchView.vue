<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsersForSearch,updateUserFriends, findUserByEmail } from '@/model/session';
import{ref} from 'vue'


const session = getSession()
const users = ref([] as User[])




const EmailSearch = ref('')

function findyAUserByEmail(){

  let email:String = EmailSearch.value
  users.value.pop()
  findUserByEmail(email,"").then((data) => {
    if(data){
   users.value.push(data)
    }
  })
  EmailSearch.value = ''
}

function addAFriend(id: String){

  if(session.user?._id != id){
    if(session.user?.friends.length == 0){
      session.user.friends.push(id)
      updateUserFriends(session.user.friends)

    }else {
    if(session.user){
      for(let i = 0; i < session.user.friends.length; i++){
        if(session.user.friends[i] == id){
          return;
        }
      }
      session.user?.friends.push(id)
    updateUserFriends(session.user?.friends)
    }
}
  }
}



</script>

<template>
  <!-- Basic admin page no real data here whatsoever until users can be added -->
  <div class="field">
  <div class="control">
    <input class="input" type="text" placeholder="Search By email"  v-model="EmailSearch">
  </div>
  <button class="button"  @click="findyAUserByEmail">Search by email</button>
</div>
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
        <tr v-if="users" v-for="variables in users">
          
          
          <td>{{variables.FirstName}}</td>
          <td>{{variables.LastName}}</td>
          <td>{{variables.email}}</td>
          <td>{{variables.isAdmin}}</td>
          <td>
          
              <button class="button" @click="addAFriend(variables._id)">Add Friend</button>
           
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