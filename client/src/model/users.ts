import { api } from "./session";
import type { Exercise } from "./exercise"

export interface User {
  
  FirstName: string,
  LastName: string,
  email: string,
  password: string,
  _id: string,
  isAdmin: true 
  
  token?: string
 workouts: Exercise[] 
  friends: String[]
}

/*
export function AddExercise(exercise: Exercise, user : User) : void{
 
  user.workouts.push(exercise);

}
 */
/*
export function DeleteExercise(id: number, user: User): void {
  if(user.workouts != null) {
  for(let i=0; i<user.workouts.length; i++){
 if (user.workouts[i].id == id){
 user.workouts.splice(i);
 }
}
}

} */

export function getUsers():  Promise< User[] | null> {
  return api("users"); 
}
/*
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find( x => x.email === email );
} */