// pages/api/instagram.js
import axios from "axios";

export default async function handler(req, res) {
  console.log("Received request");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;
  console.log("Received code:", code);

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    console.log("Sending request to Instagram API");
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: "1175082610605703",
        client_secret: "9aa6ff4793844085505fc4338b09c7f2",
        grant_type: "authorization_code",
        redirect_uri: "https://plugged.app/auth/signin",
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = response.data;
    console.log("response", access_token);
    // const userProfileResponse = await axios.get(
    //   `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
    // );

    // const userData = userProfileResponse.data;

    return res.status(200).json({ success: "success" });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({ error: "Failed to fetch access token" });
  }
}
