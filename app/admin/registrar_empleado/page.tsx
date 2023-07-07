import Subtitle from "@/components/Subtitle"
import RegisterEmploye from "@/components/RegisterEmploye"
import { isAuth } from "@/lib/isAuth"

export default function Page() {
  isAuth()

  return (
    <>
      <Subtitle subtitle="Registrar Empleado" />
      <RegisterEmploye />
    </>
  )
}