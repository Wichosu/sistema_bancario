import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Login from "@/components/Login"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { DB, Collections, Roles } from "@/types"

async function login(data: FormData) {
  "use server"
  //Get data from form
  const code = data.get("code")?.valueOf()
  const password = data.get("password")?.valueOf()
  //MongoDB client
  const client = await clientPromise

  let isEmployee = false;
  let isClient = false;

  //Check if type of data is correct
  if(typeof code !== "string" || typeof password !== "string") {
    throw new Error("Number or password not string")
  }

  //validate password
  try {
    const access = await client.db(DB.Banco).collection(Collections.Acceso).findOne({ clave: code });

    const access_account = await client.db(DB.Banco).collection(Collections.Cuenta).findOne({ numero_cuenta: code })

    if(access?.password !== password && access_account?.nip !== password) {
      return false
    }

    if(access?.password != null || access?.password != undefined) {
      isEmployee = true;
    }

    if(access_account?.nip != null || access_account?.nip != undefined) {
      isClient = true;
    }

  } catch(e) {
    console.error(e)
  }
  //constants to create a cookie
  const date = new Date()
  const hours = date.getHours()
  const expireDate = date.setHours(hours + 1)

  //create the cookie
  cookies().set({
    name: 'auth',
    value: code,
    expires: expireDate
  })

  if(isEmployee) {

    //check if user is admin and redirect to admin menu
    const user = await client.db(DB.Banco).collection(Collections.Empleado).findOne({ clave: code })
  
    if(user?.rol === Roles.Admin) {
      redirect('/menu-admin')
    } else {
      redirect('/menu')
    }
  }

  if(isClient) {
    redirect('/menu-client')
  }

  return false
}

export default function Page() {
  return (
    <div className="text-center">
      <Subtitle subtitle="Inicio de sesión" />
      <Login login={login} />
    </div>
  )
}