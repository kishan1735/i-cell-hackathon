// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "@/lib/openai";

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

    let prompt =
      "\
        Task: Develop a timetable generator for college students that ensures no overlap in class timings. \
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
        for (const timing of section.timings) {
          prompt += `${timing}\n`;
        }
      }
      timetable.push(course[Math.floor(Math.random() * course.length)]);
    }

    const completion = await openai.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    const res = completion.choices[0].text;

    const regex = RegExp("Course '(.*)': Option (\\d\\d?)", "g");
    const sectionMap = new Map();
    while ((match = regex.exec(res)) !== null) {
      console.log(
        `Found ${match.groups[0]}. Next starts at ${regex.lastIndex}.`
      );
      sectionMap.set(match.groups[0], match.groups[1]);
    }

    if (!isClash(timetable)) {
      fin.push(timetable);
    }
  }
}
