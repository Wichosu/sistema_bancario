import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Balance from "@/components/Balance"
import Footer from "@/components/Footer"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Movement } from "@/types"

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const account = data.get('num_cuenta')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()

  if(typeof account !== "string" || typeof amount !== "string") {
    throw new Error("Invalid type")
  }

  try{

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

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Inversiones" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <Input label="Num. Cuenta" name="num_cuenta" />
        <div className="flex gap-8">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido Materno" name="apellido_materno" />
          <Input label="Apellido Paterno" name="apellido_paterno" />
        </div>
        <div className="flex gap-8">
          <Input label="Cantidad" name="cantidad" type="number" />
          <Balance balance={0} />
        </div>
        <Footer />
      </form>
    </>
  )
}