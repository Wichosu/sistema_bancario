import Subtitle from "@/components/Subtitle";
import clientPromise from "@/lib/mongodb";
import { MovementCoinExchange, CoinExchangeModes } from "@/types";
import CoinExchange from "@/components/CoinExchange";
import { isAuth } from "@/lib/isAuth";
import { getWindowNumber } from "@/lib/getWindowNumber";

async function createMovement(movement: MovementCoinExchange) {
  "use server"
  try {
    const client = await clientPromise

    const movement_w_window: MovementCoinExchange = {
      ...movement,
      ventanilla: getWindowNumber()
    }

    client.db("Banco").collection("Movimiento_Divisa").insertOne(movement_w_window)
  } catch(e) {
    console.log(e)
  }
}

export default function Page(){
  isAuth()

  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <CoinExchange createMovement={createMovement} mode={CoinExchangeModes.Purchase} />
    </>
  )
}