import { courses } from "@/data/courses";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params : { id: string }}) {
    const { id }=await params;
    const courseData=courses[id];
    if(!courseData){
        return NextResponse.json({error: "No courses found for this university."},{status: 404});
    }
  return NextResponse.json(courseData, { status: 200 });
}
