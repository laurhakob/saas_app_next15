"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Cta() {
  const router = useRouter();

  const handleBuildCompanion = () => {
    router.push("/companion-form");
  };

  return (
    <div className="max-w-2xl bg-black p-8 flex flex-col items-center justify-center rounded-2xl h-full min-h-[400px]">
      <h3 className="text-center px-6 py-3 bg-yellow-300 text-black font-medium rounded-lg mb-6">
        Start learning your way.
      </h3>
      <h2 className="text-3xl font-bold text-white mb-4">
        Build a Personalized Learning Companion
      </h2>
      <p className="text-sm text-white text-center mb-4">
        Pick a name, subject, voice & personality – and start learning through
        voice conversations that feel natural and fun.
      </p>
      <p className="text-sm text-white text-center mb-4">
        Customize your companion with unique traits, set your learning goals,
        and enjoy interactive lessons tailored to your pace and style.
      </p>
      <p className="text-sm text-white text-center mb-6">
        Whether you&apos;re mastering a new skill or exploring a passion, your
        companion adapts to keep you engaged and motivated every step of the
        way.
      </p>
      <Button
        className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-6 py-3"
        onClick={handleBuildCompanion}
      >
        + Build New Companion
      </Button>
    </div>
  );
}
