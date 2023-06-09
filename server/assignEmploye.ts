"use server"
import clientPromise from "@/lib/mongodb"
import { DB, Collections, Roles } from "@/types"
import { redirect } from "next/navigation"

export async function fetchWindow() {
  try {
    const client = await clientPromise
    const windows = client.db(DB.Banco).collection(Collections.Ventanilla).find({}, {projection:{ _id: 0}})

    return await windows.toArray()
  } catch(e) {
    throw new Error("error")
  }
}

export async function fetchEmploye() {
  try {
    const client = await clientPromise
    const employes = client.db(DB.Banco).collection(Collections.Empleado).find({ rol: Roles.Ventanilla }, {projection:{ _id: 0}})

    return await employes.toArray()
  } catch(e) {
    throw new Error("error")
  }
}

export async function fetchOneEmploye(code: string) {
  try {
    const client = await clientPromise
    const employe = client.db(DB.Banco).collection(Collections.Empleado).findOne({ clave: code})

    return employe
  } catch(e) {
    throw new Error('Error fetch one employe')
  }
}

export async function updateWindow(windowNumber: string, code: string) {
  try {
    const client = await clientPromise

    client.db(DB.Banco).collection(Collections.Ventanilla).updateOne(
      { numero: windowNumber },
      { $set: { clave: code } }
    )
  } catch(e) {
    throw new Error('Erro updating window')
  }

}