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

  useEffect(() => {
    // Log cookies to the console
    console.log('Cookies:', document.cookie);
    console.log('Access Token:', Cookies.get('accessToken'));
  }, []);

  // console.log("session", session);
  // const token = Cookies.get("accessToken");
  // const token1 = Cookies.get("__stripe_mid");
  // const token2 = Cookies.get("next-auth.callback-url");
  // const token3 = Cookies.get("next-auth.csrf-token");
  // const token4 = Cookies.get("next-auth.state");

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
    </>
  );
}
