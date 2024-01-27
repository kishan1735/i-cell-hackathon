import connectMongoDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  try {
    console.log(params.course);
    await connectMongoDB();
    const res = await fetch(
      `https://www.chrono.crux-bphc.com/api/course/${params.course}`,
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await res.json();
    // console.log(data);
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "failed", message: err.message });
  }
}
