import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const account = data.get('num_cuenta')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()
  
  if(typeof account !== "string" || typeof amount !== "string") {
    throw new Error("Wrong type")
  }
  
  const prev = await client.db("Banco").collection("Cuenta").findOne({ numero_cuenta: account })

  client.db("Banco").collection("Cuenta").updateOne(
    { numero_cuenta: account},
    { $set: { fondos: (+amount + prev?.fondos) }}
  )

  redirect('/')
}

export default function Page() {
  return(
    <>
      <Subtitle subtitle="Deposito" />
      <form action={handleForm} method="POST" className="flex flex-col gap-8">
        <Input label="Num. Cuenta" name="num_cuenta" />
        <div className="flex gap-8">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido Materno" name="apellido_materno" />
          <Input label="Apellido Paterno" name="apellido_paterno" />
        </div>
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}