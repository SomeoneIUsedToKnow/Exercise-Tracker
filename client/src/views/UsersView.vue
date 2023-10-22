<template>
  <!-- Basic admin page no real data here whatsoever until users can be added -->
  
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">

      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Emails</th>
          <th>Handle</th>
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
        <tr>
          <th>
          
          </th>
          <td>fname</td>
          <td>lname</td>
          <td>email</td>
          <td>handle</td>
          <td>true</td>
          <td>
          
              <button class="button">Edit Profile</button>
            <button class="button">Edit Account</button>
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