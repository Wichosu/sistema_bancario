import ActividadClientComponent from "@/components/ActividadClientComponent";
import { isAuth } from "@/lib/isAuth";

export default function Page(){
  isAuth()

  return(
    <ActividadClientComponent />
  )
}