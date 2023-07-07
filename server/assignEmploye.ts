"use server"
import clientPromise from "@/lib/mongodb"
import { DB, Collections } from "@/types"

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
    const employes = client.db(DB.Banco).collection(Collections.Empleado).find({}, {projection:{ _id: 0}})

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