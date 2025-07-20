"use client";

import { UserButton } from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <div className="p-4">
        <UserButton />
      <h1 className="text-2xl font-semibold">Home</h1>
      <p>Monitor all of your projects and tasks here</p>
    </div>
  );
}
