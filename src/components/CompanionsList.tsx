"use client";

import { Button } from "@/components/ui/button";

export default function CompanionsList() {
  const companions = [
    {
      title: "Neura the Brainy Explorer",
      subtitle: "Neural Network of the Brain",
      category: "Science",
      duration: "45 minutes",
    },
    {
      title: "Countsy the Number Wizard",
      subtitle: "Derivatives & Integrals",
      category: "Math",
      duration: "30 minutes",
    },
    {
      title: "Verba the Vocabulary Builder",
      subtitle: "Language",
      category: "English Literature",
      duration: "30 minutes",
    },
  ];

  return (
    <div className="w-1/2">
      <div className="bg-white border border-black rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-700">
          Recently Completed Lessons
        </h2>
        {companions.map((companion, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold px-3 py-1 bg-black text-white rounded-full">
                {companion.category}
              </span>
              <span className="text-gray-500 text-sm">✓</span>{" "}
              {/* Replaced save icon with a checkmark for completion */}
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {companion.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{companion.subtitle}</p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="mr-2">⏰</span> {/* Clock symbol */}
              {companion.duration}
            </p>
            <Button className="w-full mt-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg">
              Review Lesson
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
