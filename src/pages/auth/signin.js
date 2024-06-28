"useClient";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { code } = router.query;
  console.log(status, session);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
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

      console.log("response", response.data);
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

  console.log(status, session);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log in with Instagram
        </button>
      </div>
    </div>
  );
}
