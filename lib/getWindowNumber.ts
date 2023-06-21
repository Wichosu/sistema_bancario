import { cookies } from "next/headers";

export function getWindowNumber() {
  const window = cookies().get('auth')?.value
  if(window){
    return window
  }
  return ''
}