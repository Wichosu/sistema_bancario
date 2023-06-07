import Movement from "@/components/Movement";
import Subtitle from "@/components/Subtitle";
import Link from "next/link";

const movements = [
  {
    type: 'deposito',
    amount: '200',
    date: '2020/02/02'
  }
]

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Actividad" />
      {
        movements.map((movement, key) => (
          <Movement
            key={key}
            type={movement.type}
            amount={movement.amount}
            date={movement.date}
          />
        ))
      }
      <div className="mt-8">
        <Link 
          href={'/'} 
          className="bg-neutral-300 px-8 py-2 rounded"
        >
          Regresar
        </Link>
      </div>
    </>
  )
}