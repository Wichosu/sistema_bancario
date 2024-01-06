import OperationCard from "@/components/OperationCard"
import { isAuth } from "@/lib/isAuth"
import { CoinExchangeOperations } from "@/types"

const operations = Object.values(CoinExchangeOperations)

export default async function Home() {
  isAuth()

  return (
    <div className='grid grid-cols-4 gap-8'>
      {
        operations.map((operation, key) => (
          <OperationCard 
            key={key} 
            operation={operation} 
            route={`/operaciones/divisas/${operation}`} 
          />
        ))
      }
    </div>
  )
}
