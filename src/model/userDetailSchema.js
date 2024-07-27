import mongoose from "mongoose";

const countSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const InstagramUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    biography: String,
    followers_count: Number,
    follows_count: Number,
    media_count: Number,
    name: String,
    profile_picture_url: String,
    username: String,
    website: String,
    follower_counts: [countSchema],
    follows_counts: [countSchema],
    media_counts: [countSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.InstagramUser ||
  mongoose.model("InstagramUser", InstagramUserSchema);
