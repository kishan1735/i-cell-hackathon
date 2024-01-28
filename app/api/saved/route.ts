import connectMongoDB from "@/lib/dbConnect";
import CourseSet from "@/models/courseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Timetable from "@/models/timetableModel";

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const session = await getServerSession(authOptions);
    const data = await Timetable.find({ email: session?.user?.email });
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    await Timetable.create({
      email: session?.user?.email,
      timetable: data.timetable,
      rating: data.rating,
    });
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
