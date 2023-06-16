import { Movement, MovementCoinExchange } from "@/components/Movement";
import Subtitle from "@/components/Subtitle";
import Link from "next/link";
import { 
  MovementCoinExchange as MovementCoinExchangeType,
  Movement as MovementType 
} from "@/types";
import { getMovements, getCoinExchangeMovements } from "@/server/getMovements";

export default async function Page(){
  const movements:any = await getMovements()
  const coinExchangeMovements:any = await getCoinExchangeMovements()

  return(
    <>
      <Subtitle subtitle="Actividad" />
      <div className="mb-8">
        <Link 
          href={'/'} 
          className="bg-neutral-300 px-8 py-2 rounded"
        >
          Regresar
        </Link>
      </div>
      <Movement type="Tipo de operacion" account="Numero de cuenta" amount="Cantidad" date="Fecha" />
      <div className="flex mt-8 mb-14">
        <div className="grow flex flex-col gap-4">
          <h3 className="mb-4 ">Movimiento de cuentas</h3>
          {
            movements?.map((movement:MovementType, key:any) => (
              <Movement
                key={key}
                type={movement.tipo}
                amount={movement.cantidad}
                date={movement.fecha}
                account={movement.numero_cuenta}
              />
            ))
          }
        </div>
        <div className="grow flex flex-col gap-4">
          <h3 className="mb-4">Movimiento de divisas</h3>
          {
            coinExchangeMovements?.map((movement:MovementCoinExchangeType, key:any) => (
              <MovementCoinExchange
                key={key}
                coinIn={movement.monedaEntrada}
                coinInAmount={movement.cantidadEntrada}
                coinOut={movement.monedaSalida}
                coinOutAmount={movement.cantidadSalida}
                date={movement.fecha}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}