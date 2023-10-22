<script setup lang="ts">
import  { getAverageStats, AverageDistance, AverageSpeed,AverageTime} from '@/Model/Exercise.ts';

</script>


<template>
  <div class="box has-text-success summary">
    <h2 class="title">Overall Stats</h2>
    <div class="columns is-multiline">
      <div class="column is-half">
        <h3 class="value">Distance:{{AverageDistance}} miles</h3>
        <caption class="caption">Average Distance Ran</caption>
      </div>
      <div class="column is-half">
        <h3 class="value">{{ AverageTime }}</h3>
        <caption class="caption">Average Duration</caption>
      </div>
      <div  class="column is-half">
        <h3 class="value">{{AverageSpeed}}</h3>
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
