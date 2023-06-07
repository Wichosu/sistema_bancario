import { Operation } from "@/types"

interface Props {
  operation: Operation
}

export default function OperationCard({ operation } : Props) {
  return (
    <div className="px-4 py-12 rounded bg-neutral-200 text-neutral-800 text-center uppercase
      cursor-pointer shadow-sm"
    >
      { operation }
    </div>
  )
}