import OperationCard from "@/components/OperationCard"
import { Operation } from "@/types"

const operations : Operation[] = [
  'compra',
  'venta'
]

export default async function Home() {
  return (
    <div className='grid grid-cols-4 gap-8'>
      {
        operations.map((operation, key) => (
          <OperationCard key={key} operation={operation} route={`operaciones/divisas/${operation}`} />
        ))
      }
    </div>
  )
}
