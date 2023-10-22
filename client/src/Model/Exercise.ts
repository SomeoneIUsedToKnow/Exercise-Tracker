import { reactive } from "vue";
const session = reactive({
    exercise: null as Exercise | null,
  })

export interface Exercise {
    id: number,
    Distance: number, 
    Lat: string, 
    Long: string, 
    speed: number, 
    date: string, 
    time: string
  }
  
 
 
  export var AverageDistance: number;
  export var AverageSpeed: number;
  export var AverageTime: number;

  export function setAverage(exercises: Exercise[]): void {

  var  totalDistance = 0;
  var totalSpeed = 0
  var totaltime = 0;
    for(let i=0; i<exercises.length; i++){
         totalDistance= + exercises[i].Distance;
         totalSpeed = + exercises[i].speed;
         totaltime = + exercises[i].time;

  }
   AverageDistance = Number(totalDistance) / exercises.length;
   AverageSpeed = Number(totalSpeed) / exercises.length;
   AverageTime = Number(totaltime) / exercises.length;

}