"use server"
import clientPromise from "@/lib/mongodb";
import { DB, Collections, IEmploye, IAccess } from "@/types";
import { redirect } from "next/navigation";

export async function createEmploye(employe: IEmploye, access: IAccess) {
  try {
    const client = await clientPromise

    client.db(DB.Banco).collection(Collections.Empleado).insertOne(employe)

    client.db(DB.Banco).collection(Collections.Acceso).insertOne(access)
  } catch(e) {
    throw new Error("error")
  }

  redirect('/admin-menu')
}