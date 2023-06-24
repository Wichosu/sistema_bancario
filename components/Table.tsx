import { Movement, MovementCoinExchange } from "@/types";
import { ReactNode } from "react";

interface Props {
  caption: string,
  headers: Array<Movement | MovementCoinExchange>,
  children: ReactNode
}

export default function Table({ caption, headers, children }: Props) {
  return (
    <div className="mt-8 w-fit max-h-96 overflow-scroll">
      <table className="table-auto border-collapse">
        <caption 
          className="border border-slate-400 bg-slate-300 uppercase text-xl text-neutral-800 
          font-medium"
        >
          { caption }
        </caption>
        <thead className="sticky top-0 bg-neutral-100">
          <tr>
            {
              headers.map((header: any, key: number) => (
                <th key={key} className="capitalize">{ header }</th>
                ))
              }
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </table>
    </div>
  )
}