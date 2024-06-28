import axios from "axios";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState();
  const { code } = router.query;

  const handleLogin = async () => {
    window.location.href =
      "https://api.instagram.com/oauth/authorize?client_id=1175082610605703&redirect_uri=https://plugged.app/auth/signin&scope=user_profile,user_media&response_type=code";
  };

  const fetchData = async (code) => {
    setLoading(true);
    setError(null);

    try {
      if (code) {
        const response = await axios.post(
          "/api/instagram/loginapi",
          { code },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        setUserData(data.user);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(code);
  }, [code]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="insta-default">
          <button
            onClick={handleLogin}
            className="insta-default bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Log in with Instagram <i className="fa fa-instagram ml-2"></i>
          </button>
        </div>
      </div>
    </>
  );
}
