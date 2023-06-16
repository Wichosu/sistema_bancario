import clientPromise from "@/lib/mongodb"

export async function getBalance(account_number:string) {
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