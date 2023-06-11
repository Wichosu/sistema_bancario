import Footer from "@/components/Footer";
import Subtitle from "@/components/Subtitle";
import { coins } from "@/lib/coins";

export default function Page(){
  return(
    <>
      <Subtitle subtitle="Cambio de Divisas" />
      <form className="grid gap-8">
        <div className="flex max-w-xl justify-between">
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
            {
              coins.map((coin, key) => (
                <option key={key} value={coin.value}>{ coin.name }</option>
              ))
            }
          </select>
        </div>
        <div className="flex max-w-xl justify-between">
          <div className="grid gap-4">
            <p>Regresar</p>
            <p>$</p>
          </div>
          <select className="px-8 py-2 h-fit self-end">
            {
              coins.map((coin, key) => (
                <option key={key} value={coin.value}>{ coin.name }</option>
              ))
            }
          </select>
        </div>
        <Footer />
      </form>
    </>
  )
}