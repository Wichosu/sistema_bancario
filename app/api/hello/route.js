import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  return NextResponse.json({ message: "Hello World" })
}

export async function POST(req) {
  const res = await (await clientPromise).db("Banco").collection("Cuenta").findOne()
  if(res){
    return NextResponse.json(await res.json())
  }
  return NextResponse.json("HOla")
}
