"use client"
import Input from "./Input";
import { useState } from "react";

interface Props {
  login: (data: FormData) => Promise<Boolean>
}

export default function Page({ login }: Props) {
  const [auth, setAuth] = useState<Boolean>()
  const [loading, setLoading] = useState(false)

  const sendForm = async (data: FormData) => {
    setLoading(true)
    setAuth(await login(data))
    setLoading(false)
  }

  return (
    <form action={sendForm} className="grid justify-center gap-6">
      <Input label="Clave" name="code" /> 
      <Input label="Contraseña" type="password" name="password" />
      <button 
        className="px-4 py-2 bg-blue-300 rounded hover:bg-blue-400"
      >
        Acceder
      </button>
      {
        loading &&
        <div>Cargando...</div>
      }
      {
        auth === false && 
        <div>Autorización Fallida</div>
      }
    </form>
  );
}