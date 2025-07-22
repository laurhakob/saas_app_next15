"use client";

import { Button } from "@/components/ui/button";

export default function MyJourney() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold underline">
        My Journey
      </h1>
      <p>Your learning journey starts here!</p>
      <Button>View Journey</Button>
    </div>
  );
}