interface Props {
  balance: string
}

export default function Balance({ balance } : Props) {
  return (
    <div className="flex flex-col gap-2">
      <p>Fondos</p>
      <p>{ balance }</p>
    </div>
  )
}