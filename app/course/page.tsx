"use client";

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

  return (
    <div className="bg-black min-h-screen h-full flex justify-center items-center px-4">
      <div className="bg-white px-10 py-4">
        <nav className="flex space-x-4 text-2xl text-slate-800 font-medium">
          <div
            className="border-2 hover:bg-slate-200 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
            onClick={() => {
              setState("Search");
            }}
          >
            Search
          </div>
          <div
            className="border-2 hover:bg-slate-200 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
            onClick={() => {
              setState("Courses");
            }}
          >
            Courses
          </div>
          <div
            className="border-2 hover:bg-slate-200 cursor-pointer border-slate-400 rounded-xl px-2 py-1"
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
                className="border-2 border-slate-400 py-1 px-2 text-center"
              />
              <div className="flex flex-col text-center my-6 border-t-2">
                {results?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-center space-x-4 border-b-2 border-x-2 py-2 px-4 hover:bg-slate-200 cursor-pointer b"
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
              <div className="flex flex-col text-center my-6 border-t-2">
                {courses?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-center space-x-4 border-b-2 border-x-2 py-2 px-4 hover:bg-slate-200 cursor-pointer b"
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
          {state == "Exams" && (
            <div className="flex flex-col">
              <div className="flex flex-col text-center my-6 border-t-2">
                {courses?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-center space-x-4 border-b-2 border-x-2 py-2 px-4 hover:bg-slate-200 cursor-pointer b"
                      key={i}
                      onClick={() => handleClick(el)}
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
              className="bg-black text-white hover:scale-105 py-2 px-4"
              onClick={handleSubmit}
            >
              Submit TimeTable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
