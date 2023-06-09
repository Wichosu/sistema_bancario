interface Props {
  type: string,
  amount: string,
  date: string
}

export default function Movement({ type, amount, date} : Props) {
  return (
    <div className="flex justify-between max-w-sm border border-neutral-300 px-8 py-4 rounded
      shadow">
      <div className="grid gap-4">
        <p className="capitalize">{ type }</p>
        <p>${ amount }</p>
      </div>
      <p>{ date }</p>
    </div>
  )
}