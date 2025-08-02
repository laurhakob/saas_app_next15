
"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, Plus } from "lucide-react";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

export default function MyJourney() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const companions = useQuery(api.companions.getUserCompanions) || [];
  const router = useRouter();

  // Color mapping for subjects, consistent with learning-companions page
  const colorMap: Record<string, { color: string; textColor: string }> = {
    Maths: { color: "bg-purple-100", textColor: "text-blue-800" },
    Language: { color: "bg-lightblue-200", textColor: "text-lightblue-800" },
    Science: { color: "bg-orange-100", textColor: "text-yellow-900" },
    History: { color: "bg-green-100", textColor: "text-green-800" },
    Coding: { color: "bg-blue-100", textColor: "text-blue-900" },
    Economics: { color: "bg-red-100", textColor: "text-red-800" },
    default: { color: "bg-gray-100", textColor: "text-gray-800" },
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Please sign in to view your journey.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Learning Journey</h1>
        <p className="text-gray-600">Track your progress and explore your personalized learning companions.</p>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="border-2 border-gray-300 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center space-x-3">
              <Avatar className="w-16 h-16 border-2 border-gray-300">
                <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
                <AvatarFallback className="text-xl bg-gray-200 text-gray-700">
                  {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <span>{user.name || "User"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-600">{user.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Learning Companions</p>
                <p className="text-gray-600">{companions.length} companion{companions.length !== 1 ? "s" : ""} created</p>
              </div>
              <Button
                className="bg-gray-800 text-white hover:bg-gray-700 rounded-lg mt-4"
                onClick={() => router.push("/companion-form")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Companion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companions Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="border-2 border-gray-300 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Your Learning Companions</CardTitle>
          </CardHeader>
          <CardContent>
            {companions.length === 0 ? (
              <p className="text-gray-600 text-center">No companions created yet. Start by creating one!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companions.map((companion) => {
                  const { color, textColor } = colorMap[companion.subject] || colorMap.default;
                  return (
                    <div
                      key={companion._id}
                      className={`p-4 rounded-xl ${color} border border-gray-300 hover:shadow-md transition-shadow duration-300`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold px-3 py-1 bg-black text-white rounded-full">
                          {companion.subject}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>{companion.name}</h3>
                      <p className={`text-sm ${textColor} mb-2`}>{companion.topic}</p>
                      <p className={`text-sm ${textColor} flex items-center mb-4`}>
                        <Clock className="w-4 h-4 mr-2" />
                        {companion.duration ? `${companion.duration} minutes` : "N/A"}
                      </p>
                      <Button
                        className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-lg"
                        onClick={() => router.push(`/companion-session/${companion._id}`)}
                      >
                        Resume Lesson
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-gray-300 shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Overall Progress</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(companions.length * 10, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {companions.length} lesson{companions.length !== 1 ? "s" : ""} completed
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Activity</p>
                {companions.length === 0 ? (
                  <p className="text-gray-600">No recent activity. Start a lesson to track your progress!</p>
                ) : (
                  <div className="space-y-4">
                    {companions.slice(0, 3).map((companion) => (
                      <div
                        key={companion._id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{companion.name}</p>
                            <p className="text-xs text-gray-600">{companion.topic}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="text-sm"
                          onClick={() => router.push(`/companion-session/${companion._id}`)}
                        >
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}