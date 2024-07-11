// pages/index.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cookies = new Cookies();

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

  useEffect(() => {
    const accessToken = cookies.get("accessToken");
    console.log("Access Token", accessToken);

    if (!accessToken) {
      router.push("/auth/signin");
    } else {
      fetchInstagramData();
    }
  }, []);

  return (
    <>
      <h1>Rashid</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </>
  );
}
