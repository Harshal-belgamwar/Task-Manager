import React from "react";

const Intro = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center items-center p-8">
      <div className="w-full text-center mb-8">
        <h1 className="font-bold text-6xl md:text-7xl text-white drop-shadow-2xl animate-pulse">
          To Do App
        </h1>
      </div>
      
      <div className="mb-12">
        <h2 className="font-bold text-4xl md:text-5xl text-white text-center drop-shadow-lg">
          Stay Organized, Stay Productive
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-12">
        <p className="text-xl md:text-2xl text-white text-center leading-relaxed font-light">
          Welcome to your personal task manager! Simplify your day by tracking
          everything in one place. From daily chores to long-term goals, our to-do
          app helps you prioritize, stay focused, and achieve more. Start adding
          your tasks now and take control of your time like never before.
        </p>
      </div>
      
      <div className="mt-16 flex justify-center space-x-8">
        <div className="w-3 h-3 bg-[#ffbd59] rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-[#ff9a56] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-[#ffbd59] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default Intro;