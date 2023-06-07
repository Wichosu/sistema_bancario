import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";

export default function Page() {
  return(
    <>
      <Subtitle subtitle="Deposito" />
      <form className="flex flex-col gap-8">
        <Input label="Num. Cuenta" name="num_cuenta" />
        <div className="flex gap-8">
          <Input label="Nombre" name="nombre" />
          <Input label="Apellido Materno" name="apellido_materno" />
          <Input label="Apellido Paterno" name="apellido_paterno" />
        </div>
        <Input label="Cantidad" name="cantidad" type="number" />
        <Footer />
      </form>
    </>
  )
}