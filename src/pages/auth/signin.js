"useClient";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { code } = router.query;
  const cookies = new Cookies();

  useEffect(() => {
    const accessToken = cookies.get("accessToken");

    if (!accessToken) {
      router.push("/login"); // Redirect to login page if accessToken cookie is not present
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      console.log(status);
      router.push("/admin"); // Redirect to admin page if authenticated
    }
  }, [status, router]);

  useEffect(() => {
    if (code) {
      fetchData(code);
    }
  }, [code]);

  const fetchData = async (code) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/instagram/loginapi",
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        router.push("/admin"); // Redirect to admin page on success
      } else {
        setError("Failed to authenticate with Instagram");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    signIn("instagram");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log in with Instagram
        </button>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
