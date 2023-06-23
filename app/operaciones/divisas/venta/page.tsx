import Subtitle from "@/components/Subtitle";
import { CoinExchangeModes } from "@/types";
import CoinExchange from "@/components/CoinExchange";
import { isAuth } from "@/lib/isAuth";
import { createMovement } from "@/server/createCoinExchangeMovement";

export default function Page(){
  isAuth()

  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <CoinExchange createMovement={createMovement} mode={CoinExchangeModes.Sell} />
    </>
  )
}