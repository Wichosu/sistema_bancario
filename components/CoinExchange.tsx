"use client"
import Footer from "./Footer"
import { useState, useRef } from "react"
import { coins } from "@/lib/coins"
import { MovementCoinExchange } from "@/types"
import { redirect } from "next/navigation"

interface Props {
  createMovement: (movement: MovementCoinExchange) => void
}

export default function CoinExchange({ createMovement } : Props ) {
  const amount = useRef<HTMLInputElement>(null)
  const coinIn = useRef<HTMLSelectElement>(null)
  const [exchange, setExchange] = useState<number>(0)

  const handleExchange = () => {
    if(coinIn.current?.value === undefined || amount.current?.value === undefined) {
      throw new Error('A value is undefined')
    }

    const coinValue = coinIn.current.value.split(',')[0]

    setExchange(+amount.current?.value / +coinValue)
  }

  const validate = () => {
    if(coinIn.current?.value === undefined || amount.current?.value === undefined) {
      throw new Error('A value is undefined')
    }

    const coinName = coinIn.current.value.split(',')[1]
    
    const movement: MovementCoinExchange = {
      monedaEntrada: coinName,
      cantidadEntrada: amount.current.value,
      monedaSalida: "MXN",
      cantidadSalida: exchange.toFixed(2).toString(),
    }

    createMovement(movement)

    redirect('/')
  }

  return (
    <form 
      action={validate} 
      method="POST" 
      className="grid gap-8"
    >
      <div className="flex max-w-xl justify-between">
        <div className="grid gap-4">
          <label htmlFor="divisa">Divisa recibida</label>
          <input 
            id="divisa"
            name="divisa"
            type="number" 
            className="border border-neutral-500 rounded-sm invalid:border-red-500 
              focus:border-blue-500 focus:outline-none focus:invalid:border-red-500" 
            ref={amount}
            onChange={handleExchange}
            pattern="\d"
          />
        </div>
        <select className="px-8 py-2 h-fit self-end" ref={coinIn} onChange={handleExchange}>
          {
            coins.map((coin, key) => (
              <option key={key} value={[coin.value.toString(), coin.name]}>{ coin.name }</option>
            ))
          }
        </select>
      </div>
      <div className="flex max-w-xl justify-between">
        <div className="grid gap-4">
          <p>Regresar</p>
          <p>$ { exchange.toFixed(2) }</p>
        </div>
        <select className="px-8 py-2 h-fit self-end">
          <option>Peso Mexicano</option>
        </select>
      </div>
      <Footer />
    </form>
  )
}