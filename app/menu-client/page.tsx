import clientPromise from "@/lib/mongodb"
import { cookies } from "next/headers"
import { DB, Collections, Account } from "@/types"
import Investment from "./components/Investment"

export default async function Page() {
  const client = await clientPromise
  const account_number = cookies().get('auth')

  const fetch = await client.db(DB.Banco).collection(Collections.Cuenta).findOne({ numero_cuenta: account_number?.value }) 

  const account: Account = {
    numero_cuenta: fetch?.numero_cuenta,
    fondos: fetch?.fondos,
    inversiones: fetch?.inversiones,
    nombre: fetch?.nombre,
    apellido_paterno: fetch?.apellido_paterno,
    apellido_materno: fetch?.apellido_materno,
    fecha_apertura: fetch?.fecha_apertura,
    fecha_clausura: fetch?.fecha_clausura,
    estado: fetch?.estado,
    nip: fetch?.nip
  }

  return (
    <>
      <section className="border-2 rounded w-fit mx-auto my-0 py-4 px-8 grid gap-2">
        <p>{`${account.nombre} ${account.apellido_paterno} ${account.apellido_materno}`}</p>
        <p className="font-medium">Fondos:</p>
        <p className="font-bold text-xl">${ account.fondos }</p>
      </section>
      <Investment investment={account.inversiones} />
    </>
  )
}