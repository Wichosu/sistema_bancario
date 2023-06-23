import { Movement, DB, Collections} from "@/types";
import { getWindowNumber } from "./getWindowNumber";
import { MongoClient } from "mongodb";

export function createMovement(
  client: MongoClient,
  account_number: string,
  type: string,
  amount: string
): void {
  const date = new Date()

  const movement:Movement = {
    numero_cuenta: account_number,
    tipo: type,
    cantidad: amount,
    fecha: date.toLocaleString(),
    ventanilla: getWindowNumber()
  } 

  client.db(DB.Banco).collection(Collections.Movimiento).insertOne(movement)
}