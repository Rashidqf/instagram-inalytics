"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoginPage from "@/component/buttonLogin";
import Cookies from "universal-cookie";
import { getFacebookProfile } from "./api/instagram/test";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
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
      // router.push("/auth/signin");
      console.log(accessToken);
    }
  }, []);

  useEffect(() => {
    fetchInstagramData();
  }, []);

  return (
    <>
      <h1>Rashid</h1>
    </>
  );
}
