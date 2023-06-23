"use client"
import Subtitle from "@/components/Subtitle";
import Link from "next/link";
import { getMovements, getCoinExchangeMovements } from "@/server/getMovements";
import { useEffect, useState } from "react";
import { IMovement, Movement, IMovementCoinExchange, MovementCoinExchange } from "@/types";
import { RowMovement, RowMovementCoinExchange } from "./RowMovement";

const movementHeaders = Object.values(Movement)
const movementCoinExchangeHeaders = Object.values(MovementCoinExchange)

export default function ActividadClientComponent(){
  const [movements, setMovements] = useState<any>()
  const [coinExchangeMovements, setCoinExchangeMovements] = useState<any>();
  
  useEffect(() => {

    async function fetchMovements() {
      setMovements(await getMovements())
      setCoinExchangeMovements(await getCoinExchangeMovements())
    }

    fetchMovements()
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
      <div className="mt-8 w-fit max-h-96 overflow-scroll">
        <table className="table-auto border-collapse">
          <caption 
            className="border border-slate-400 bg-slate-300 uppercase text-xl text-neutral-800 
            font-medium"
          >
            movimientos
          </caption>
          <thead className="sticky top-0 bg-neutral-100">
            <tr>
              {
                movementHeaders.map((header, key) => (
                  <th key={key} className="capitalize">{ header }</th>
                  ))
                }
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
      <div className="my-8 w-full max-h-screen overflow-auto">
        <table className="table-auto border-collapse">
          <caption 
            className="border border-slate-400 bg-slate-300 uppercase text-xl text-neutral-800 
            font-medium"
          >
            movimientos cambio de divisa
          </caption>
          <thead className="sticky top-0 bg-neutral-100">
            <tr>
              {
                movementCoinExchangeHeaders.map((header, key) => (
                  <th key={key} className="capitalize">{ header }</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </>
  )
}