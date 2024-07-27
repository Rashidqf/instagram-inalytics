import axios from "axios";

export default async function handler(req, res) {
  const { igUserId, accessToken } = req.query;
  console.log(igUserId, accessToken);

  if (!igUserId || !accessToken) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const apiUrl = `https://graph.facebook.com/v20.0/${igUserId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${accessToken}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Instagram insights:", error.message);
    res.status(500).json({ error: "Failed to fetch Instagram insights" });
  }
}
