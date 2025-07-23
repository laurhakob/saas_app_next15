"use client";

import { Button } from "@/components/ui/button";
import { Save, Clock } from "lucide-react";

export default function Home() {
  const companions = [
    {
      title: "Neura the Brainy Explorer",
      category: "Science",
      duration: "45 minutes",
      color: "bg-orange-100",
      textColor: "text-yellow-900",
    },
    {
      title: "Countsy the Number Wizard",
      category: "Math",
      duration: "30 minutes",
      color: "bg-purple-100",
      textColor: "text-blue-800",
    },
    {
      title: "Verba the Vocabulary Builder",
      category: "English Literature",
      duration: "30 minutes",
      color: "bg-lightblue-200",
      textColor: "text-lightblue-800",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-medium mb-4">Popular Companions</h1>
        <div className="flex justify-around space-x-4">
          {companions.map((companion, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl shadow-md ${companion.color} w-1/3 border border-black`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-sm font-semibold px-3 py-1 bg-black text-white rounded-full`}
                >
                  {companion.category}
                </span>
                <span className="flex items-center">
                  <Save className="text-white bg-black rounded-full p-1 h-6 w-6" />
                </span>
              </div>
              <h3 className={`text-lg font-bold ${companion.textColor}`}>
                {companion.title}
              </h3>
              <p className={`text-sm ${companion.textColor} mb-4`}>
                {companion.category === "Science"
                  ? "Neural Network of the Brain"
                  : companion.category === "Math"
                    ? "Derivatives & Integrals"
                    : "Language"}
              </p>
              <p
                className={`text-sm ${companion.textColor} mb-4 flex items-center`}
              >
                <Clock className="mr-2 h-4 w-4" />
                {companion.duration}
              </p>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-2xl">
                Launch Lesson
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
