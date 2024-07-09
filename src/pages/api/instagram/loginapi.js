// pages/api/instagram.js
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";
import axios from "axios";

export default async function handler(req, res) {
  await dbConnect();
  console.log("req.body", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;
  console.log("Received code:", code);

  try {
    // Fetch the short-lived access token
    console.log("Sending request to Instagram API");
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: "501364205622562",
        client_secret: "483907d0684e7239ccd9cbc99f6617df",
        grant_type: "authorization_code",
        redirect_uri: "https://plugged.app/auth/signin",
        code: code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = response.data;
    console.log("Short-lived token:", access_token, user_id);

    // Exchange the short-lived token for a long-lived token
    const longLivedTokenResponse = await axios.get(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=9aa6ff4793844085505fc4338b09c7f2&access_token=${access_token}`
    );

    const { access_token: longLivedAccessToken, expires_in } =
      longLivedTokenResponse.data;
    console.log(
      "Long-lived token:",
      longLivedAccessToken,
      "Expires in:",
      expires_in
    );

    // Save user data to the database
    const user = await User.findOneAndUpdate(
      { instagramId: user_id },
      { accessToken: longLivedAccessToken, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: longLivedAccessToken });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({ error: "Failed to fetch access token" });
  }
}
