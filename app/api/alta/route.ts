import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  return NextResponse.json({ message: "Drakengard is good" })
}

export async function POST(req : NextRequest) {
}