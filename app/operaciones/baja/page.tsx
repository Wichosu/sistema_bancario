import Subtitle from "@/components/Subtitle"
import SearchAccount from "@/components/SearchAccount"
import Footer from "@/components/Footer"
import { getBalance } from "@/server/getBalance"
import clientPromise from "@/lib/mongodb"
import { redirect } from "next/navigation"
import { Operation, DB, Collections, AccountStates } from "@/types"
import { isAuth } from "@/lib/isAuth"
import { createMovement } from "@/lib/Movements"

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
      .db(DB.Banco)
      .collection(Collections.Cuenta)
      .findOne({ numero_cuenta: account_number})
      //Make an enum for the states, check alta page as weljl
    client.db(DB.Banco).collection(Collections.Cuenta).updateOne(
      { numero_cuenta: account_number},
      { $set: { estado: AccountStates.Close }}
    )

    createMovement(client, account_number, Operation.Baja, account?.fondos)
  } catch(e) {
    console.log(e)
  }

  redirect("/menu")
}

export default function Page() {
  isAuth()

  return (
    <>
      <Subtitle subtitle="Baja de Cuenta" />
      <form action={dropAccount} method="post" className="grid gap-8">
        <SearchAccount getBalance={getBalance} />
        <Footer />
      </form>
    </>
  )
}
