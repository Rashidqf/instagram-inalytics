import searchUser from "@/model/searchUser";
import InstagramUser from "@/model/userDetailSchema";
import dbConnect from "@/utils/dbconnect";
const ACCESSTOKEN = process.env.ACCESSTOKEN;
const BUISENESSID = process.env.BUISENESSID;
import axios from "axios";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const users = await searchUser.find({}, "username");
      const usernames = users.map((user) => user.username);

      for (const username of usernames) {
        try {
          const response = await axios.get(
            `https://graph.facebook.com/${BUISENESSID}?fields=business_discovery.username(${username}){followers_count,media_count,id,website,biography,profile_picture_url,follows_count,name,username}&access_token=${ACCESSTOKEN}`
          );

          const userData = response.data.business_discovery;

          let user = await InstagramUser.findOne({ id: userData.id });
          if (user) {
            console.log("User found, updating existing user...");
            user.biography = userData.biography;
            user.followers_count = userData.followers_count;
            user.follows_count = userData.follows_count;
            user.media_count = userData.media_count;
            user.name = userData.name;
            user.profile_picture_url = userData.profile_picture_url;
            user.username = userData.username;
            user.website = userData.website;
          } else {
            console.log("User not found, creating new user...");
            user = new InstagramUser(userData);
          }
          console.log(user);

          const now = new Date();
          user.follower_counts.push({
            count: userData.followers_count,
            date: now,
          });
          user.follows_counts.push({
            count: userData.follows_count,
            date: now,
          });
          user.media_counts.push({ count: userData.media_count, date: now });

          await user.save();
          console.log("User saved successfully.");
        } catch (error) {
          console.error(`Error fetching data for username: ${username}`, error);
        }
      }

      res.status(200).json({ success: usernames });
    } catch (error) {
      console.error("Error during processing:", error);
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
}
