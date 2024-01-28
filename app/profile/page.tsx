"use client";
import AuthCheck from "@/components/AuthCheck";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  return (
    <AuthCheck>
      <div className="bg-slate-950 text-slate-300   flex flex-col space-y-4 text-xl border-[1.5px] border-slate-400 p-8">
        <img
          src={session?.user?.image ?? ""}
          className="h-16 w-16 mx-auto rounded-full"
        />
        <div className="flex space-x-4 ">
          <div>Name:</div>
          <div>{session?.user?.name}</div>
        </div>
        <div className="flex space-x-[20px]">
          <div>Email:</div>
          <div>{session?.user?.email}</div>
        </div>
        <div className="flex space-x-12">
          <div>Id:</div>
          <div>{session?.user?.email?.split("@")[0]}</div>
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
