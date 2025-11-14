import { fees } from "@/data/fees";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const url = new URL(req.url);
  const courseId = url.searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json(
      { error: "Missing course ID." },
      { status: 400 }
    );
  }

  const uniFees = fees[id];
  if (!uniFees) {
    return NextResponse.json(
      { error: "University not found." },
      { status: 404 }
    );
  }

  const fee = uniFees[courseId];
  if (!fee) {
    return NextResponse.json(
      { error: "Fees not specified for this course." },
      { status: 404 }
    );
  }

  return NextResponse.json({ feeResponse: fee }, { status: 200 });
}
