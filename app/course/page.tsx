"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AuthCheck from "@/components/AuthCheck";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function Page() {
  const [state, setState] = useState("Search");
  const [courses, setCourses] = useState<any>([]);
  const [tempCourses, setTempCourses] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>([]);
  const [select, setSelect] = useState<any>([]);
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
              setResults((current: Array<Object>) => [...current, el]);
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
        setTempCourses((current: any) => [...current, data1.data]);
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
      setTempCourses([]);
    }
  }
  async function handleShow(el: any) {
    el.sections = select;
    const updatedCourses = tempCourses.map((element: any) => {
      if (el.id == element.id) {
        return el;
      } else {
        return element;
      }
    });
    setTempCourses(updatedCourses);
  }

  return (
    <AuthCheck>
      <div className="flex flex-col items-center px-10 text-slate-300">
        <div className="text-5xl font-medium my-8">Add Courses</div>
        <nav className="flex justify-center space-x-4 text-2xl bg-slate-800 rounded-lg text-slate-300 font-medium">
          <div
            className="hover:bg-slate-900  cursor-pointer border-slate-400/30 rounded-lg px-4 py-2"
            onClick={() => {
              setState("Search");
            }}
          >
            Search
          </div>
          <div
            className=" hover:bg-slate-900  cursor-pointer border-slate-400 rounded-lg px-4 py-2"
            onClick={() => {
              setState("Courses");
            }}
          >
            Courses
          </div>
          <div
            className=" hover:bg-slate-900 cursor-pointer border-slate-400 rounded-lg px-4 py-2"
            onClick={() => {
              setState("Exams");
            }}
          >
            Exams
          </div>
        </nav>
        <div className="flex flex-col py-4 items-center gap-2">
          {state == "Search" && (
            <div className="flex flex-col">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search..."
                className="rounded-lg border-slate-400 text-xl bg-slate-900 py-1 mt-2 px-2 text-center "
              />
              <div
                className={`flex flex-col text-center border-slate-500  ${
                  results.length != 0 ? "rounded-lg my-6" : ""
                }`}
              >
                {results?.map((el: any, i: number) => {
                  return (
                    <div
                      className="flex justify-between space-x-4 border-slate-500 my-1 border-y border-x py-4 px-4 hover:bg-slate-800 cursor-pointer rounded-lg"
                      key={i}
                      onClick={() => handleClick(el)}
                    >
                      <p className="font-medium">{el.name}</p>
                      <p className="text-slate-400">{el.code}</p>
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
                    <div key={i}>
                      <div className="flex justify-center text-lg space-x-4 border border-slate-500/50 rounded-lg py-3 my-1 px-4 hover:bg-slate-950 cursor-pointer gap-2">
                        <p className="font-medium">{el.name}</p>
                        <p className="text-slate-400">{el.code}</p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Pencil />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-slate-900 border-0 px-2 overflow-y-scroll max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle className="text-white px-2">
                                {el.name} - {el.code}
                              </DialogTitle>
                              <DialogDescription>
                                <div className="border-t border-slate-800 mt-4 overflow-scroll">
                                  {el.sections.map(
                                    (element: any, i: number) => {
                                      return (
                                        <div
                                          key={i}
                                          className="text-center flex text-lg space-x-2 justify-between p-2 items-center hover:bg-slate-800 rounded-lg"
                                        >
                                          <p className="text-lg w-fit text-slate-400 font-semibold">
                                            {element.type}
                                            {element.number}
                                          </p>
                                          <div className="flex flex-col items-center grow">
                                            <p className="text-slate-400 w-72 font-semibold truncate break-words whitespace-nowrap">
                                              {element.instructors.join(", ")}
                                            </p>
                                            <p className="text-slate-550">
                                              {element.roomTime
                                                .map(
                                                  (e: string) =>
                                                    e.split(":")[1] +
                                                    " " +
                                                    e.split(":")[2] +
                                                    " " +
                                                    e.split(":")[3]
                                                )
                                                .join(", ")}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() => {
                                    handleShow(el);
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {state == "Exams" && (
            <div className="flex flex-col">
              <div className="flex flex-col text-center my-6 ">
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
              className="bg-slate-900 rounded-lg border-slate-200 text-2xl font-regular text-slate-300 hover:scale-105 py-2 px-4"
              onClick={handleSubmit}
            >
              Generate Timetable
            </button>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}

export default Page;
