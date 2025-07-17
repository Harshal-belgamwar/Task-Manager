import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddTask as addtask } from "../Store/slices/Taskslice";

const AddTask = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    task: "",
    deadline: "",
    priority: 0,
  });

  const handleclick = (e) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handlesubmit = () => {
    if (!form.task.trim()) {
      alert("task field is required!");
      return;
    }

    dispatch(addtask(form));
    setForm({
      task: "",
      deadline: "",
      priority: "",
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <h1 className="text-white text-4xl font-bold text-center mt-8 drop-shadow-lg">
        Add To Your Task List
      </h1>

      <div className="relative border-2 border-[#ffbd59] rounded-xl backdrop-blur-sm bg-white/10 shadow-2xl flex flex-col gap-6 w-full max-w-2xl mx-auto p-8">
        <div className="flex flex-col gap-2">
          <label className="text-white text-lg font-medium">
            Task<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={form.task}
            required
            name="task"
            placeholder="Enter your task..."
            onChange={handleclick}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-lg font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleclick}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-white text-lg font-medium">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleclick}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 backdrop-blur-md 
               focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent 
               transition-all duration-300 appearance-none"
          >
            <option value="" disabled hidden>
              Select priority
            </option>
            <option value={1} className="bg-slate-800 text-white">
              Low
            </option>
            <option value={2} className="bg-slate-800 text-white">
              Mid
            </option>
            <option value={3} className="bg-slate-800 text-white">
              High
            </option>
          </select>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-8 py-3 bg-gradient-to-r from-[#ffbd59] to-[#ff9a56] 
               text-white font-bold text-lg rounded-lg shadow-md 
               hover:shadow-xl transition-all duration-300 ease-in-out 
               transform hover:scale-105 hover:brightness-110 
               focus:outline-none focus:ring-4 focus:ring-[#ffbd59]/50 
               active:scale-95"
            onClick={handlesubmit}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
