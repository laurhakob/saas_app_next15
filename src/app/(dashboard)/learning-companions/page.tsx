"use client";

import { Button } from "@/components/ui/button";
import { Clock, Save, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LearningCompanions() {
  const companions = useQuery(api.companions.getUserCompanions) || [];
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanions = companions.filter((companion) =>
    companion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          My Learning Companions
        </h1>
        <div className="relative w-80">
          <Input
            type="text"
            placeholder="Search by companion name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanions.map((companion) => {
          const { color, textColor } =
            colorMap[companion.subject] || colorMap.default;
          return (
            <div
              key={companion._id}
              className={`p-5 rounded-2xl shadow-lg ${color} border border-gray-300 hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold px-4 py-1 bg-black text-white rounded-full">
                  {companion.subject}
                </span>
                <span className="flex items-center">
                  <Save className="text-white bg-black rounded-full p-1 h-6 w-6" />
                </span>
              </div>
              <h3 className={`text-xl font-bold ${textColor} mb-2`}>
                {companion.name}
              </h3>
              <p className={`text-sm ${textColor} mb-4`}>{companion.topic}</p>
              <p className={`text-sm ${textColor} mb-4 flex items-center`}>
                <Clock className="mr-2 h-4 w-4" />
                {companion.duration ? `${companion.duration} minutes` : "N/A"}
              </p>
              <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-xl py-2 font-medium transition-colors"
                onClick={() =>
                  router.push(`/companion-session/${companion._id}`)
                }
              >
                Launch Lesson
              </Button>
            </div>
          );
        })}
      </div>
      {filteredCompanions.length === 0 && (
        <p className="text-center text-gray-600 mt-8 text-lg">
          No companions found.
        </p>
      )}
    </div>
  );
}
