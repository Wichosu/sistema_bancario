"use client"
import { useRef, useState } from "react"
import Input from "./Input"

interface Props {
  getBalance: (account_number: string) => Promise<any>
}

export default function SearchAccount({ getBalance } : Props) {
  const firstInput = useRef<HTMLInputElement>(null)
  const secondInput = useRef<HTMLInputElement>(null)
  const [account, setAccount] = useState<any>()

  async function handleInput() {
    const first = firstInput.current?.value
    const second = secondInput.current?.value

    if(first?.length === 2 && second?.length === 4) {
      const account_number = `2222 4545 80${first} ${second}`
      setAccount(await getBalance(account_number))
    } else {
      setAccount(() => undefined)
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
          placeholder="00"
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
          placeholder="0000"
          onChange={handleInput}
          ref={secondInput}
        />
      </div>
      <div className="flex gap-8">
        <Input label="Nombre" value={account?.nombre} disabled={true} />
        <Input label="Apellido Paterno" value={account?.apellido_paterno} disabled={true} />
        <Input label="Apellido Materno" value={account?.apellido_materno} disabled={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Fondos</p>
        <p>${ account?.fondos }</p>
      </div>
    </div>
  )
}