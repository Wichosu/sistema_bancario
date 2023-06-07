import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Subtitle from "@/components/Subtitle";

export default function Page() {
  return(
    <>
      <Subtitle subtitle="Deposito" />
      <Input label="Num. Cuenta" name="num_cuenta" />
      <Input label="Nombre" name="nombre" />
      <Input label="Apellido Paterno" name="apellido_paterno" />
      <Input label="Apellido Materno" name="apellido_materno" />
      <Input label="Cantidad" name="cantidad" />
      <Footer />
    </>
  )
}