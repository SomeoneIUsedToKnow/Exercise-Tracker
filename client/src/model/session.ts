import { reactive } from "vue";
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification";
import * as myFetch from "./myFetch";
import {  type User } from "./users";
import type { Exercise } from "./exercise";

const toast = useToast();

const session = reactive({
  user: null as User | null,
  token: null as string | null,
  users: null as User[] | null,
  randomuser: null as User | null,
  redirectUrl: null as string | null,
  messages: [] as {
    type: string,
    text: string
  }[],
  loading: 0
})

export function api(action: string, body?: unknown, method?: string, headers?: any){
  session.loading++;

  if(session.token){
    headers = headers ?? {};
    headers['Authorization'] = `Bearer ${session.token}`;
  }

  return myFetch.api(`${action}`, body, method, headers)
    .catch(err=> showError(err))
    .finally(()=> session.loading--);
}

export function getSession(){
  return session;
}


export async function deleteaUser(id: string): Promise<User[] | null>
{
  const router = useRouter();
  api(`users/${id}`,"","DELETE")


  const response =await api("users/");
  session.users = response.users;
  router.push(session.redirectUrl || "/users");
  return session.users;

}


export async function admindeleteaUser(id: string): Promise<User[] | null>
{
  const router = useRouter();
  api(`admin/${id}`,"","DELETE")


  const response =await api("admin/");
  session.users = response.users;

  return session.users;

}
export function showError(err: any){
  console.error(err);
  session.messages.push({ type: "error", text: err.message ?? err});
  toast.error( err.message ?? err);
}


export async function updateUser(user:User): Promise<User | null> {
  const response = await api(`users/${session.user?._id}`,user,"PATCH")
  session.user = response.user;

  return session.user;
  
}


export async function updateUserWorkouts(workouts: Exercise[]): Promise<User | null> {

  const response = await api(`users/${session.user?._id}`,{workouts},"PATCH")
  session.user = response.user;

  return session.user;
  
}


export async function updateUserFriends(friends: String[]): Promise<User | null> {
 
  const response = await api(`friends/${session.user?._id}`,{friends},"PATCH")
  session.user = response.user;

  return session.user;
  
}


export async function getAllUsersForUserView(): Promise<User[] | null>{
 
  const response = await api("users/");
  return response.users;
  
}

export async function getAllUsersForSearch(): Promise<User[] | null>{
  const response =await api("users/");
  session.users = response.users;

 
  return response.users;
  
}



export async function findUserByEmail(email: String): Promise<User | null> {
  const router = useRouter();
  
  const response = await api(`friends/${email}`)

  return response.user;
}


  export async function getuser(id: String): Promise<User | null> {
    const router = useRouter();

    const response = await api(`users/${id}`)

    session.randomuser = response.user;
   
    return response.user;
  }

export function useLogin(){
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise< User | null> {
      const response = await api("users/login", { email, password });

      session.user = response.user;
      session.token = response.token;

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout(){
      session.user = null;
      router.push("/login");
    }
  }
}