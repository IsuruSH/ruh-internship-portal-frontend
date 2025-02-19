"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CurrentStatus() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="flex-1 flex flex-col  p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">CURRENT STATUS</h1>
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-4 text-center">
            Where are you Now
          </h3>
          <div className="mb-4">
            <input type="checkbox" id="Call_Interview" />
            <label htmlFor="Call_Interview" className="ml-2">
              Call the interview
            </label>
          </div>
          <div className="mb-4">
            <input type="checkbox" id="Faced" />
            <label htmlFor="Faced" className="ml-2">
              Faced the interview
            </label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="selected"
              onChange={() => handleNavigate("about")}
            />
            <label htmlFor="selected" className="ml-2">
              Selected
            </label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="intern"
              onChange={() => handleNavigate("diary")}
            />
            <label htmlFor="intern" className="ml-2">
              Intern
            </label>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="completeIntern"
              onChange={() => handleNavigate("feedback")}
            />
            <label htmlFor="completeIntern" className="ml-2">
              Complete Intern
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
