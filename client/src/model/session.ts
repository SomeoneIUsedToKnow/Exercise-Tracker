import { reactive } from "vue";
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification";
import * as myFetch from "./myFetch";
import { getUsers, type User } from "./users";

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


export function deleteaUser(id: string)
{
  api(`users/${id}`,"","DELETE")
}
export function showError(err: any){
  console.error(err);
  session.messages.push({ type: "error", text: err.message ?? err});
  toast.error( err.message ?? err);
}


export async function updateUser(user:User): Promise<User | null> {
  const response = await api(`users/${user._id}`,{user},"PATCH")
  session.user = response.user;

  return session.user;
  
}


export async function getAllUsers(): Promise<User[] | null>{
  const response =await api("users/");
  session.users = response.users;

  return session.users;
  
}



  export async function getuser(id: string): Promise<User | null> {
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