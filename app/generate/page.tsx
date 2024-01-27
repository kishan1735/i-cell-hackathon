"use client";
import { TimetableGrid } from "@/components/TimetableGrid";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [timetableSections, setTimetableSections] = useState([[]]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/generate");
      const { data } = await res.json();
      setTimetableSections(data);
      setReady(true);
    })();
  }, []);

  return (
    <div className="bg-slate-950 flex flex-col justify-center items-center gap-5 pt-4 pb-8">
      <div className="text-4xl text-slate-200 py-1 mt-2">
        Generated Timetables
      </div>
      {ready ? (
        <div className="flex flex-row justify-around w-full gap-4">
          <div className="w-4/5">
            <TooltipProvider>
              <TimetableGrid timetableDetailsSections={timetableSections[0]} />
            </TooltipProvider>
          </div>
          <div className="flex flex-col items-center text-slate-200 w-1/5 pt-12 gap-5">
            <div className="text-2xl">Timetable 6</div>
            <div className="flex flex-row">
              <ChevronLeft />
              <div>
                {timetableIndex + 1} / {timetableSections.length}
              </div>
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
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Page;
