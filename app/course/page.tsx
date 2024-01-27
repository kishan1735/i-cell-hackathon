"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AuthCheck from "@/components/AuthCheck";
import { useEffect, useState } from "react";

function Page() {
  const [state, setState] = useState("Search");
  const [courses, setCourses] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>([]);
  useEffect(
    function () {
      async function getAllCourses() {
        const res = await fetch("/api/course", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data1 = await res.json();
        console.log(data1);
        setResults(() => []);
        if (data1.status == "success") {
          setResults(() => []);
          data1.data.filter((el: any) => {
            if (
              el?.name?.startsWith(search.toUpperCase()) &&
              data1.data.length != 0 &&
              search.length >= 2
            ) {
              setResults((current: any) => [...current, el]);
            }
          });
        }
      }
      getAllCourses();
    },
    [search]
  );

  async function handleClick(el: any) {
    console.log(el.id);
    const res = await fetch(`/api/course/${el.id}`, {
      headers: { "Content-type": "application/json" },
    });
    const data1 = await res.json();
    if (data1.status == "success") {
      const filter1 = courses.filter((element: any) => {
        return element.id == el.id;
      });
      console.log(filter1);
      if (filter1.length == 0) {
        setCourses((current: any) => [...current, data1.data]);
        setState("Courses");
        setSearch("");
        setResults([]);
      }
    }
  }
  async function handleSubmit() {
    const requestBody = { courseset: courses };
    const res = await fetch("/api/course", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(courses),
    });
    const data = await res.json();
    console.log(data);
    if (data.status == "success") {
      setState("");
      setSearch("");
      setResults([]);
      setCourses([]);
    }
  }
  async function handleShow() {}
  return (
    <AuthCheck>
      <div className="bg-slate-800 border-slate-400 border px-10 py-4 text-slate-300">
        <nav className="flex justify-center space-x-4 text-2xl text-slate-300 font-medium">
          <div
            className="border-[1.5px] hover:bg-slate-800 bg-slate-900 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
            onClick={() => {
              setState("Search");
            }}
          >
            Search
          </div>
          <div
            className="border-[1.5px] hover:bg-slate-800 bg-slate-900 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
            onClick={() => {
              setState("Courses");
            }}
          >
            Courses
          </div>
          <div
            className="border-[1.5px] hover:bg-slate-800 bg-slate-900 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
            onClick={() => {
              setState("Exams");
            }}
          >
            Exams
          </div>
        </nav>
        <div className="flex flex-col py-4 items-center">
          {state == "Search" && (
            <div className="flex flex-col">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search"
                className="border-[1.5px] border-slate-400 text-xl bg-slate-900 py-1 px-2 text-center "
              />
              <div
                className={`flex flex-col text-center  ${
                  results.length != 0 ? "border-t my-6" : ""
                }`}
              >
                {results?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-center space-x-4 border-b border-x py-2 px-4 hover:bg-slate-950 cursor-pointer b"
                      key={i}
                      onClick={() => handleClick(el)}
                    >
                      <p className="font-medium">{el.name}</p>
                      <p>{el.code}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {state == "Courses" && (
            <div className="flex flex-col">
              <div className="flex flex-col text-center my-6  border-slate-300">
                {courses?.map((el: any, i: number) => {
                  return (
                    <div key={i} onClick={handleShow}>
                      <div className="flex justify-center space-x-4 border-[1.5px] py-2 px-4 hover:bg-slate-950 cursor-pointer">
                        <p className="font-medium">{el.name}</p>
                        <p>{el.code}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {state == "Exams" && (
            <div className="flex flex-col">
              <div className="flex flex-col text-center my-6 border-[1.5px]">
                {courses?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-center border-slate-300 text-center space-x-4 px-4 py-1 hover:bg-slate-900 cursor-pointer text-xl"
                      key={i}
                    >
                      <p className="font-medium">{el.name}</p>
                      <p className="font-medium">
                        {el.midsemStartTime.split("T")[0]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {courses.length > 0 && (
            <button
              className="bg-slate-900 border-[1.5px] border-slate-400 text-xl text-slate-300 hover:scale-105 py-2 px-4"
              onClick={handleSubmit}
            >
              Submit TimeTable
            </button>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
