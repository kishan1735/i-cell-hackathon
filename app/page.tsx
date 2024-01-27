import Link from "next/link";

function Page() {
  return (
    <>
      {/* <h1 className="font-bold pl-6 pr-4 text-2xl">chronoX</h1> */}
      <Link
        className="bg-white text-2xl p-4 b-2 opacity-80 border-black rounded-xl cursor-pointer"
        href="/login"
      >
        Login To Get Started
      </Link>
    </>
  );
}

export default Page;
