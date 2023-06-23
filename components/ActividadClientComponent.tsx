"use client"
import Subtitle from "@/components/Subtitle";
import Link from "next/link";
import { getMovements, getCoinExchangeMovements } from "@/server/getMovements";
import { useEffect, useState } from "react";
import { IMovement, Movement } from "@/types";
import RowMovement from "./RowMovement";

const movementHeaders = Object.values(Movement)

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
        className="bg-neutral-300 px-8 py-2 rounded"
      >
        Regresar
      </Link>
      <table className="table-auto border-collapse mt-8">
        <caption 
          className="border border-slate-400 bg-slate-300 uppercase text-xl text-neutral-800 
          font-medium"
        >
          Movimientos
        </caption>
        <tr>
          {
            movementHeaders.map((header, key) => (
              <th key={key} className="capitalize">{ header }</th>
            ))
          }
        </tr>
        {
          movements.map((movement: IMovement, key: number) => (
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
      </table>
    </>
  )
}