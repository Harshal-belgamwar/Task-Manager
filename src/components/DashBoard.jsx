import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { CheckCircle, Clock, AlertTriangle, Plus, Filter } from "lucide-react";

const Dashboard = () => {
  const tasks = useSelector((state) => state.Task.tasks);
  console.log("🟢 Loaded tasks from Redux:", tasks);
  const [animatedData, setAnimatedData] = useState([]);
  const [filter, setFilter] = useState("all");

  const getStatus = (task) => {
    if (task.complete) return "completed";
    const today = new Date();
    const dueDate = new Date(task.deadline);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today ? "due" : "pending";
  };

  const getTaskStats = (taskList) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let completed = 0,
      due = 0,
      pending = 0;

    taskList.forEach((task) => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);

      if (task.complete) {
        completed++;
      } else if (deadline < today) {
        due++;
      } else {
        pending++;
      }
    });

    return {
      completed,
      due,
      pending,
      total: taskList.length,
    };
  };

  const taskStats = getTaskStats(tasks);

  useEffect(() => {
    const updatedData = [
      { name: "Completed", value: taskStats.completed, color: "#22c55e" },
      { name: "Pending", value: taskStats.pending, color: "#f59e0b" },
      { name: "Due", value: taskStats.due, color: "#ef4444" },
    ];

    const timer = setTimeout(() => {
      setAnimatedData(updatedData);
    }, 300); // optional animation delay

    return () => clearTimeout(timer);
  }, [tasks]); // re-run effect when tasks change

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => getStatus(task) === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "due":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "due":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 3:
        return "text-red-600";
      case 2:
        return "text-yellow-600";
      case 1:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold" style={{ color: data.color }}>
            {data.name}: {data.value} tasks
          </p>
          <p className="text-sm text-gray-600">
            {((data.value / taskStats.total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Task Dashboard</h1>
          <p className="text-slate-300">
            Monitor your task progress and productivity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Tasks",
              value: taskStats.total,
              icon: <Plus className="w-6 h-6 text-blue-400" />,
              color: "bg-blue-500/20",
            },
            {
              label: "Completed",
              value: taskStats.completed,
              icon: <CheckCircle className="w-6 h-6 text-green-400" />,
              color: "bg-green-500/20",
            },
            {
              label: "Pending",
              value: taskStats.pending,
              icon: <Clock className="w-6 h-6 text-yellow-400" />,
              color: "bg-yellow-500/20",
            },
            {
              label: "Due",
              value: taskStats.due,
              icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
              color: "bg-red-500/20",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">{card.label}</p>
                  <p className={`text-3xl font-bold text-white`}>
                    {card.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pie Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">
                Task Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={animatedData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {animatedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ color: "#fff" }}
                      formatter={(value) => (
                        <span className="text-white">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Recent Tasks
                </h2>
                <div className="relative w-48">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none w-full px-4 py-2 pr-10 rounded-xl text-white bg-white/10 border border-white/20 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
                  >
                    <option className="text-black" value="all">All Tasks</option>
                    <option className="text-black" value="completed">Completed</option>
                    <option className="text-black" value="pending">Pending</option>
                    <option className="text-black" value="due">Due</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="w-5 h-5 text-white opacity-70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredTasks.map((task) => {
                  const status = getStatus(task);
                  return (
                    <div
                      key={task.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(status)}
                          <div>
                            <h3 className="text-white font-medium">
                              {task.task}
                            </h3>
                            <p className="text-slate-300 text-sm">
                              Due: {task.deadline}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {["", "low", "mid", "high"][task.priority]}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredTasks.length === 0 && (
                  <p className="text-white text-center">
                    No tasks in this category.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
