import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    instagramId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Competitor", "Influencer"],
    },
    subscription: {
      status: {
        type: String,
        enum: ["trial", "active", "expired"],
        default: "trial",
      },
      plan: { type: String },
      startedAt: { type: Date },
      expiresAt: { type: Date },
    },
    payment: {
      paymentMethod: { type: String },
      status: { type: String, enum: ["pending", "success", "failed"] },
      webhookEvent: { type: String },
      webhookStatus: { type: String },
      webhookTimestamp: { type: Date },
      checkoutSessionId: { type: String },
      paymentIntentId: { type: String },
      amountTotal: { type: Number },
      currency: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
