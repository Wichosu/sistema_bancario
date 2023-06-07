import Subtitle from "@/components/Subtitle"
import Input from "@/components/Input"
import Footer from "@/components/Footer"
import Balance from "@/components/Balance"

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Retiro" />
      <form className="flex flex-col gap-8">
        <Input label="Num. Cuenta" name="num_cuenta" />
        <div className="flex gap-8">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido Materno" name="apellido_materno" />
          <Input label="Apellido Paterno" name="apellido_paterno" />
        </div>
        <div className="flex gap-8">
          <Input label="Cantidad" name="cantidad" type="number" />
          <Balance balance={0} />
        </div>
        <Footer />
      </form>
    </>
  )
}