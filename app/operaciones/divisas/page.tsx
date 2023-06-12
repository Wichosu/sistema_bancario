"use client"
import Footer from "@/components/Footer";
import Subtitle from "@/components/Subtitle";
import { coins } from "@/lib/coins";
import { useRef, useState } from "react";

export default function Page(){
  const amount = useRef<HTMLInputElement>(null)
  const coinIn = useRef<HTMLSelectElement>(null)
  const [exchange, setExchange] = useState<number>(0)

  const handleExchange = () => {
    if(coinIn.current?.value === undefined || amount.current?.value === undefined) {
      throw new Error('A value is undefined')
    }

    setExchange(+amount.current?.value / +coinIn.current?.value)
  }

  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <form className="grid gap-8">
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
                <option key={key} value={coin.value}>{ coin.name }</option>
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
    </>
  )
}