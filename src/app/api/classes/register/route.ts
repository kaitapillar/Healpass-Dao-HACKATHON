// src/app/api/classes/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { classId } = body;

  // Simulate successful registration (replace with actual blockchain or database logic)
  return NextResponse.json({ success: true, classId }, { status: 200 });
}