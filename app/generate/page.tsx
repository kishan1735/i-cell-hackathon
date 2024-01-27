"use client";
import AuthCheck from "@/components/AuthCheck";
import { TimetableGrid } from "@/components/TimetableGrid";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <AuthCheck>
      <div className="bg-slate-950 flex flex-col justify-center items-center gap-5 pt-4 pb-8">
        <div className="text-4xl text-slate-200 py-1 mt-2">
          Generated Timetables
        </div>
        <div className="flex flex-row justify-around w-full gap-4">
          <div className="w-4/5">
            <TooltipProvider>
              <TimetableGrid timetableDetailsSections={sections} />
            </TooltipProvider>
          </div>
          <div className="flex flex-col items-center text-slate-200 w-1/5 pt-12 gap-5">
            <div className="text-2xl">Timetable 6</div>
            <div className="flex flex-row">
              <ChevronLeft />
              <div>6 / 50</div>
              <ChevronRight />
            </div>
            <Button>
              <div className="text-lg">Save Timetable</div>
            </Button>
            <Button>
              <div className="text-lg">Edit Courses</div>
            </Button>
            {/* TODO: add metrics */}
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
