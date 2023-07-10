import Link from "next/link"

interface Props {
  admin?: boolean
}

export default function Footer({ admin }: Props) {
  const route = admin
    ? '/menu-admin'
    : '/menu'

  return (
    <div className="flex justify-between mt-4">
      <Link href={route} className="px-4 py-2 bg-red-300 rounded hover:bg-red-400">Cancelar</Link>
      <button className="px-4 py-2 bg-green-300 rounded hover:bg-green-400">Realizar</button>
    </div>
  )
}