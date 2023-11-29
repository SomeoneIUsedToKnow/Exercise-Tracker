import { reactive } from "vue";
import type { User } from "./users";


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

  export function AddExercise(user: User, exercise: Exercise) : void{

    user.workouts.push(exercise);
  
  }


  export function GetExercises(user: User) : Exercise[] {


    return user.workouts;
  }
  
  export function DeleteExercise(id: number, user: User): void {
    for(let i=0; i<user.workouts.length; i++){
   if (user.workouts[i].id == id){
   user.workouts.splice(i);
   }
  }
  
  }