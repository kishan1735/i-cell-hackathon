"use client";
import AuthCheck from "@/components/AuthCheck";
import { TimetableGrid } from "@/components/TimetableGrid";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { time } from "console";

function Page() {
  const [timetableSections, setTimetableSections] = useState([]);
  const [timetableIndex, setTimetableIndex] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/generate");
      let { data } = await res.json();
      data.sort((a, b) => b.rating - a.rating);
      setTimetableSections(data);
      setReady(true);
    })();
  }, []);

  return (
    <AuthCheck>
      <div className="bg-slate-950 flex flex-col justify-center items-center gap-5 pt-4 pb-8">
        <div className="text-4xl text-slate-200 py-1 mt-2">
          Generated Timetables
        </div>
        {ready ? (
          <div className="flex flex-row justify-around w-full gap-10">
            <div className="w-4/5">
              <TooltipProvider>
                <TimetableGrid
                  timetableDetailsSections={
                    timetableSections[timetableIndex].timetable
                  }
                />
              </TooltipProvider>
            </div>
            <div className="flex flex-col items-center text-slate-200 w-1/5 pt-12 gap-5">
              <div className="text-2xl">Timetable {timetableIndex + 1}</div>
              <div className="flex flex-row">
                <ChevronLeft
                  onClick={() =>
                    setTimetableIndex(
                      (timetableIndex - 1 + timetableSections.length) %
                        timetableSections.length
                    )
                  }
                />
                <div>
                  {timetableIndex + 1} / {timetableSections.length}
                </div>
                <ChevronRight
                  onClick={() =>
                    setTimetableIndex(
                      (timetableIndex + 1) % timetableSections.length
                    )
                  }
                />
              </div>
              <Button>
                <div className="text-lg">Save Timetable</div>
              </Button>
              <Button>
                <div className="text-lg">
                  <Link href="/course">Change Courses</Link>
                </div>
              </Button>
              <br />
              <Award className="self-center" size={36} />
              <div className="text-xl">
                OpenAI Rating:{" "}
                {timetableSections[timetableIndex].rating.toFixed(2) ?? 4}
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </AuthCheck>
  );
}

export default Page;
