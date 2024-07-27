import mongoose from "mongoose";

const InstagramSearchUserSchema = new mongoose.Schema({
  biography: String,
  followers_count: {
    type: Number,
    min: 0,
  },
  follows_count: {
    type: Number,
    min: 0,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  media_count: {
    type: Number,
    min: 0,
  },
  name: String,
  profile_picture_url: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  website: String,
});

export default mongoose.models.InstagramSearchUser ||
  mongoose.model("InstagramSearchUser", InstagramSearchUserSchema);
