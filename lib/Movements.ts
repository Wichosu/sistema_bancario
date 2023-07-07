import { IMovement, DB, Collections} from "@/types";
import { getEmployeCode } from "./getEmployeCode";
import { MongoClient } from "mongodb";

export function createMovement(
  client: MongoClient,
  account_number: string,
  type: string,
  amount: string
): void {
  const date = new Date()

  const movement:IMovement = {
    numero_cuenta: account_number,
    tipo: type,
    cantidad: amount,
    fecha: date.toLocaleString(),
    ventanilla: getEmployeCode()
  } 

  client.db(DB.Banco).collection(Collections.Movimiento).insertOne(movement)
}