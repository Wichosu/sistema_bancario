import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Balance from "@/components/Balance"
import Footer from "@/components/Footer"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Movement } from "@/types"
import SearchAccount from "@/components/SearchAccount"

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const first = data.get('first')?.valueOf()
  const second = data.get('second')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()

  if(typeof first !== "string" || typeof amount !== "string" || typeof second !== "string") {
    throw new Error("Invalid type")
  }

  try{

    const account = `2222 4545 80${first} ${second}`
    const prev = await client.db("Banco").collection("Cuenta").findOne({ numero_cuenta: account })
    
    client.db("Banco").collection("Cuenta").updateOne(
      { numero_cuenta: account },
      { $set: { inversiones: (prev?.inversiones + +amount) }}
    )

    const date = new Date()

    const movement:Movement = {
      numero_cuenta: account,
      tipo: "Inversion",
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
    return account
  } catch(e) {
    console.log(e)
    return '0'
  }
}

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Inversiones" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <SearchAccount getBalance={getBalance} />
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}