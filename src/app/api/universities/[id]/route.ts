import { universities } from "@/data/universities";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const uni = universities[id];
  if (!uni) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(uni, { status: 200 });
}
