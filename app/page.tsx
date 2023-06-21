import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

async function login(data: FormData) {
  "use server"
  const number = data.get("number")?.valueOf()
  const password = data.get("password")?.valueOf()

  if(typeof number !== "string" || typeof password !== "string") {
    throw new Error("Number or password not string")
  }

  try {
    const client = await clientPromise
    const window = await client.db("Banco").collection("Ventanilla").findOne({ clave: number });

    if(window?.password !== password) {
      return
    }

  } catch(e) {
    console.error(e)
  }
  const date = new Date()
  const hours = date.getHours()
  const expireDate = date.setHours(hours + 1)


  cookies().set('auth', 'true')

  cookies().set({
    name: 'auth',
    value: number,
    expires: expireDate
  })

  redirect('/menu')
}

export default function Page() {
  return (
    <div className="text-center">
      <Subtitle subtitle="Login" />
      <form action={login} className="grid justify-center gap-6">
        <Input label="Numero de ventanilla" name="number" /> 
        <Input label="Contraseña" type="password" name="password" />
        <button className="px-4 py-2 bg-blue-300 rounded">Acceder</button>
      </form>
    </div>
  )
}