
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

export default function CompanionForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [error, setError] = useState("");
  const createCompanion = useMutation(api.companions.createCompanion);
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a companion.");
      return;
    }
    if (!name || !subject || !topic || !selectedVoice || !selectedStyle) {
      setError("All fields are required.");
      return;
    }

    try {
      const companionId = await createCompanion({
        name,
        subject,
        topic,
        voiceType: selectedVoice,
        speakingStyle: selectedStyle,
      });
      router.push(`/companion-session/${companionId}`);
    } catch{
      setError("Failed to create companion. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Companion Builder
        </h1>
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Companion Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the companion name – ex: Calculus King"
              className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Subject
            </label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the subject – ex: Math"
              className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              What should this companion teach?
            </label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter the topic you want to learn – ex: Derivatives"
              className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Voice Type
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-gray-800 transition-colors"
            >
              <option value="">Select Voice Type</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Speaking Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-gray-800 transition-colors"
            >
              <option value="">Select Speaking Style</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
            </select>
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-lg mt-4 transition-colors"
          >
            Build Companion
          </Button>
        </form>
      </div>
    </div>
  );
}