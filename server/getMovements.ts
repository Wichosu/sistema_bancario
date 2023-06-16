import clientPromise from "@/lib/mongodb"

export async function getMovements() {
  try {
    const client = await clientPromise
    const movements = client.db("Banco").collection("Movimiento").find()
    return await movements.toArray()
  } catch(e) {
    console.log(e)
  }
}

export async function getCoinExchangeMovements() {
  try {
    const client = await clientPromise
    const movements = client.db("Banco").collection("Movimiento_Divisa").find()
    return await movements.toArray()
  } catch(e) {
    console.log(e)
  }
}