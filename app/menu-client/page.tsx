import clientPromise from "@/lib/mongodb"
import { cookies } from "next/headers"
import { DB, Collections, Account } from "@/types"
import Link from "next/link"
import { SendToMobile } from "@mui/icons-material"

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
    <main>
      <section className="border-2 rounded w-fit mx-auto my-0 py-4 px-8 grid gap-2">
        <p>{`${account.nombre} ${account.apellido_paterno} ${account.apellido_materno}`}</p>
        <p className="font-medium">Fondos:</p>
        <p className="font-bold text-xl">${ account.fondos }</p>
      </section>
      <section className="w-fit mx-auto my-0 py-4 px-8 flex gap-2">
        <Link href={'/'} className="border-2 rounded px-8 py-4">
          <SendToMobile />
          Transferir a otra cuenta
        </Link>
        <div className="border-2 rounded px-8 py-4">
          <p>
            Proximamente más...
          </p>
        </div>
      </section>
    </main>
  )
}