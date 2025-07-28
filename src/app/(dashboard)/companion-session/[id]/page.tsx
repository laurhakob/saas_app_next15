"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function CompanionSession() {
  const { id } = useParams();
  const queryArgs =
    typeof id === "string" ? { companionId: id as Id<"companions"> } : "skip";
  const companion = useQuery(api.companions.getCompanionById, queryArgs);

  if (typeof id !== "string") {
    return <div>Error: Invalid Companion ID</div>;
  }

  if (companion === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (companion === null) {
    return <div>Error: Companion not found</div>;
  }

  return (
    <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{companion.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Subject</h3>
            <p className="text-gray-600">{companion.subject}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Topic</h3>
            <p className="text-gray-600">{companion.topic}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Voice Type</h3>
            <p className="text-gray-600">{companion.voiceType}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              Speaking Style
            </h3>
            <p className="text-gray-600">{companion.speakingStyle}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
