import Link from "next/link"

export default function Footer() {
  return (
    <div className="flex justify-between mt-4">
      <Link href={'/menu'} className="px-4 py-2 bg-red-300 rounded">Cancelar</Link>
      <button className="px-4 py-2 bg-green-300 rounded">Realizar</button>
    </div>
  )
}