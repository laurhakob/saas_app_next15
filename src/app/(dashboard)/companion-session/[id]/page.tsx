

// "use client";

// import { useQuery, useMutation } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { Id } from "../../../../../convex/_generated/dataModel";
// import { useParams } from "next/navigation";
// import { Loader, Mic } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { vapi } from "@/lib/vapi.sdk";

// // Define the Vapi message type based on SDK documentation
// interface VapiMessage {
//   type: string;
//   role?: "user" | "assistant" | "system";
//   transcript?: string;
// }

// export default function CompanionSession() {
//   const { id } = useParams();
//   const queryArgs =
//     typeof id === "string" ? { companionId: id as Id<"companions"> } : "skip";
//   const companion = useQuery(api.companions.getCompanionById, queryArgs);
//   const creator = useQuery(api.companions.getCompanionCreator, queryArgs);
//   const savedLog = useQuery(api.conversationLogs.getConversationLog, queryArgs);
//   const saveConversation = useMutation(api.conversationLogs.saveConversation);
//   const [isSessionActive, setIsSessionActive] = useState(false);
//   const [conversationLog, setConversationLog] = useState<
//     { speaker: string; text: string; timestamp: number }[]
//   >(savedLog || []);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
//   const [bufferedText, setBufferedText] = useState("");
//   const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

//   // Cleanup Vapi listeners on component unmount
//   useEffect(() => {
//     return () => {
//       if (isSessionActive) {
//         vapi.stop();
//       }
//     };
//   }, [isSessionActive]);

//   // Sync savedLog with conversationLog when savedLog updates
//   useEffect(() => {
//     if (savedLog) {
//       setConversationLog(savedLog);
//     }
//   }, [savedLog]);

//   if (typeof id !== "string") {
//     return <div>Error: Invalid Companion ID</div>;
//   }

//   if (companion === undefined || creator === undefined) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader className="size-6 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   if (companion === null) {
//     return <div>Error: Companion not found</div>;
//   }

//   // Function to commit the buffered text to the log
//   const commitBufferedMessage = () => {
//     if (currentSpeaker && bufferedText.trim()) {
//       const newMessage = {
//         speaker: currentSpeaker,
//         text: bufferedText.trim(),
//         timestamp: currentTimestamp,
//       };
//       setConversationLog((prev) => [...prev, newMessage]);
//       saveConversation({
//         companionId: id as Id<"companions">,
//         messages: [newMessage],
//       });
//     }
//   };

//   // Initialize Vapi assistant configuration
//   const startSession = async () => {
//     try {
//       setIsSessionActive(true);
//       // Configure the assistant dynamically based on companion data
//       const assistantConfig = {
//         name: companion.name,
//         model: {
//           provider: "openai" as const,
//           model: "gpt-4o" as const,
//           temperature: 0.7,
//           messages: [
//             {
//               role: "system" as const,
//               content: `You are ${companion.name}, an expert in ${companion.subject}. Your goal is to assist the user in learning about ${companion.topic}. Use a ${companion.speakingStyle} tone. Engage the user in an interactive conversation, asking questions and providing explanations tailored to their responses. Keep the conversation educational and engaging.`,
//             },
//           ],
//         },
//         voice: {
//           provider: "azure" as const,
//           voiceId:
//             companion.voiceType.toLowerCase() === "female"
//               ? "en-US-JennyNeural"
//               : "en-US-GuyNeural",
//         },
//       };
//       // Start the Vapi session
//       await vapi.start(assistantConfig);
//       // Listen for conversation updates
//       vapi.on("message", (data: VapiMessage) => {
//         console.log("Vapi message received:", data); // Debug log
//         if (data.type === "transcript" && data.transcript && data.role) {
//           if (data.role !== currentSpeaker) {
//             // Commit previous buffered message
//             commitBufferedMessage();
//             // Start new message
//             setCurrentSpeaker(data.role);
//             setBufferedText(data.transcript);
//             setCurrentTimestamp(Date.now());
//           } else {
//             // Append to current buffered text
//             setBufferedText((prev) => (prev + " " + data.transcript).trim());
//           }
//         }
//       });
//       // Handle session end
//       vapi.on("call-end", () => {
//         commitBufferedMessage(); // Commit any remaining buffered text
//         setCurrentSpeaker(null);
//         setBufferedText("");
//         const endMessage = {
//           speaker: "System",
//           text: "Session ended.",
//           timestamp: Date.now(),
//         };
//         setConversationLog((prev) => [...prev, endMessage]);
//         saveConversation({
//           companionId: id as Id<"companions">,
//           messages: [endMessage],
//         });
//         setIsSessionActive(false);
//       });
//     } catch (error) {
//       console.error("Failed to start Vapi session:", error);
//       setIsSessionActive(false);
//       const errorMessage = {
//         speaker: "System",
//         text: "Error starting session.",
//         timestamp: Date.now(),
//       };
//       setConversationLog((prev) => [...prev, errorMessage]);
//       saveConversation({
//         companionId: id as Id<"companions">,
//         messages: [errorMessage],
//       });
//     }
//   };

//   const endSession = async () => {
//     try {
//       await vapi.stop();
//     } catch (error) {
//       console.error("Failed to end Vapi session:", error);
//       const errorMessage = {
//         speaker: "System",
//         text: "Error ending session.",
//         timestamp: Date.now(),
//       };
//       setConversationLog((prev) => [...prev, errorMessage]);
//       saveConversation({
//         companionId: id as Id<"companions">,
//         messages: [errorMessage],
//       });
//     }
//   };

//   const toggleMic = () => {
//     vapi.setMuted(!isMicOn);
//     setIsMicOn(!isMicOn);
//   };

//   return (
//     <div className="p-4 min-h-screen bg-gray-100">
//       <div className="w-[80%] mx-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center space-x-3">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {companion.name}
//             </h2>
//             <span className="px-4 py-1 bg-gray-800 text-white text-sm font-semibold rounded-full">
//               {companion.subject}
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <p className="text-base text-gray-600">{companion.topic}</p>
//           <p className="text-base text-gray-600">
//             {companion.duration ? `${companion.duration} mins` : "N/A"}
//           </p>
//         </div>
//       </div>
//       <div className="w-[80%] mx-auto mt-6 flex space-x-[4%]">
//         <div
//           className="w-[70%] bg-white border-2 border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center"
//           style={{ height: "calc(4 * 100px)" }}
//         >
//           {isSessionActive && (
//             <div className="voice-animation mb-4">
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//           )}
//           <h2 className="text-2xl font-bold text-gray-800 text-center">
//             {companion.name}
//           </h2>
//         </div>
//         <div className="w-[26%] flex flex-col space-y-4">
//           <div className="flex-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center p-4">
//             <Avatar className="w-16 h-16 mb-4">
//               <AvatarImage
//                 src={creator.image ?? undefined}
//                 alt={creator.name}
//               />
//               <AvatarFallback className="text-xl">
//                 {creator.name ? creator.name.charAt(0).toUpperCase() : "?"}
//               </AvatarFallback>
//             </Avatar>
//             <p className="text-lg font-medium text-gray-700 text-center">
//               {creator.name || "Unknown"}
//             </p>
//           </div>
//           <Button
//             variant="outline"
//             className="flex flex-col items-center justify-center py-12 border-2 border-gray-300 rounded-xl shadow-lg hover:bg-gray-50"
//             onClick={toggleMic}
//             disabled={!isSessionActive}
//           >
//             <Mic
//               className={`h-10 w-10 mb-2 ${
//                 isMicOn ? "text-gray-600" : "text-red-600"
//               }`}
//             />
//             <span className="text-sm font-medium text-gray-700">
//               {isMicOn ? "Turn off microphone" : "Turn on microphone"}
//             </span>
//           </Button>
//           <Button
//             className={`py-6 rounded-xl shadow-lg text-lg font-medium ${
//               isSessionActive
//                 ? "bg-red-500 text-white hover:bg-red-600"
//                 : "bg-black text-white hover:bg-gray-900"
//             }`}
//             onClick={isSessionActive ? endSession : startSession}
//           >
//             {isSessionActive ? "End Session" : "Start Session"}
//           </Button>
//         </div>
//       </div>
//       <div className="w-[80%] mx-auto mt-6 bg-white border-2 border-gray-300 rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-4">
//           Conversation Log
//         </h3>
//         {conversationLog.length === 0 && !bufferedText ? (
//           <p className="text-gray-600">No conversation yet.</p>
//         ) : (
//           <div className="space-y-4 max-h-96 overflow-y-auto">
//             {conversationLog.map((entry, index) => (
//               <div
//                 key={index}
//                 className={`p-3 rounded-lg ${
//                   entry.speaker === "assistant"
//                     ? "bg-blue-50 text-blue-800"
//                     : entry.speaker === "user"
//                     ? "bg-gray-50 text-gray-800"
//                     : "bg-red-50 text-red-800"
//                 }`}
//               >
//                 <p className="font-semibold">
//                   {entry.speaker === "assistant"
//                     ? companion.name
//                     : entry.speaker === "user"
//                     ? "You"
//                     : "System"}
//                   :
//                 </p>
//                 <p>{entry.text}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(entry.timestamp).toLocaleTimeString()}
//                 </p>
//               </div>
//             ))}
//             {currentSpeaker && bufferedText && (
//               <div
//                 className={`p-3 rounded-lg ${
//                   currentSpeaker === "assistant"
//                     ? "bg-blue-50 text-blue-800"
//                     : currentSpeaker === "user"
//                     ? "bg-gray-50 text-gray-800"
//                     : "bg-red-50 text-red-800"
//                 }`}
//               >
//                 <p className="font-semibold">
//                   {currentSpeaker === "assistant"
//                     ? companion.name
//                     : currentSpeaker === "user"
//                     ? "You"
//                     : "System"}
//                   :
//                 </p>
//                 <p>{bufferedText}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {new Date(currentTimestamp).toLocaleTimeString()}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Loader, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { vapi } from "@/lib/vapi.sdk";

// Define the Vapi message type based on SDK documentation
interface VapiMessage {
  type: string;
  role?: "user" | "assistant" | "system";
  transcript?: string;
}

export default function CompanionSession() {
  const { id } = useParams();
  const queryArgs =
    typeof id === "string" ? { companionId: id as Id<"companions"> } : "skip";
  const companion = useQuery(api.companions.getCompanionById, queryArgs);
  const creator = useQuery(api.companions.getCompanionCreator, queryArgs);
  const savedLog = useQuery(api.conversationLogs.getConversationLog, queryArgs);
  const saveConversation = useMutation(api.conversationLogs.saveConversation);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [conversationLog, setConversationLog] = useState<
    { speaker: string; text: string; timestamp: number }[]
  >(savedLog || []);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);
  const [bufferedText, setBufferedText] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

  // Cleanup Vapi listeners on component unmount
  useEffect(() => {
    return () => {
      if (isSessionActive) {
        vapi.stop();
      }
    };
  }, [isSessionActive]);

  // Sync savedLog with conversationLog when savedLog updates
  useEffect(() => {
    if (savedLog) {
      setConversationLog(savedLog);
    }
  }, [savedLog]);

  if (typeof id !== "string") {
    return <div>Error: Invalid Companion ID</div>;
  }

  if (companion === undefined || creator === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (companion === null) {
    return <div>Error: Companion not found</div>;
  }

  // Function to commit the buffered text to the log
  const commitBufferedMessage = () => {
    if (currentSpeaker && bufferedText.trim()) {
      const newMessage = {
        speaker: currentSpeaker,
        text: bufferedText.trim(),
        timestamp: currentTimestamp,
      };
      setConversationLog((prev) => [...prev, newMessage]);
      saveConversation({
        companionId: id as Id<"companions">,
        messages: [newMessage],
      });
    }
  };

  // Initialize Vapi assistant configuration
  const startSession = async () => {
    try {
      setIsSessionActive(true);
      setIsMicOn(true); // Ensure mic is on when session starts
      // Configure the assistant dynamically based on companion data
      const assistantConfig = {
        name: companion.name,
        model: {
          provider: "openai" as const,
          model: "gpt-4o" as const,
          temperature: 0.7,
          messages: [
            {
              role: "system" as const,
              content: `You are ${companion.name}, an expert in ${companion.subject}. Your goal is to assist the user in learning about ${companion.topic}. Use a ${companion.speakingStyle} tone. Engage the user in an interactive conversation, asking questions and providing explanations tailored to their responses. Keep the conversation educational and engaging.`,
            },
          ],
        },
        voice: {
          provider: "azure" as const,
          voiceId:
            companion.voiceType.toLowerCase() === "female"
              ? "en-US-JennyNeural"
              : "en-US-GuyNeural",
        },
      };
      // Start the Vapi session
      await vapi.start(assistantConfig);
      // Listen for conversation updates
      vapi.on("message", (data: VapiMessage) => {
        console.log("Vapi message received:", data); // Debug log
        if (data.type === "transcript" && data.transcript && data.role) {
          if (data.role !== currentSpeaker) {
            // Commit previous buffered message
            commitBufferedMessage();
            // Start new message
            setCurrentSpeaker(data.role);
            setBufferedText(data.transcript);
            setCurrentTimestamp(Date.now());
          } else {
            // Append to current buffered text
            setBufferedText((prev) => (prev + " " + data.transcript).trim());
          }
        }
      });
      // Handle session end
      vapi.on("call-end", () => {
        commitBufferedMessage(); // Commit any remaining buffered text
        setCurrentSpeaker(null);
        setBufferedText("");
        const endMessage = {
          speaker: "System",
          text: "Session ended.",
          timestamp: Date.now(),
        };
        setConversationLog((prev) => [...prev, endMessage]);
        saveConversation({
          companionId: id as Id<"companions">,
          messages: [endMessage],
        });
        setIsSessionActive(false);
        setIsMicOn(true); // Reset mic state on session end
      });
    } catch (error) {
      console.error("Failed to start Vapi session:", error);
      setIsSessionActive(false);
      setIsMicOn(true); // Reset mic state on error
      const errorMessage = {
        speaker: "System",
        text: "Error starting session.",
        timestamp: Date.now(),
      };
      setConversationLog((prev) => [...prev, errorMessage]);
      saveConversation({
        companionId: id as Id<"companions">,
        messages: [errorMessage],
      });
    }
  };

  const endSession = async () => {
    try {
      await vapi.stop();
    } catch (error) {
      console.error("Failed to end Vapi session:", error);
      const errorMessage = {
        speaker: "System",
        text: "Error ending session.",
        timestamp: Date.now(),
      };
      setConversationLog((prev) => [...prev, errorMessage]);
      saveConversation({
        companionId: id as Id<"companions">,
        messages: [errorMessage],
      });
    }
  };

  const toggleMic = () => {
    const newMicState = !isMicOn;
    vapi.setMuted(newMicState);
    setIsMicOn(newMicState);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="w-[80%] mx-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {companion.name}
            </h2>
            <span className="px-4 py-1 bg-gray-800 text-white text-sm font-semibold rounded-full">
              {companion.subject}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-600">{companion.topic}</p>
          <p className="text-base text-gray-600">
            {companion.duration ? `${companion.duration} mins` : "N/A"}
          </p>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-6 flex space-x-[4%]">
        <div
          className="w-[70%] bg-white border-2 border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center"
          style={{ height: "calc(4 * 100px)" }}
        >
          {isSessionActive && (
            <div className={`voice-animation mb-4 ${isMicOn ? '' : 'muted'}`}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {companion.name}
          </h2>
        </div>
        <div className="w-[26%] flex flex-col space-y-4">
          <div className="flex-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center p-4">
            <Avatar className="w-16 h-16 mb-4">
              <AvatarImage
                src={creator.image ?? undefined}
                alt={creator.name}
              />
              <AvatarFallback className="text-xl">
                {creator.name ? creator.name.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <p className="text-lg font-medium text-gray-700 text-center">
              {creator.name || "Unknown"}
            </p>
          </div>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center py-12 border-2 border-gray-300 rounded-xl shadow-lg hover:bg-gray-50"
            onClick={toggleMic}
            disabled={!isSessionActive}
          >
            <Mic
              className={`h-10 w-10 mb-2 ${
                isMicOn ? "text-gray-600" : "text-red-600"
              }`}
            />
            <span className="text-sm font-medium text-gray-700">
              {isMicOn ? "Turn off microphone" : "Turn on microphone"}
            </span>
          </Button>
          <Button
            className={`py-6 rounded-xl shadow-lg text-lg font-medium ${
              isSessionActive
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            onClick={isSessionActive ? endSession : startSession}
          >
            {isSessionActive ? "End Session" : "Start Session"}
          </Button>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-6 bg-white border-2 border-gray-300 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Conversation Log
        </h3>
        {conversationLog.length === 0 && !bufferedText ? (
          <p className="text-gray-600">No conversation yet.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversationLog.map((entry, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  entry.speaker === "assistant"
                    ? "bg-blue-50 text-blue-800"
                    : entry.speaker === "user"
                    ? "bg-gray-50 text-gray-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <p className="font-semibold">
                  {entry.speaker === "assistant"
                    ? companion.name
                    : entry.speaker === "user"
                    ? "You"
                    : "System"}
                  :
                </p>
                <p>{entry.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
            {currentSpeaker && bufferedText && (
              <div
                className={`p-3 rounded-lg ${
                  currentSpeaker === "assistant"
                    ? "bg-blue-50 text-blue-800"
                    : currentSpeaker === "user"
                    ? "bg-gray-50 text-gray-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <p className="font-semibold">
                  {currentSpeaker === "assistant"
                    ? companion.name
                    : currentSpeaker === "user"
                    ? "You"
                    : "System"}
                  :
                </p>
                <p>{bufferedText}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(currentTimestamp).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
