import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const saveConversation = mutation({
  args: {
    companionId: v.id("companions"),
    messages: v.array(
      v.object({
        speaker: v.string(),
        text: v.string(),
        timestamp: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const existingLog = await ctx.db
      .query("conversationLogs")
      .withIndex("by_companionId", (q) => q.eq("companionId", args.companionId))
      .first();

    if (existingLog) {
      await ctx.db.patch(existingLog._id, {
        messages: [...existingLog.messages, ...args.messages],
      });
    } else {
      await ctx.db.insert("conversationLogs", {
        companionId: args.companionId,
        userId,
        messages: args.messages,
      });
    }
  },
});

export const getConversationLog = query({
  args: { companionId: v.id("companions") },
  handler: async (ctx, args) => {
    const log = await ctx.db
      .query("conversationLogs")
      .withIndex("by_companionId", (q) => q.eq("companionId", args.companionId))
      .first();
    return log ? log.messages : [];
  },
});