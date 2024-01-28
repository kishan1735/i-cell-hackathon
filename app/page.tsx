"use client";
import AuthCheck from "@/components/AuthCheck";
import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function Page() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="text-6xl w-5/6 flex flex-col justify-start h-[calc(100vh-200px)] pt-14 gap-5 text-white">
      <div className="text-7xl text-white">chronoX</div>
      <div className="text-2xl text-slate-500 pb-6">
        Timetables - but supercharged with AI
      </div>
      <Link
        className="font-bold py-3 px-6 text-2xl flex gap-2 items-center text-slate-300 border-2 border-slate-400/30 border-opacity hover:bg-slate-800 hover:border-slate-800 w-fit"
        href={session ? "/course" : ""}
        onClick={() =>
          session
            ? {}
            : signIn("google", { callbackUrl: `/` }, { prompt: "login" })
        }
      >
        {session ? "Enter" : "Login"}
        <ArrowRight />
      </Link>
    </div>
  );
}

export default Page;
