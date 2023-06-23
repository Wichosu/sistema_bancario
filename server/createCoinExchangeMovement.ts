import { IMovementCoinExchange } from "@/types"
import clientPromise from "@/lib/mongodb"
import { getWindowNumber } from "@/lib/getWindowNumber"
import { DB, Collections } from "@/types"

export async function createMovement(movement: IMovementCoinExchange) {
  "use server"
  try {
    const client = await clientPromise

    const movement_w_window: IMovementCoinExchange = {
      ...movement,
      ventanilla: getWindowNumber()
    }

    client.db(DB.Banco).collection(Collections.Movimiento_Divisa).insertOne(movement_w_window)
  } catch(e) {
    console.log(e)
  }
}