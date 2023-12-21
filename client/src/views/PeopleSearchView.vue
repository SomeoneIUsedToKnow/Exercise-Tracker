<script setup lang="ts">
import type { User } from '@/model/users';
import { getuser,getSession, getAllUsersForSearch,updateUserFriends, findUserByEmail } from '@/model/session';
import{ref} from 'vue'



const session = getSession()
const users = ref([] as User[])

const isFetching = ref(false);
const page = ref(1);
const totalPages = ref(1);

const data = ref([]);
const selected = ref(null);
const name = ref("");

async function getAsyncData(_name:string) {
    if (name.value !== _name) {
        name.value = _name;
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
    }

    // String cleared
    if (!_name.length) {
        data.value = [];
        page.value = 1;
        totalPages.value = 1;
        return;
    }

    // Reached last page
    if (page.value > totalPages.value) {
        return;
    }

    isFetching.value = true;
    try {
        const _data = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${_name}&page=${page.value}`,
        ).then((response) => response.json());

        data.value = [...data.value, ..._data.results];
        page.value += 1;
        totalPages.value = _data.total_pages;
    } catch (err) {
        console.error(err);
    } finally {
        isFetching.value = false;
    }
}

function getMoreAsyncData() {
    getAsyncData(name.value);
}


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

function addAFriend(email: String){

  if(session.user?.email != email){
    if(session.user?.friends.length == 0){
      session.user.friends.push(email)
      updateUserFriends(session.user.friends)

    }else {
    if(session.user){
      for(let i = 0; i < session.user.friends.length; i++){
        if(session.user.friends[i] == email){
          return;
        }
      }
      session.user?.friends.push(email)
    updateUserFriends(session.user?.friends)
    }
}
  }
}
 const stuff = [
        {
            text:'Item 1',
            value: 'item-1'
        },
        {
            text:'Item 2',
            value: 'item-2'
        },
        {
            text:'Item 3',
            value: 'item-3'
        },
    ]

    let testingUsers : User[]
    let testinString = ref([] as string[])
        let passingArray: string[]
    getAllUsersForSearch().then((data) => {
    
      if(data){
      testingUsers = data
      }
      testingUsers.forEach(element => {
      testinString.value.push(element.email)
      });
      testinString.value.forEach(element => {
          console.log(element)
        
      });
     
    })

</script>

<template>
<section>
    <o-field label="Find a movie">
        <o-autocomplete
            :data="data"
            placeholder="e.g. Fight Club"
            field="title"
            :loading="isFetching"
            check-scroll
            open-on-focus
            :debounce="500"
            @input="getAsyncData"
            @select="(option) => (selected = option)"
            @scroll-end="getMoreAsyncData">
            <template #default="props">
                <div class="media">
                    <div class="media-left">
                        <img
                            width="32"
                            :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`" />
                    </div>
                    <div class="media-content">
                        {{ props.option.title }}
                        <br />
                        <small>
                            Released at {{ props.option.release_date }},
                            rated
                            <b>{{ props.option.vote_average }}</b>
                        </small>
                    </div>
                </div>
            </template>
            <template v-if="page > totalPages" #footer>
                <span class="ex-text-grey">
                    Thats it! No more movies found.
                </span>
            </template>
        </o-autocomplete>
    </o-field>
    <p><b>Selected:</b> {{ selected }}</p>
</section>


  
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
          
              <button class="button" @click="addAFriend(variables.email)">Add Friend</button>
           
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