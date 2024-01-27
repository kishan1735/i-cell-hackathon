// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

function isClash(timetable) {
  const set = new Set();
  for (const section of timetable) {
    if (set.has(section.timings)) {
      return false;
    }
    set.add(section.timings);
  }
  return true;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // get sections from DB

  let courses = [];

  let fin = [];
  while (fin.size() < 50) {
    courses = courses
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let timetable = [];
    for (const course of courses) {
      timetable.push(course[Math.floor(Math.random() * course.length)]);
    }
    if (!isClash(timetable)) {
      fin.push(timetable);
    }
  }
}
