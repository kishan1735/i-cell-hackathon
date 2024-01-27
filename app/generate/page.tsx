"use client";
import { TimetableGrid } from "@/components/TimetableGrid";
import { TooltipProvider } from "@/components/ui/tooltip";

function Page() {
  const sections = [
    {
      id: "1",
      name: "Course",
      roomTime: ["CS 1101:F102:M:1", "CS 1101:F102:S:2"],
      courseId: "CS 1101",
      type: "L",
      number: 1,
      instructors: ["Dr. A", "Dr. B"],
    },
  ];

  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center gap-4">
      <div className="text-4xl text-slate-200">Generated Timetables</div>
      <div className="self-start w-4/5">
        <TooltipProvider>
          <TimetableGrid timetableDetailsSections={sections} />
        </TooltipProvider>
      </div>
    </div>
  );
}

export default Page;
