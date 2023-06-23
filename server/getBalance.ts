import clientPromise from "@/lib/mongodb"
import { DB, Collections } from "@/types"

export async function getBalance(account_number:string) {
  "use server"
  try {
    const client = await clientPromise
    const account = await client.db(DB.Banco).collection(Collections.Cuenta).findOne(
      { numero_cuenta: account_number},
      {projection:{ _id: 0}}
    )
    return account
  } catch(e) {
    console.log(e)
    return '0'
  }
}