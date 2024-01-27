"use client";
import { signIn } from "next-auth/react";

function page() {
  return (
    <>
      <div className="bg-white flex flex-col opacity-80 px-12 py-8 space-y-4 text-center">
        <div className="uppercase text-4xl ">Login to Get Started</div>
        <button
          className="flex bg-black opacity-80 text-white p-2 space-x-2 justify-center hover:scale-105"
          onClick={() =>
            signIn(
              "google",
              { callbackUrl: `http://localhost:3000/course` },
              { prompt: "login" }
            )
          }
        >
          <p className="text-xl">Login with Google </p>
          <img src="images/google.png" className="h-8 w-8" />
        </button>
      </div>
    </>
  );
}

export default page;
