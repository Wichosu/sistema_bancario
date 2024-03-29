import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { Account, Collections, Operation, DB, AccountStates } from "@/types";
import { randomAccountNumber, randomNip } from "@/lib/randomAccount";
import { isAuth } from "@/lib/isAuth";
import { createMovement } from "@/lib/Movements";

async function createAcount(data: FormData) {
  "use server"

  //get form data
  const amount = data.get('cantidad')?.valueOf()
  const name = data.get('nombre')?.valueOf()
  const first_surname = data.get('apellido_p')?.valueOf()
  const second_surname = data.get('apellido_m')?.valueOf()

  //validate
  if(typeof amount !== "string" || typeof name !== "string" || typeof first_surname !== "string" || typeof second_surname !== "string"){
    throw new Error("Failed to validate")
  }

  try{
    const date = new Date()
    const account_number = randomAccountNumber()

    //object account
    const newAccount : Account = {
      numero_cuenta: account_number,
      fondos: +amount,
      inversiones: 0,
      nombre: name,
      apellido_paterno: first_surname,
      apellido_materno: second_surname,
      fecha_apertura: date.toLocaleString(),
      estado: AccountStates.Active,
      nip: randomNip()
    }

    const client = await clientPromise

    client.db(DB.Banco).collection(Collections.Cuenta).insertOne(newAccount)

    createMovement(client, account_number, Operation.Alta, amount)
  } catch(e) {
    console.error(e)
  }

  redirect("/menu")
}

export default function Page() {
  isAuth()

  return (
    <>
      <Subtitle subtitle="Alta de Cuenta" />
      <form action={createAcount} method="post" className="grid gap-8">
        <div className="flex gap-8">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido Paterno" name="apellido_p" />
          <Input label="Apellido Materno" name="apellido_m" />
        </div>
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}
