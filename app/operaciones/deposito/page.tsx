import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { Movement } from "@/types";

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const account = data.get('num_cuenta')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()
  
  if(typeof account !== "string" || typeof amount !== "string") {
    throw new Error("Wrong type")
  }
  
  try {
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
  return(
    <>
      <Subtitle subtitle="Deposito" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <Input label="Num. Cuenta" name="num_cuenta" />
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}