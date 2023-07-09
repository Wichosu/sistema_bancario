import Subtitle from "@/components/Subtitle";
import AssignEmploye from "@/components/AssignEmploye";
import { isAuth } from "@/lib/isAuth";

export default function Page() {
  isAuth()

  return (
    <>
      <Subtitle subtitle="Asignar Empleado" />
      <AssignEmploye />
    </>
  )
}