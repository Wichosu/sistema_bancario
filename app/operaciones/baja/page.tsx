import Subtitle from "@/components/Subtitle"
import SearchAccount from "@/components/SearchAccount"
import Footer from "@/components/Footer"
import { getBalance } from "@/server/getBalance"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Movement } from "@/types"

async function dropAccount(data: FormData) {
  "use server"
  const client = await clientPromise
  const first = data.get('first')?.valueOf()
  const second = data.get('second')?.valueOf()

  if(typeof first !== "string" || typeof second !== "string") {
    throw new Error('Invalid data type. Expected "string"')
  }

  try {
    const account_number = `2222 4545 80${first} ${second}`

    const account = await client
      .db("Banco")
      .collection("Cuenta")
      .findOne({ numero_cuenta: account_number})

    const date = new Date()

    const movement:Movement = {
      numero_cuenta: account_number,
      tipo: "Baja",
      cantidad: account?.fondos,
      fecha: date.toLocaleString()
    }

    client.db("Banco").collection("Cuenta").deleteOne({ numero_cuenta: account_number})
    client.db("Banco").collection("Movimiento").insertOne(movement)
  } catch(e) {
    console.log(e)
  }

  redirect('/')
}

export default function Page() {
  return (
    <>
      <Subtitle subtitle="Alta de Cuenta" />
      <form action={dropAccount} method="post" className="grid gap-8">
        <SearchAccount getBalance={getBalance} />
        <Footer />
      </form>
    </>
  )
}