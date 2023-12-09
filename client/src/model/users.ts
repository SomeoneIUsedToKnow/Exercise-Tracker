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

