"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status == "authenticated") return <>{children}</>;
  else if (status == "loading")
    return <div className="text-2xl">Loading... </div>;
  else {
    redirect("/");
  }
}
