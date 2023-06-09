import OperationCard from "@/components/OperationCard"
import { isAuth } from "@/lib/isAuth"
import { AdminOperation } from "@/types"

export default function Page() {
  isAuth()

  return (
    <>
      <div className='grid grid-cols-4 gap-8'>
        <OperationCard operation={AdminOperation.RegistrarEmpleado} route="/admin/registrar-empleado" />
        <OperationCard operation={AdminOperation.AsignarEmpleado} route="/admin/asignar-empleado" />
        <OperationCard operation={AdminOperation.Salir} route="/" />
      </div>
    </>
  )
}