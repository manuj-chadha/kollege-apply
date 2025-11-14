import { fees } from "@/data/fees";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: {id: string }}) {
    const {id}=await params;
    const url=await new URL(req.url);
    const courseId=await url.searchParams.get("courseId");
    if(!courseId){
        return NextResponse.json({error: "Missing course ID."}, {status: 400});
    }
    const feesOfUni=fees[id];
    if(!feesOfUni){
        return NextResponse.json({error: "University not found."}, {status: 404});
    }
    const feeResponse=feesOfUni[courseId];
    if(!feeResponse) return NextResponse.json({error: "Fees not specified for this course."}, {status: 404})
    return NextResponse.json({ feeResponse }, {status: 200});
}
