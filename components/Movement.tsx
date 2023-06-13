interface MovementProps {
  type: string,
  amount: string,
  date: string
  account: string
}

interface MovementCoinExchangeProps {
  coinIn: string,
  coinInAmount: string,
  coinOut: string,
  coinOutAmount: string,
  date: string
}

export function Movement({ type, amount, date, account} : MovementProps) {
  return (
    <div className="flex justify-between max-w-sm border border-neutral-300 px-8 py-4 rounded
      shadow h-fit"
    >
      <div className="grid gap-4">
        <p className="capitalize">{ type }</p>
        <p>${ amount }</p>
      </div>
      <div className="grid gap-4">
        <p>{ date }</p>
        <p>{ account }</p>
      </div>
    </div>
  )
}

export function MovementCoinExchange({ coinIn, coinInAmount, coinOut, coinOutAmount, date} : MovementCoinExchangeProps) {
  return (
    <div className="max-w-sm border border-neutral-300 px-8 py-4 rounded
      shadow grid gap-2"
    >
      <div className="flex justify-between">
        <div className="grid gap-4">
          <p className="capitalize">{ coinIn }</p>
          <p>${ coinInAmount }</p>
        </div>
        <span className="text-2xl">&#8594;</span>
        <div className="grid gap-4">
          <p>{ coinOut }</p>
          <p>${ coinOutAmount }</p>
        </div>
      </div>
      <div className="text-center text-sm">
        { date }
      </div>
    </div>
  )
}
