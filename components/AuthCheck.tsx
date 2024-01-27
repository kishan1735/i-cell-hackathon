"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(status);
  if (status == "authenticated") return <>{children}</>;
  else if (status == "loading")
    return <div className="text-2xl">Loading... </div>;
  else {
    router.push("/");
    return (
      <div>
        <Link
          className="bg-white text-2xl p-4 b-2 opacity-80 border-black rounded-xl cursor-pointer"
          href="/login"
        >
          Login To Get Started
        </Link>
      </div>
    );
  }
}
