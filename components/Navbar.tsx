import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
