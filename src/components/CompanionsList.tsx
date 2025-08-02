
"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CompanionsList() {
  const companions = useQuery(api.companions.getUserCompanions) || [];
  // Get the last 3 companions, sorted by creation time (most recent first)
  const recentCompanions = companions
    .slice()
    .sort((a, b) => (b._creationTime || 0) - (a._creationTime || 0))
    .slice(0, 3);

  const colorMap: Record<string, { color: string; textColor: string }> = {
    Maths: { color: "bg-purple-100", textColor: "text-blue-800" },
    Language: { color: "bg-lightblue-200", textColor: "text-lightblue-800" },
    Science: { color: "bg-orange-100", textColor: "text-yellow-900" },
    History: { color: "bg-green-100", textColor: "text-green-800" },
    Coding: { color: "bg-blue-100", textColor: "text-blue-900" },
    Economics: { color: "bg-red-100", textColor: "text-red-800" },
    default: { color: "bg-gray-100", textColor: "text-gray-800" },
  };

  return (
    <div className="w-1/2">
      <div className="bg-white border border-black rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-medium mb-4 text-gray-700">
          Recently Created Companions
        </h2>
        {recentCompanions.length === 0 ? (
          <p className="text-gray-600 text-center">
            No companions created yet. Start by building one!
          </p>
        ) : (
          recentCompanions.map((companion) => {
            const { color, textColor } =
              colorMap[companion.subject] || colorMap.default;
            return (
              <div
                key={companion._id}
                className={`mb-4 p-4 ${color} rounded-lg border border-gray-200 hover:shadow-md transition-colors`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold px-3 py-1 bg-black text-white rounded-full">
                    {companion.subject}
                  </span>
                  <span className="text-gray-500 text-sm">✓</span>
                </div>
                <h3 className={`text-lg font-bold ${textColor}`}>
                  {companion.name}
                </h3>
                <p className={`text-sm ${textColor} mb-2`}>{companion.topic}</p>
                <p className={`text-sm ${textColor} flex items-center`}>
                  <span className="mr-2">⏰</span>
                  {companion.duration ? `${companion.duration} minutes` : "N/A"}
                </p>
                <Button
                  className="w-full mt-2 bg-gray-800 text-white hover:bg-gray-700 rounded-lg"
                  onClick={() =>
                    (window.location.href = `/companion-session/${companion._id}`)
                  }
                >
                  Review Lesson
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

