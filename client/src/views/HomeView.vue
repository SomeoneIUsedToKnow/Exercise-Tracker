<script setup lang="ts">
import { AverageDistance } from '@/model/exercise';
import { getSession } from '@/model/session';
import { ref } from 'vue';
let  averageDistance: number
let averageDuration: number
let averageSpeed: number
let distanceTally!: number
let DurationTally!: number
let speedTally!: number
const session = getSession()
if(session.user){
 
let totalWorkouts = session.user.workouts.length
session.user.workouts.forEach(element => {
 let  distanceTally= + element.Distance
  DurationTally = + element.time
  speedTally = + element.speed

});

averageDistance = distanceTally/totalWorkouts
averageDuration = DurationTally/totalWorkouts
averageSpeed = speedTally/totalWorkouts

}


</script>


<template>
  <div class="box has-text-success summary">
    <h2 class="title">Overall Stats</h2>
    <div class="columns is-multiline">
      <div class="column is-half">
        <h3 class="value">Distance: {{averageDistance}}</h3>
        <caption class="caption">Average Distance Ran</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">{{averageDuration}} min</h3>
        <caption class="caption">Average Duration</caption>
      </div>
      <div  class="column is-half">
        <h3 class="value">{{averageSpeed}}mph</h3>
        <caption class="caption">Average Pace</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">100 cal</h3>
        <caption class="caption">Average calories</caption>
        <h3 class="value">1000 cal</h3>
        <caption class="caption">Total calories</caption>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.caption {
  display: block;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;

}

.summary {
  text-align: center;
}
</style>
