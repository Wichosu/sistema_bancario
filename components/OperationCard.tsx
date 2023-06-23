import { CoinExchangeOperations, Operation } from "@/types"
import Link from "next/link"

interface Props {
  operation: Operation | CoinExchangeOperations
  route?: string
}

export default function OperationCard({ operation, route } : Props) {
  const href_route = route
  ? route
  : `/operaciones/${operation}`

  return (
    <Link 
      href={href_route}
      className="px-4 py-12 rounded bg-neutral-200 text-neutral-800 text-center uppercase
      cursor-pointer shadow-sm"
    >
      { operation }
    </Link>
  )
}