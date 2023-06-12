import Subtitle from "@/components/Subtitle";
import clientPromise from "@/lib/mongodb";
import { MovementCoinExchange } from "@/types";
import CoinExchange from "@/components/CoinExchange";

async function createMovement(movement: MovementCoinExchange) {
  "use server"
  try {
    const client = await clientPromise
    client.db("Banco").collection("Movimiento_Divisa").insertOne(movement)
  } catch(e) {
    console.log(e)
  }
}

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <CoinExchange createMovement={createMovement} />
    </>
  )
}