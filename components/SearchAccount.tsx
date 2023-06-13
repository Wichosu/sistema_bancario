"use client"
import { useRef, useState } from "react"

interface Props {
  getBalance: (account_number: string) => Promise<any>
}

export default function SearchAccount({ getBalance } : Props) {
  const firstInput = useRef<HTMLInputElement>(null)
  const secondInput = useRef<HTMLInputElement>(null)
  const [balance, setBalance] = useState<Promise<any>>()

  function handleInput() {
    const first = firstInput.current?.value
    const second = secondInput.current?.value

    if(first === undefined || second === undefined){
      throw new Error("account is undefined")
    }

    if(first.length === 2 && second.length === 4) {
      const account = `2222 4545 80${first} ${second}`
      setBalance(getBalance(account))
    } else {
      setBalance(() => undefined)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label>Numero de cuenta</label>
      <div className="flex">
        <span>2222-4545-80</span>
        <input
          name="first"
          size={1}
          maxLength={2}
          pattern="\d{2}"
          className="border border-neutral-500 rounded focus:outline-none focus:border-blue-500
          focus:invalid:border-red-500 invalid:border-red-500"
          onChange={handleInput}
          ref={firstInput}
        />
        <span>-</span>
        <input
          name="second"
          size={1}
          maxLength={4}
          pattern="\d{4}"
          className="border border-neutral-500 rounded focus:outline-none focus:border-blue-500
          focus:invalid:border-red-500 invalid:border-red-500"
          onChange={handleInput}
          ref={secondInput}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>Fondos</p>
        <p>${ balance }</p>
      </div>
    </div>
  )
}