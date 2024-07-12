// pages/index.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("session", session);
  const token = Cookies.get("accessToken");
  const token1 = Cookies.get("__stripe_mid");
  const token2 = Cookies.get("next-auth.callback-url");
  const token3 = Cookies.get("next-auth.csrf-token");
  const token4 = Cookies.get("next-auth.state");

  console.log("cookies", token, token1, token2, token3, token4);

  const fetchInstagramData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/instagram/basicapi");
      setData(response.data);
      console.log(response);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const signin = async () => {
  //   const response = axios.get("https://api.instagram.com/oauth/authorize", {
  //     client_id: "1175082610605703",
  //     clientId: "1175082610605703",
  //     clientSecret: "9aa6ff4793844085505fc4338b09c7f2",
  //     redirect_uri: "9aa6ff4793844085505fc4338b09c7f2",
  //     response_type: "code",
  //     scope: "user_profile,user_media",
  //   });
  //   console.log(response);
  // };

  const signin = () => {
    const clientId = "1175082610605703";
    const redirectUri = "https://plugged.app/auth/signin";
    const responseType = "code";
    const scope = "user_profile,user_media";

    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <>
      <button onClick={signin}>Login with instagram</button>
      <h1>Rashid</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </>
  );
}
