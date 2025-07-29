// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";
// import { getAuthUserId } from "@convex-dev/auth/server";

// export const createCompanion = mutation({
//   args: {
//     name: v.string(),
//     subject: v.string(),
//     topic: v.string(),
//     voiceType: v.string(),
//     speakingStyle: v.string(),
//     duration: v.number(),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     const companionId = await ctx.db.insert("companions", {
//       userId,
//       name: args.name,
//       subject: args.subject,
//       topic: args.topic,
//       voiceType: args.voiceType,
//       speakingStyle: args.speakingStyle,
//       duration: args.duration,
//     });

//     return companionId;
//   },
// });

// export const getCompanionById = query({
//   args: { companionId: v.id("companions") },
//   handler: async (ctx, args) => {
//     const companion = await ctx.db.get(args.companionId);
//     if (!companion) {
//       throw new Error("Companion not found");
//     }
//     return companion;
//   },
// });

// export const getUserCompanions = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }
//     return await ctx.db
//       .query("companions")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .collect();
//   },
// });




// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";
// import { getAuthUserId } from "@convex-dev/auth/server";

// export const createCompanion = mutation({
//   args: {
//     name: v.string(),
//     subject: v.string(),
//     topic: v.string(),
//     voiceType: v.string(),
//     speakingStyle: v.string(),
//     duration: v.number(),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }

//     const companionId = await ctx.db.insert("companions", {
//       userId,
//       name: args.name,
//       subject: args.subject,
//       topic: args.topic,
//       voiceType: args.voiceType,
//       speakingStyle: args.speakingStyle,
//       duration: args.duration,
//     });

//     return companionId;
//   },
// });

// export const getCompanionById = query({
//   args: { companionId: v.id("companions") },
//   handler: async (ctx, args) => {
//     const companion = await ctx.db.get(args.companionId);
//     if (!companion) {
//       throw new Error("Companion not found");
//     }
//     return companion;
//   },
// });

// export const getUserCompanions = query({
//   args: {},
//   handler: async (ctx) => {
//     const userId = await getAuthUserId(ctx);
//     if (!userId) {
//       throw new Error("Unauthorized");
//     }
//     return await ctx.db
//       .query("companions")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .collect();
//   },
// });

// export const getCompanionCreator = query({
//   args: { companionId: v.id("companions") },
//   handler: async (ctx, args) => {
//     const companion = await ctx.db.get(args.companionId);
//     if (!companion) {
//       throw new Error("Companion not found");
//     }
//     const user = await ctx.db.get(companion.userId);
//     return user ? user.name : "Unknown";
//   },
// });




import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createCompanion = mutation({
  args: {
    name: v.string(),
    subject: v.string(),
    topic: v.string(),
    voiceType: v.string(),
    speakingStyle: v.string(),
    duration: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const companionId = await ctx.db.insert("companions", {
      userId,
      name: args.name,
      subject: args.subject,
      topic: args.topic,
      voiceType: args.voiceType,
      speakingStyle: args.speakingStyle,
      duration: args.duration,
    });

    return companionId;
  },
});

export const getCompanionById = query({
  args: { companionId: v.id("companions") },
  handler: async (ctx, args) => {
    const companion = await ctx.db.get(args.companionId);
    if (!companion) {
      throw new Error("Companion not found");
    }
    return companion;
  },
});

export const getUserCompanions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("companions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const getCompanionCreator = query({
  args: { companionId: v.id("companions") },
  handler: async (ctx, args) => {
    const companion = await ctx.db.get(args.companionId);
    if (!companion) {
      throw new Error("Companion not found");
    }
    const user = await ctx.db.get(companion.userId);
    return user ? { name: user.name, image: user.image } : { name: "Unknown", image: null };
  },
});