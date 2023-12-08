import React from "react";
import "./styles.css";

export default function page() {
  return (
    <div className="max-w-7xl flex justify-center items-center mx-auto">
      <div className="justify-center mx-auto items-center">
        <div className="h-[50px] w-[500px] flex gap-1 my-3 justify-center">
          <div className="w-full bg-slate-500 rounded-lg">
            <input
              className="h-full bg-transparent px-5 outline-none text-white"
              type="text"
              placeholder="Your First Name*"
              required
            />
          </div>
          <div className="w-full bg-slate-500 rounded-lg mx-auto">
            <input
              className="h-full bg-transparent px-5 outline-none text-white"
              type="text"
              placeholder="Your Last Name*"
              required
            />
          </div>
        </div>
        <div className="h-[50px] w-[500px] bg-slate-500 rounded-lg my-3">
          <input
            className="w-full h-full bg-transparent px-5 outline-none text-white"
            type="text"
            placeholder="Your Email*"
            required
          />
        </div>
        <div className="bg-slate-500 rounded-lg my-3">
          <textarea
            className="w-full h-full bg-transparent px-5 outline-none mt-3 max-h-[850px] min-h-[50px] text-white"
            placeholder="Your Email*"
            required
            rows={5}
          />
        </div>
        <button className="bg-slate-500 rounded-lg w-full h-[40px] text-white font-bold btn">
          Submit
        </button>
      </div>
    </div>
  );
}
