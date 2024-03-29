export function Spinner() {
  return (
    <>
      <div
        className={
          "flex h-12 w-12 animate-spin items-center justify-center rounded-[50%] border-8 border-t-8 border-slate-700 border-t-slate-500"
        }
      >
        <div className={"h-8 w-8 rounded-[50%] bg-transparent"}></div>
      </div>
    </>
  );
}
