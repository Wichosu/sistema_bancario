import { cookies } from "next/headers";

export function getEmployeCode() {
  const code = cookies().get('auth')?.value

  return code ? code : ''
}