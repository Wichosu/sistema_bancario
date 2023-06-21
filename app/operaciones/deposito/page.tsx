import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { Movement } from "@/types";
import SearchAccount from "@/components/SearchAccount";
import { getBalance } from "@/server/getBalance";
import { isAuth } from "@/lib/isAuth";

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const first = data.get('first')?.valueOf()
  const second = data.get('second')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()
  
  if(typeof first !== "string" || typeof amount !== "string" || typeof second !== "string") {
    throw new Error('Invalid data type. Expected "string"')
  }
  
  try {

    const account = `2222 4545 80${first} ${second}`
    const prev = await client.db("Banco").collection("Cuenta").findOne({ numero_cuenta: account })
    
    client.db("Banco").collection("Cuenta").updateOne(
      { numero_cuenta: account},
      { $set: { fondos: (+amount + prev?.fondos) }}
    )

    const date = new Date()

    const movement:Movement = {
      numero_cuenta: account,
      tipo: "Deposito",
      cantidad: amount,
      fecha: date.toLocaleString()
    }

    client.db("Banco").collection("Movimiento").insertOne(movement)
  } catch(e) {
    console.log(e)
  }

  redirect('/')
}

export default function Page() {
  isAuth()

  return(
    <>
      <Subtitle subtitle="Deposito" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <SearchAccount getBalance={getBalance} />
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}