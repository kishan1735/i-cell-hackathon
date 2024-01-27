import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Navbar() {
  return (
    <div className="bg-slate-800 flex flex-row text-center items-center justify-start w-screen text-white text-xl py-2 gap-6">
      <Link className="font-bold pl-6 pr-4 text-2xl" href="/">
        chronoX
      </Link>
      <div>Timetable Generator</div>
      <div>Saved Timetables</div>
      <div className="flex flex-row justify-end flex-grow px-4">
        {/* TODO: show user Google avatar */}
        <Popover>
          <PopoverTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mt-2 mr-2 border-none w-32 flex flex-col gap-4 items-start bg-slate-700 text-slate-200">
            <div>Profile</div>
            <div>Logout</div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
