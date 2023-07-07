"use server"
import clientPromise from "@/lib/mongodb";
import { DB, Collections, IEmploye } from "@/types";
import { redirect } from "next/navigation";

export async function createEmploye(employe: IEmploye) {
  try {
    const client = await clientPromise

    client.db(DB.Banco).collection(Collections.Empleado).insertOne(employe)
  } catch(e) {
    throw new Error("error")
  }

  redirect('/admin-menu')
}