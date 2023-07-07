import { IMovementCoinExchange } from "@/types"
import clientPromise from "@/lib/mongodb"
import { getEmployeCode } from "@/lib/getEmployeCode"
import { DB, Collections } from "@/types"

export async function createMovement(movement: IMovementCoinExchange) {
  "use server"
  try {
    const client = await clientPromise

    const movement_w_window: IMovementCoinExchange = {
      ...movement,
      ventanilla: getEmployeCode()
    }

    client.db(DB.Banco).collection(Collections.Movimiento_Divisa).insertOne(movement_w_window)
  } catch(e) {
    console.log(e)
  }
}