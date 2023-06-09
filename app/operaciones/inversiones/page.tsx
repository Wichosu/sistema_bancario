import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Footer from "@/components/Footer"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Operation, DB, Collections, AccountStates } from "@/types"
import SearchAccount from "@/components/SearchAccount"
import { getBalance } from "@/server/getBalance"
import { isAuth } from "@/lib/isAuth"
import { createMovement } from "@/lib/Movements"

async function handleForm(data : FormData) {
  "use server"
  const client = await clientPromise
  const first = data.get('first')?.valueOf()
  const second = data.get('second')?.valueOf()
  const amount = data.get('cantidad')?.valueOf()

  if(typeof first !== "string" || typeof amount !== "string" || typeof second !== "string") {
    throw new Error('Invalid data type. Expected "string"')
  }

  try{
    const account = `2222 4545 80${first} ${second}`
    const prev = await client.db(DB.Banco).collection(Collections.Cuenta).findOne({ numero_cuenta: account })

    if(prev?.estado === AccountStates.Active) {
      client.db(DB.Banco).collection(Collections.Cuenta).updateOne(
        { numero_cuenta: account },
        { $set: { inversiones: (prev?.inversiones + +amount).toFixed(2) }}
      )

      createMovement(client, account, Operation.Inversiones, amount)
    }
  } catch(e) {
    console.log(e)
  }

  redirect('/menu')
}

export default function Page(){
  isAuth()

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
