import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteAllTask,
  Deletetask,
  completedTask,
  undoTask,
  updateTask,
} from "../Store/slices/Taskslice";

const TaskList = () => {
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editPriority, setEditPriority] = useState(0);

  const tasks = useSelector((state) => state.Task.tasks);
  const dispatch = useDispatch();

  const handleDelete = (obj) => {
    dispatch(Deletetask(obj));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      dispatch(DeleteAllTask());
    }
  };

  const handleCompleted = (obj) => {
    dispatch(completedTask(obj));
    setToggle(!toggle);
  };

  const handleUndo = (obj) => {
    dispatch(undoTask(obj));
    setToggle(!toggle);
  };

  const priorityMap = {
    1: "low",
    2: "mid",
    3: "high",
  };

  const findCompleted = () => tasks.filter((obj) => obj.complete).length;
  const findpending = () => tasks.filter((obj) => !obj.complete).length;

  const getPriorityColor = (priority) => {
    switch (priorityMap[priority]) {
      case "high":
        return "bg-red-100 text-red-800";
      case "mid":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isDue = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-extrabold mb-6 drop-shadow-lg">
            List Of Tasks
          </h1>
          <p className="text-white text-2xl">
            Completed:{" "}
            <span className="text-green-400 font-semibold">
              {findCompleted()}
            </span>
            &nbsp;&nbsp;|&nbsp;&nbsp; Pending:{" "}
            <span className="text-yellow-400 font-semibold">
              {findpending()}
            </span>
          </p>
        </div>

        {tasks.length > 0 ? (
          <div className="space-y-6">
            {tasks.map((obj) => (
              <div
                key={obj.id}
                className={`bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-8 py-6 text-white shadow-md transition-all hover:scale-[1.01] ${
                  obj.complete ? "opacity-70" : ""
                }`}
              >
                <div className="mb-6 space-y-4">
                  {editId === obj.id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Task name"
                        className="w-full px-5 py-3 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent transition-all duration-300"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                      />
                      <input
                        type="date"
                        className="w-full px-5 py-3 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent transition-all duration-300"
                        value={editDeadline}
                        onChange={(e) => setEditDeadline(e.target.value)}
                      />
                      <select
                        className="w-full px-5 py-3 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ffbd59] focus:border-transparent transition-all duration-300"
                        value={editPriority}
                        onChange={(e) => setEditPriority(Number(e.target.value))}
                      >
                        <option className="bg-slate-800" value={3}>
                          High
                        </option>
                        <option className="bg-slate-800" value={2}>
                          Mid
                        </option>
                        <option className="bg-slate-800" value={1}>
                          Low
                        </option>
                      </select>
                    </>
                  ) : (
                    <>
                      <h2
                        className={`text-3xl font-bold ${
                          obj.complete
                            ? "text-gray-400 line-through"
                            : "text-white"
                        }`}
                      >
                        {obj.task}
                      </h2>

                      <div className="flex flex-wrap gap-5 text-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">📅</span>
                          <span className="text-gray-300">
                            Deadline:{" "}
                            <span className="text-white font-medium">
                              {obj.deadline}
                            </span>
                          </span>
                        </div>

                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-base font-semibold ${getPriorityColor(
                              obj.priority
                            )}`}
                          >
                            Priority: {priorityMap[obj.priority]}
                          </span>
                        </div>

                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-base font-semibold ${
                              obj.complete
                                ? "bg-green-100 text-green-800"
                                : isDue(obj.deadline)
                                ? "bg-red-100 text-red-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            Status:{" "}
                            {obj.complete
                              ? "Completed"
                              : isDue(obj.deadline)
                              ? "Due"
                              : "Pending"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() =>
                      toggle ? handleUndo(obj) : handleCompleted(obj)
                    }
                    className={`px-5 py-3 rounded-lg font-semibold transition-colors text-lg shadow-sm ${
                      obj.complete
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    title={
                      obj.complete ? "Mark as incomplete" : "Mark as complete"
                    }
                  >
                    {obj.complete ? "Undo" : "Complete"}
                  </button>

                  {editId === obj.id ? (
                    <button
                      onClick={() => {
                        dispatch(
                          updateTask({
                            id: obj.id,
                            task: editTask,
                            deadline: editDeadline,
                            priority: editPriority,
                          })
                        );
                        setEditId(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      💾 Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(obj.id);
                        setEditTask(obj.task);
                        setEditDeadline(obj.deadline);
                        setEditPriority(obj.priority);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      ✏️ Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(obj)}
                    className="px-5 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors text-lg shadow-sm"
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-white text-2xl font-semibold mb-4">
              No tasks yet
            </h3>
            <p className="text-white text-lg">
              Create your first task to get started!
            </p>
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg text-xl"
            >
              🗑️ Clear All Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
