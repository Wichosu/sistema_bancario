import OperationCard from "@/components/OperationCard"
import { isAuth } from "@/lib/isAuth"
import { AdminOperation } from "@/types"

const operations = Object.values(AdminOperation)

export default function Page() {
  isAuth()
  return (
    <>
      <div className='grid grid-cols-4 gap-8'>
        {
          operations.map((operation, key) => (
            <OperationCard key={key} operation={operation} route="/admin/registrar_empleado" />
          ))
        }
      </div>
    </>
  )
}