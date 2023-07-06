import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
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

  //Check if type of data is correct
  if(typeof code !== "string" || typeof password !== "string") {
    throw new Error("Number or password not string")
  }

  //validate password
  try {
    const access = await client.db(DB.Banco).collection(Collections.Acceso).findOne({ clave: code });

    if(access?.password !== password) {
      return
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

  //check if user is admin and redirect to admin menu
  const user = await client.db(DB.Banco).collection(Collections.Empleado).findOne({ clave: code })

  if(user?.rol === Roles.Admin) {
    redirect('/menu-admin')
  } else {
    redirect('/menu')
  }
}

export default function Page() {
  return (
    <div className="text-center">
      <Subtitle subtitle="Login" />
      <form action={login} className="grid justify-center gap-6">
        <Input label="Clave" name="code" /> 
        <Input label="Contraseña" type="password" name="password" />
        <button className="px-4 py-2 bg-blue-300 rounded">Acceder</button>
      </form>
    </div>
  )
}