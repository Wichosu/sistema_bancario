"use client"
import Footer from "./Footer"
import { fetchWindow, fetchEmploye, updateWindow } from "@/server/assignEmploye"
import { redirect } from "next/navigation"
import { useEffect, useState, useRef, useTransition } from "react"

export default function AssignEmploye() {
  const [windows, setWindows] = useState<any>()
  const [employes, setEmployes] = useState<any[]>()
  const [employe, setEmploye] = useState<any>()
  const code = useRef<HTMLSelectElement>(null)
  const window = useRef<HTMLSelectElement>(null)
  let [isPending, startTransition] = useTransition()

  function getEmploye() {
    const findEmploye = employes?.find((employe) => employe.clave === code.current?.value)

    setEmploye(() => findEmploye)
  }

  function handleForm() {
    if(window.current?.value && employe?.clave){
      updateWindow(window.current.value, employe.clave)
      redirect('../menu-admin')
    }
  }

  useEffect(() => {
    async function fetch() {
      setWindows(await fetchWindow())
      setEmployes(await fetchEmploye())
    }

    fetch()
      .then()
      .catch(console.error)

  }, [])

  return (
    <form action={() => startTransition(() => handleForm())} className="flex flex-col gap-8 mb-8">
      <div className="flex gap-16">
        <label>Ventanilla</label>
        <select className="w-fit px-4" ref={window}>
          {
            windows?.map((window: any, key: any) => (
              <option key={key}>{ window.numero }</option>
            ))
          }
        </select>
        <label>Empleado</label>
        <select className="w-fit px-4" ref={code} onChange={getEmploye}>
          <option>Empleado</option>
          {
            employes?.map((employe: any, key: any) => (
              <option key={key} value={employe.clave}>{ employe.nombre }</option>
            ))
          }
        </select>
      </div>
      <div className="grid gap-4">
        <label htmlFor="name">Nombre</label>
        <input 
          id="name" 
          name="name" 
          className="border border-neutral-500 bg-neutral-300 w-fit rounded-sm"
          value={employe?.nombre || ''}
          disabled
        />
        <label htmlFor="firstSurname">Apellido Paterno</label>
        <input 
          id="firstSurname"
          name="firstSurname"
          className="border border-neutral-500 bg-neutral-300 w-fit rounded-sm"
          value={employe?.apellido_paterno || ''}
          disabled
        />
        <label htmlFor="secondSurname">Apellido Materno</label>
        <input 
          id="secondSurname"
          name="secondSurname"
          className="border border-neutral-500 bg-neutral-300 w-fit rounded-sm"
          value={employe?.apellido_materno || ''}
          disabled
        />
        <label htmlFor="code">Clave</label>
        <input 
          id="code"
          name="code"
          className="border border-neutral-500 bg-neutral-300 w-fit rounded-sm"
          value={employe?.clave || ''}
          disabled
        />
      </div>
      <Footer admin={true} />
    </form>
  )
}