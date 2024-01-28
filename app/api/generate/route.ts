import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/lib/openai";
import connectMongoDB from "@/lib/dbConnect";
import CourseSet from "@/models/courseModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

function isClash(timetable: any[]) {
  const set = new Set();
  for (const section of timetable) {
    for (const timing of section.roomTime) {
      const time = timing.split(":")[2] + timing.split(":")[3];
      if (set.has(time)) {
        return true;
      }
      set.add(time);
    }
  }
  return false;
}

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: "error", message: "Unauthorised" });
  }
  // get sections from DB
  await connectMongoDB();
  let courses = (
    await CourseSet.findOne({
      userEmail: session?.user?.email,
    })
  ).courses;

  let temp = [];
  for (const course of courses) {
    let arr = [[], [], []];
    for (const section of course.sections) {
      if (section.type == "L") {
        arr[0].push(section);
      } else if (section.type == "T") {
        arr[1].push(section);
      } else {
        arr[2].push(section);
      }
    }
    for (const a of arr) {
      if (a.length !== 0) {
        temp.push({
          ...course,
          sections: a,
        });
      }
    }
  }
  courses = temp;

  let fin = [];
  while (fin.length < 5) {
    courses = courses
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let prompt =
      "\
        Task: Develop an optimal timetable generator for college students that ensures no overlap in class timings. \
        Requirements: \
        - There are 6 working days in a week: Monday (M), Tuesday (T), Wednesday (W), Thursday (Th), Friday (F), and Saturday (S). \
        - Each day has 11 hours, numbered from 1 to 11. \
        - Classes have multiple options for timings. \
        - Choose EXACTLY ONE of the options for each class. \
        - Ensure there is NO overlap in the timings of different classes. \
        - Try to make sure no day has too many classes. \
        Input: \
      ";

    let timetable = [];
    for (const course of courses) {
      prompt += `Course \'${course.name}\'\n`;
      for (const section of course.sections) {
        prompt += `Section \'${section.name}\'\n`;
        for (const timing of section.roomTime) {
          prompt += `${timing}\n`;
        }
      }
      timetable.push(
        course.sections[Math.floor(Math.random() * course.sections.length)]
      );
    }

    try {
      console.log(timetable);
      console.log(isClash(timetable));
      if (!isClash(timetable)) {
        let rating =
          11 +
          Math.random() -
          timetable.reduce((acc, cur) => acc + cur.roomTime.length, 0) / 5;
        fin.push({ timetable, rating });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return NextResponse.json({ status: "success", data: fin });
}
