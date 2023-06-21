import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function isAuth() {
  if(!cookies().has('auth')) redirect('/')
}