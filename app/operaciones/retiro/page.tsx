import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Footer from "@/components/Footer"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Movement } from "@/types"
import SearchAccount from "@/components/SearchAccount"

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const account = data.get('num_cuenta')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()

  if(typeof account !== "string" || typeof amount !== "string") {
    throw new Error("Invalid type")
  }

  try {

    const prev = await client.db("Banco").collection("Cuenta").findOne({ numero_cuenta: account })
    
    client.db("Banco").collection("Cuenta").updateOne(
      { numero_cuenta: account },
      { $set: { fondos: (prev?.fondos - +amount )}}
    )

    const date = new Date()

    const movement:Movement = {
      numero_cuenta: account,
      tipo: "Retiro",
      cantidad: amount,
      fecha: date.toLocaleString()
    }

    client.db("Banco").collection("Movimiento").insertOne(movement)
  } catch(e) {
    console.log(e)
  }

  redirect('/')
}

async function getBalance(account_number:string) {
  "use server"
  try {
    const client = await clientPromise
    const account = await client.db("Banco").collection("Cuenta").findOne({ numero_cuenta: account_number})
    return account?.fondos.toString()
  } catch(e) {
    console.log(e)
    return '0'
  }
}

export default async function Page(){
  return(
    <>
      <Subtitle subtitle="Retiro" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <SearchAccount getBalance={getBalance} />
        <div className="flex gap-8">
          <Input label="Cantidad" name="cantidad" type="number" />
        </div>
        <Footer />
      </form>
    </>
  )
}