"use client"
import Subtitle from "@/components/Subtitle";
import Link from "next/link";
import { getMovements, getCoinExchangeMovements } from "@/server/getMovements";
import { useEffect, useState } from "react";
import { IMovement, Movement, IMovementCoinExchange, MovementCoinExchange } from "@/types";
import { RowMovement, RowMovementCoinExchange } from "./RowMovement";
import { MagnifyingGlass } from "react-loader-spinner";
import Table from "./Table";

const movementHeaders = Object.values(Movement)
const movementCoinExchangeHeaders = Object.values(MovementCoinExchange)

export default function ActividadClientComponent(){
  const [movements, setMovements] = useState<any>()
  const [coinExchangeMovements, setCoinExchangeMovements] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {

    async function fetchMovements() {
      setMovements(await getMovements())
      setCoinExchangeMovements(await getCoinExchangeMovements())
    }

    fetchMovements()
      .then(() => setLoading(() => false))
      .catch(console.error);

  }, [])

  return(
    <>
      <Subtitle subtitle="Actividad" />
      <Link 
        href={'/menu'} 
        className="bg-neutral-300 px-8 py-2 rounded capitalize"
      >
        regresar
      </Link>
      {
        loading
        ?
          <div className="w-fit mx-auto mt-8">
            <MagnifyingGlass />
          </div>
        :
          <Table
          caption={"Movimientos"}
          headers={movementHeaders}
          >
            {
              movements?.map((movement: IMovement, key: number) => (
                <RowMovement
                  key={key}
                  tipo={movement?.tipo}
                  cantidad={movement?.cantidad}
                  fecha={movement?.fecha}
                  numero_cuenta={movement?.numero_cuenta}
                  ventanilla={movement?.ventanilla}
                />
              ))
            }
          </Table>
      }
      {
        loading
        ?
          <div className="w-fit mx-auto mt-8">
            <MagnifyingGlass />
          </div>
        :
          <Table
            caption="movimientos cambio de divisa"
            headers={movementCoinExchangeHeaders}
          >
            {
              coinExchangeMovements?.map((movement: IMovementCoinExchange, key: number) => (
                <RowMovementCoinExchange
                  key={key}
                  monedaEntrada={movement.monedaEntrada}
                  cantidadEntrada={movement.cantidadEntrada} 
                  monedaSalida={movement.monedaSalida}
                  cantidadSalida={movement.cantidadSalida}
                  fecha={movement.fecha}
                  ventanilla={movement.ventanilla}
                />
              ))
            }
          </Table>
      }
    </>
  )
}