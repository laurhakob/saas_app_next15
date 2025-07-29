"use client";

import { Button } from "@/components/ui/button";
import { Clock, Save } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function LearningCompanions() {
  const companions = useQuery(api.companions.getUserCompanions) || [];
  const router = useRouter();

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
    <div className="p-4">
      <h1 className="text-xl font-medium mb-4">My Learning Companions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companions.map((companion) => {
          const { color, textColor } = colorMap[companion.subject] || colorMap.default;
          return (
            <div
              key={companion._id}
              className={`p-4 rounded-2xl shadow-md ${color} border border-black`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold px-3 py-1 bg-black text-white rounded-full">
                  {companion.subject}
                </span>
                <span className="flex items-center">
                  <Save className="text-white bg-black rounded-full p-1 h-6 w-6" />
                </span>
              </div>
              <h3 className={`text-lg font-bold ${textColor}`}>
                {companion.name}
              </h3>
              <p className={`text-sm ${textColor} mb-4`}>
                {companion.topic}
              </p>
              <p className={`text-sm ${textColor} mb-4 flex items-center`}>
                <Clock className="mr-2 h-4 w-4" />
                {companion.duration ? `${companion.duration} minutes` : "N/A"}
              </p>
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-2xl"
                onClick={() => router.push(`/companion-session/${companion._id}`)}
              >
                Launch Lesson
              </Button>
            </div>
          );
        })}
      </div>
      {companions.length === 0 && (
        <p className="text-center text-gray-600 mt-4">No companions created yet.</p>
      )}
    </div>
  );
}