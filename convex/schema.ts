import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  companions: defineTable({
    userId: v.id("users"),
    name: v.string(),
    subject: v.string(),
    topic: v.string(),
    voiceType: v.string(),
    speakingStyle: v.string(),
    duration: v.optional(v.number()),
  }).index("by_userId", ["userId"]),
  conversationLogs: defineTable({
    companionId: v.id("companions"),
    userId: v.id("users"),
    messages: v.array(
      v.object({
        speaker: v.string(),
        text: v.string(),
        timestamp: v.number(),
      })
    ),
  }).index("by_companionId", ["companionId"]),
});

export default schema;