// pages/api/instagram.js
import User from "@/model/instagramModel";
import dbConnect from "@/utils/dbconnect";
import axios from "axios";
import { getServerSession, signIn } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();
  console.log("req.body", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;
  console.log("Received code:", code);

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
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = response.data;
    console.log("response", access_token);
    const userProfileResponse = await axios.get(
      `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`
    );

    const userData = userProfileResponse.data;

    // Save user data to the database
    const user = await User.findOneAndUpdate(
      { instagramId: user_id },
      { username: userData.username, accessToken: access_token },
      { new: true, upsert: true }
    );
    console.log(userData);

    // // Get session
    // const session = await getServerSession({ req });

    // if (session) {
    //   res.redirect("/");
    //   return;
    // }

    // // Create session for the user if no session exists
    // await signIn("credentials", { redirect: false, user_id });

    return res.status(200).json({ success: "success" });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message
    );
    return res.status(500).json({ error: "Failed to fetch access token" });
  }
}
