import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";

export function TimetableGrid({
  timetableDetailsSections,
}: {
  timetableDetailsSections: {
    id: string;
    name: string;
    roomTime: string[];
    courseId: string;
    type: string;
    number: number;
    instructors: string[];
  }[];
}) {
  const timetableGrid = useMemo(() => {
    const daysOfWeek = ["M", "T", "W", "Th", "F", "S"];
    const grid: ({
      id: string;
      name: string;
      courseId: string;
      room: string;
      code: string;
      type: string;
      number: number;
      instructors: string[];
    } | null)[] = Array(10 * 6);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = null;
    }
    console.log(timetableDetailsSections);
    for (let i = 0; i < timetableDetailsSections.length; i++) {
      for (let j = 0; j < timetableDetailsSections[i].roomTime.length; j++) {
        const [code, room, day, hour] =
          timetableDetailsSections[i].roomTime[j].split(":");
        const remainder = daysOfWeek.indexOf(day);
        const quotient = parseInt(hour) - 1;
        grid[quotient + remainder * 10] = {
          id: timetableDetailsSections[i].id,
          courseId: timetableDetailsSections[i].courseId,
          room: room,
          name: timetableDetailsSections[i].name,
          code: code,
          type: timetableDetailsSections[i].type,
          number: timetableDetailsSections[i].number,
          instructors: timetableDetailsSections[i].instructors,
        };
      }
    }

    return grid;
  }, [timetableDetailsSections]);
  console.log(timetableGrid);
  return (
    <div className="ml-4 flex w-full">
      <div
        className={`grid items-center pr-2 text-lg text-center text-slate-500 font-bold grid-rows-6 mt-12`}
      >
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>Th</span>
        <span>F</span>
        <span>S</span>
      </div>
      <div className="flex flex-col w-full">
        <div className="grid justify-between text-md text-center text-slate-500 grid-cols-10 mb-[-1rem]">
          <div className="mb-4 flex flex-col">
            <span className="font-bold">1</span>
            <span className="text-slate-600">8 - 9AM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">2</span>
            <span className="text-slate-600">9 - 10AM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">3</span>
            <span className="text-slate-600">10 - 11AM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">4</span>
            <span className="text-slate-600">11 - 12PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">5</span>
            <span className="text-slate-600">12 - 1PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">6</span>
            <span className="text-slate-600">1 - 2PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">7</span>
            <span className="text-slate-600">2 - 3PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">8</span>
            <span className="text-slate-600">3 - 4PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">9</span>
            <span className="text-slate-600">4 - 5PM</span>
          </div>
          <div className="mb-4 flex flex-col">
            <span className="font-bold">10</span>
            <span className="text-slate-600">5 - 6PM</span>
          </div>
        </div>
        <div
          className={`grid grid-cols-10 grid-rows-6 h-[calc(100vh-14rem)] gap-2 w-full`}
        >
          {timetableGrid.map((e, i) =>
            e !== null ? (
              <Tooltip delayDuration={100} key={i}>
                <TooltipTrigger asChild>
                  <div
                    className={`hover:bg-slate-500/90 cursor-pointer transition duration-200 ease-in-out bg-slate-600 rounded-md ${"pl-3 pb-2 pt-2"}`}
                  >
                    <div className="flex h-full text-sm flex-col text-slate-200">
                      <span className="font-bold">
                        {e.code} {e.type}
                        {e.number}
                      </span>
                      <span className="text-slate-300">{e.room}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-slate-50 border-slate-800">
                  {e.name}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div
                className={`bg-slate-900 rounded-md h-fit pl-3 pt-20 ${
                  i >= 50 ? `` : `pb-2`
                }`}
              ></div>
            )
          )}
          {/* <div className="text-white">{JSON.stringify(timetableGrid)}</div> */}
        </div>
      </div>
    </div>
  );
}
