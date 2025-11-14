import { universities } from "@/data/universities";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    // console.log("params:", params);
    // console.log("params.id:", params.id);
    // console.log("all keys:", Object.keys(universities));
      const { id } = await params;
    const uni =universities[id];

    if (!uni) {
        return NextResponse.json(
            { error: "Not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(uni, { status: 200 });
}
