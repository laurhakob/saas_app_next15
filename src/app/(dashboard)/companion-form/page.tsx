"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUp, Upload } from "lucide-react";
import { useState } from "react";

export default function CompanionForm() {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Companion Builder</h1>
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4 text-center">Companion Icon</h2>
          <div className="flex space-x-4 justify-center">
            <Button className="w-14 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
              {/* Picture icon placeholder */}
              <ImageUp className="h-15 w-15 text-gray-500" />
            </Button>
            <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-lg flex items-center space-x-2 px-4 py-2 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload Image</span>
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Companion Name
            </label>
            <Input placeholder="Enter the companion name – ex: Calculus King" className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Subject
            </label>
            <Input placeholder="Enter the subject – ex: Math" className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
              What should this companion teach?
            </label>
            <Input placeholder="Enter the topic you want to learn – ex: Derivatives" className="rounded-lg border-gray-300 focus:border-gray-800 transition-colors" />
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
              <option value="informal">Informal</option>
            </select>
          </div>
          <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 rounded-lg mt-4 transition-colors">
            Build Companion
          </Button>
        </div>
      </div>
    </div>
  );
}