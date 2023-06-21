import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import { Operation } from '@/types'
import OperationCard from '@/components/OperationCard'

async function getDB() {
  try{
    const client = await clientPromise
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const operations : Operation[] = [
  'deposito',
  'retiro',
  'divisas',
  'inversiones',
  'actividad',
  'alta',
  'baja'
]

export default async function Home() {
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
