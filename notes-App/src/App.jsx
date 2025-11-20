import React from "react";
import { useState } from "react";
import { CircleX } from "lucide-react";

function App() {
  const [title, setTitle] = useState("");

  const [detail, setDetail] = useState("");

  const initialTask = () => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      return JSON.parse(savedNotes);
    }
    return [];
  };

  const [task, setTask] = useState(initialTask);

  const submitHandler = (e) => {
    e.preventDefault();

    const newTasks = [...task];
    newTasks.push({ title, detail });

    setTask(newTasks);
    localStorage.setItem("notes", JSON.stringify(newTasks));

    setTitle("");
    setDetail("");
  };

  const deleteNote = (idx) => {
    const updated = [...task];
    updated.splice(idx, 1);
    setTask(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  return (
    <div className="h-screen w-full flex flex-col text-white bg-black lg:flex-row ">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col gap-4 p-6 lg:border-r-2 lg:w-1/2"
      >
        <h1 className="font-semibold text-2xl text-center ">ADD NOTES</h1>

        {/* FIRST INPUT FOR NOTES HEADING */}
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="bg-gray-800 text-xl font-medium rounded-xl p-4 border-2 outline-none"
          type="text"
          placeholder="Enter Notes Heading"
          value={title}
        />

        {/* SECOND FOR SHORT SUMMARY NOTE*/}
        <textarea
          onChange={(e) => {
            setDetail(e.target.value);
          }}
          className="h-48 font-medium text-xl bg-gray-800 rounded-xl p-4 border-2 outline-none"
          placeholder="Enter Details"
          value={detail}
        ></textarea>

        <button className="active:scale-98 bg-white text-black p-2 rounded-lg font-medium">
          Add Notes
        </button>
      </form>

      <div className="lg:w-1/2  bg-gray-600 p-10">
        <h1 className="text-4xl font-medium">Your Notes</h1>
        <div className="flex justify-start flex-wrap gap-5 mt-5 overflow-y-auto max-h-[76vh]">
          {task.map(function (elem, idx) {
            return (
              <div
                key={idx}
                id="right"
                className="relative w-52 h-64  bg-cover bg-center text-black py-8 px-3 overflow-y-auto bg-[url('https://imgs.search.brave.com/-gqpt92JvXgZ7DwY2RGpKpMWl-2LRWqjVnecg3leXpk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTMv/MjEzLzUzMC9zbWFs/bC9kaWdpdGFsLXN0/aWNreS1ub3Rlcy1w/bmcucG5n')]"
              >
                <button
                  onClick={() => {
                    deleteNote(idx);
                  }}
                  className="active:scale-90 absolute top-5 right-0 bg-red-400 rounded-full"
                >
                  <CircleX size={40} color="#fff" strokeWidth={1.5} />
                </button>
                <div>
                  <h3 className="text-lg font-bold leading-tight">
                    {elem.title}
                  </h3>
                  <p className="text-sm mt-3 leading-tight font-medium text-gray-500">
                    {elem.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
