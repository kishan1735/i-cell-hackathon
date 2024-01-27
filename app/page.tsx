"use client";
import AuthCheck from "@/components/AuthCheck";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Page() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <AuthCheck>
      {/* <h1 className="font-bold pl-6 pr-4 text-2xl">chronoX</h1> */}
      {/* <Link
        className="bg-white text-2xl p-4 b-2 opacity-80 border-black rounded-xl cursor-pointer"
        href="/login"
      >
        Login To Get Started
      </Link> */}
      <Link
        className="font-bold py-6 px-6 text-6xl text-slate-300 border-2 border-slate-400 hover:scale-110  hover:bg-slate-800"
        href="/course"
      >
        Enter chronoX
      </Link>
    </AuthCheck>
  );
}

export default Page;
