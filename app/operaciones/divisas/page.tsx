import Footer from "@/components/Footer";
import Subtitle from "@/components/Subtitle";

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <form className="grid gap-8">
        <div className="flex max-w-md justify-between">
          <div className="grid gap-4">
            <label htmlFor="divisa">Divisa a comprar</label>
            <input 
              id="divisa"
              name="divisa"
              type="number" 
              className="border border-neutral-500 rounded-sm" 
            />
          </div>
          <select className="px-8 py-2 h-fit self-end">
            <option>Divisa</option>
          </select>
        </div>
        <div className="flex max-w-md justify-between">
          <div className="grid gap-4">
            <p>Regresar</p>
            <p>$</p>
          </div>
          <select className="px-8 py-2 h-fit self-end">
            <option>Divisa</option>
          </select>
        </div>
        <Footer />
      </form>
    </>
  )
}