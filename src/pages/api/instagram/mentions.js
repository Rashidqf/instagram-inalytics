import InstagramUser from "@/model/userDetailSchema";
import dbConnect from "@/utils/dbconnect";
import { ApifyClient } from "apify-client";

export default async function handler(req, res) {
  dbConnect();
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Only POST requests are allowed" });
  }

  try {
    const { username, resultsLimit } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ success: false, error: "Username is required" });
    }

    // Initialize ApifyClient
    const client = new ApifyClient({
      token: process.env.APIFY_API_TOKEN,
    });

    // Prepare Actor input
    const input = {
      username: username,
      resultsLimit: resultsLimit || 5,
    };

    // Run the Actor and wait for it to finish
    const run = await client
      .actor("apify/instagram-tagged-scraper")
      .call(input);

    // Fetch Actor results from the run's dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (items.length === 0) {
      return res.status(404).json({ success: false, error: "No items found" });
    }

    let user = await InstagramUser.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Prepare the user follower counts
    const followerCounts = user.follower_counts.map((countObj) => ({
      count: countObj.count,
      createdAt: new Date(countObj.createdAt),
    }));

    // Add user data to each item
    items.forEach((item) => {
      const itemTimestamp = new Date(item.timestamp);

      // Filter follower counts based on the timestamp of the current item
      const filteredFollowerCounts = followerCounts.filter(
        (countObj) => countObj.createdAt > itemTimestamp
      );

      item.userData = {
        username: user.username,
        name: user.name,
        profile_picture_url: user.profile_picture_url,
        followers_count: filteredFollowerCounts,
        follows_count: user.follows_counts,
        media_count: user.media_counts,
      };
    });

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
