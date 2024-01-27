import Link from "next/link";

function Page() {
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <Link
        className="bg-white text-2xl p-4 b-2 opacity-80 border-black rounded-xl cursor-pointer"
        href="/login"
      >
        Login To Get Started
      </Link>
    </div>
  );
}

export default Page;
