// src/app/api/join-waitlist/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  // Simulate successful waitlist addition (replace with actual logic, e.g., database)
  return NextResponse.json({ success: true }, { status: 200 });
}