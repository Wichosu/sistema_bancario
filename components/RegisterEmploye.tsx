"use client";
import { useRef, useState, useTransition, experimental_useOptimistic as useOptimistic } from "react";
import { Roles } from "@/types";
import { IEmploye, IAccess } from "@/types";
import { createEmploye } from "@/server/createEmploye";
import { redirect } from "next/navigation";

export default function RegisterEmploye() {
  const name = useRef<HTMLInputElement>(null)
  const firstSurname = useRef<HTMLInputElement>(null)
  const secondSurname = useRef<HTMLInputElement>(null)
  const [code, setCode] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const createCode = () => {
    const nameValue = name.current?.value.toUpperCase() || ''
    const firstSurnameValue = firstSurname.current?.value.toUpperCase() || ''
    const secondSurnameValue = secondSurname.current?.value.toUpperCase() || ''

    const canCreateCode = 
      nameValue?.length >= 2 
      && firstSurnameValue.length >= 2
      && secondSurnameValue.length >= 2

    if(canCreateCode) {
      const randomFourDigits = (Math.random() * 9999) + 1000

      const newCode = 
        `${nameValue.slice(0, 2)}`
        + `${firstSurnameValue.slice(0, 2)}`
        + `${secondSurnameValue.slice(0, 2)}`
        + `${randomFourDigits.toFixed(0)}`
        

      setCode(() => newCode)
    }
  }

  const submitForm = (data: FormData) => {
    const name = data.get('name')?.valueOf()
    const firstSurname = data.get('firstSurname')?.valueOf()
    const secondSurname = data.get('secondSurname')?.valueOf()
    const startDate = data.get('startDate')?.valueOf()
    const password = data.get('password')?.valueOf()
    const role = data.get('role')?.valueOf()

    if(
      typeof name !== "string" 
      || typeof firstSurname !== "string" 
      || typeof secondSurname !== "string"
      || typeof startDate !== "string"
      || typeof password !== "string"
      || typeof role !== "string"
    ) {
      throw new Error("Incorect type")
    }

    const employe: IEmploye = {
      nombre: name.toUpperCase(),
      apellido_paterno: firstSurname.toUpperCase(),
      apellido_materno: secondSurname.toUpperCase(),
      fecha_ingreso: startDate,
      fecha_egreso: '',
      clave: code,
      rol: role.toUpperCase()
    }

    const access: IAccess = {
      clave: code,
      password: password
    }

    createEmploye(employe, access)

    redirect('/menu-admin')
  }

  return (
    <form action={(e) => startTransition(() => submitForm(e))} method="POST" className="grid gap-2 mb-8">
      <label htmlFor="name">Nombre</label>
      <input 
        id="name" 
        name="name" 
        ref={name} 
        onChange={createCode} 
        className="border border-neutral-500 w-fit rounded-sm"
        required
      />
      <label htmlFor="firstSurname">Apellido Paterno</label>
      <input 
        id="firstSurname" 
        name="firstSurname" 
        ref={firstSurname} 
        onChange={createCode} 
        className="border border-neutral-500 w-fit rounded-sm"
        required
      />
      <label htmlFor="secondSurname">Apellido Materno</label>
      <input 
        id="secondSurname" 
        name="secondSurname" 
        ref={secondSurname} 
        onChange={createCode} 
        className="border border-neutral-500 w-fit rounded-sm"
        required
      />
      <label htmlFor="startDate">Fecha Ingreso</label>
      <input 
        id="startDate" 
        name="startDate" 
        type="date"
        className="border border-neutral-500 w-fit rounded-sm"
        required
      />
      <label htmlFor="code">Clave</label>
      <input
        id="code"
        name="code"
        className="border border-neutral-500 bg-neutral-300 w-fit rounded-sm"
        disabled
        value={code}
        required
      />
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        type="password"
        className="border border-neutral-500 w-fit rounded-sm"
        required
      />
      <div className="grid gap-2">
        <label htmlFor="role">Rol</label>
        <select id="role" name="role" className="w-fit py-2 px-8">
          {
            Object.values(Roles).map((role, key) => (
              <option key={key}>{role}</option>
            ))
          }
        </select>
      </div>
      <div className="mt-12 flex gap-16">
        <a 
          href='/menu-admin' 
          className="border-none bg-red-500 rounded py-2 px-8 text-neutral-100"
        >
          Regresar
        </a>
        <button
          className="border-none bg-green-500 rounded py-2 px-8 text-neutral-100"
        >
          Registrar
        </button>
      </div>
    </form>
  )
}