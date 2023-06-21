"use client"
import Footer from "./Footer"
import { useState, useRef } from "react"
import { coins } from "@/lib/coins"
import { MovementCoinExchange, CoinExchangeModes } from "@/types"
import { redirect } from "next/navigation"

interface Props {
  createMovement: (movement: MovementCoinExchange) => void
  mode: CoinExchangeModes
}

export default function CoinExchange({ createMovement, mode } : Props ) {
  const amount = useRef<HTMLInputElement>(null)
  const coin = useRef<HTMLSelectElement>(null)
  const [exchange, setExchange] = useState<number>(0)
  const isPurchase = mode === CoinExchangeModes.Purchase

  const handleExchange = () => {
    if(coin.current?.value === undefined || amount.current?.value === undefined) {
      throw new Error('A value is undefined')
    }

    //get value of coin, since coin is an array containing [value, coinName]
    const coinValue = coin.current.value.split(',')[0]

    const operation = isPurchase
    ? +amount.current?.value * +coinValue
    : +amount.current?.value / +coinValue

    setExchange(operation)
  }

  const validate = () => {
    if(coin.current?.value === undefined || amount.current?.value === undefined) {
      throw new Error('A value is undefined')
    }

    //get name of coin, since coin is an array [value, coinName]
    const coinIn = isPurchase
    ? "MXN"
    : coin.current.value.split(',')[1]

    const coinOut = isPurchase
    ? coin.current.value.split(',')[1]
    : "MXN"

    const date = new Date()
    
    const movement: MovementCoinExchange = {
      monedaEntrada: coinIn,
      cantidadEntrada: amount.current.value,
      monedaSalida: coinOut,
      cantidadSalida: exchange.toFixed(2).toString(),
      fecha: date.toLocaleString(),
    }

    createMovement(movement)

    redirect('/menu')
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
        {
          isPurchase
          ?
            <p className="px-8 py-2 h-fit self-end">Peso Mexicano</p>
          :
            <select className="px-8 py-2 h-fit self-end" ref={coin} onChange={handleExchange}>
              {
                coins.map((coin, key) => (
                  <option key={key} value={[coin.value.toString(), coin.name]}>{ coin.name }</option>
                ))
              }
            </select>
        }
      </div>
      <div className="flex max-w-xl justify-between">
        <div className="grid gap-4">
          <p>Regresar</p>
          <p>$ { exchange.toFixed(2) }</p>
        </div>
        {
          isPurchase
          ?
            <select className="px-8 py-2 h-fit self-end" ref={coin} onChange={handleExchange}>
              {
                coins.map((coin, key) => (
                  <option key={key} value={[coin.value.toString(), coin.name]}>{ coin.name }</option>
                ))
              }
            </select>
          :
            <p className="px-8 py-2 h-fit self-end">Peso Mexicano</p>
        }
      </div>
      <Footer />
    </form>
  )
}