import { Operation } from '@/types'
import OperationCard from '@/components/OperationCard'
import { isAuth } from '@/lib/isAuth'

const operations = Object.values(Operation)

export default async function Home() {
  isAuth()

  return (
    <div className='grid grid-cols-4 gap-8'>
      {
        operations.map((operation, key) => (
          <OperationCard key={key} operation={operation} />
        ))
      }
    </div>
  )
}
