import { MovementCoinExchange } from "@/types"
import clientPromise from "@/lib/mongodb"
import { getWindowNumber } from "@/lib/getWindowNumber"
import { DB, Collections } from "@/types"

export async function createMovement(movement: MovementCoinExchange) {
  "use server"
  try {
    const client = await clientPromise

    const movement_w_window: MovementCoinExchange = {
      ...movement,
      ventanilla: getWindowNumber()
    }

    client.db(DB.Banco).collection(Collections.Movimiento_Divisa).insertOne(movement_w_window)
  } catch(e) {
    console.log(e)
  }
}