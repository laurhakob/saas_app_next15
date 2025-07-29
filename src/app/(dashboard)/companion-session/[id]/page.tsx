// "use client";

// import { useQuery } from "convex/react";
// import { api } from "../../../../../convex/_generated/api";
// import { Id } from "../../../../../convex/_generated/dataModel";
// import { useParams } from "next/navigation";
// import { Loader } from "lucide-react";

// export default function CompanionSession() {
//   const { id } = useParams();
//   const queryArgs =
//     typeof id === "string" ? { companionId: id as Id<"companions"> } : "skip";
//   const companion = useQuery(api.companions.getCompanionById, queryArgs);

//   if (typeof id !== "string") {
//     return <div>Error: Invalid Companion ID</div>;
//   }

//   if (companion === undefined) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader className="size-6 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   if (companion === null) {
//     return <div>Error: Companion not found</div>;
//   }

//   return (
//     <div className="p-4 min-h-screen bg-gray-100">
//       <div className="w-[80%] mx-auto bg-white border-2 border-gray-300 rounded-xl shadow-lg p-8">
//         <div className="flex items-center justify-between mb-4">
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
//     </div>
//   );
// }

"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CompanionSession() {
  const { id } = useParams();
  const queryArgs =
    typeof id === "string" ? { companionId: id as Id<"companions"> } : "skip";
  const companion = useQuery(api.companions.getCompanionById, queryArgs);
  const creator = useQuery(api.companions.getCompanionCreator, queryArgs);

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
          className="w-[70%] bg-white border-2 border-gray-300 rounded-xl shadow-lg flex items-center justify-center"
          style={{ height: "calc(4 * 100px)" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {companion.name}
          </h2>
        </div>
        <div className="w-[26%] bg-white border-2 border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center p-4">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage src={creator.image ?? undefined} alt={creator.name} />
            <AvatarFallback className="text-xl">
              {creator.name ? creator.name.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-medium text-gray-700 text-center">
            {creator.name || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
