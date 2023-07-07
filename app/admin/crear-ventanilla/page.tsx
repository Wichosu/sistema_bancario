import Subtitle from "@/components/Subtitle";
import { isAuth } from "@/lib/isAuth";
import CreateWindow from "@/components/CreateWindow";

export default function Page() {
  isAuth()

  return (
    <>
      <Subtitle subtitle="Crear Ventanilla" />
      <CreateWindow />
    </>
  )
}