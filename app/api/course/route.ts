import connectMongoDB from "@/lib/dbConnect";
import CourseSet from "@/models/courseModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const res = await fetch("https://www.chrono.crux-bphc.com/api/course", {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = await res.json();
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    let courses;
    if (data.length != 0) courses = await CourseSet.create({ courses: data });
    if (!courses) {
      throw new Error("Courses could not be sent");
    }
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
