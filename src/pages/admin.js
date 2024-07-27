import { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/instagram/mentions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: ["selenagomez"],
          resultsLimit: 5,
        }),
      });

      const result = await response.json();
      console.log("result", result);

      if (response.ok) {
        setData(result.data);
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Instagram Tagged Scraper</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
