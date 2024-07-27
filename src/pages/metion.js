// pages/mentions.js

import { useEffect, useState } from "react";
import axios from "axios";

const Mentions = () => {
  const [mentionedMedia, setMentionedMedia] = useState([]);

  useEffect(() => {
    const fetchMentionedMedia = async () => {
      try {
        const response = await axios.get("/api/instagram/mentions");
        setMentionedMedia(response.data);
      } catch (error) {
        console.error("Error fetching mentioned media:", error);
      }
    };

    fetchMentionedMedia();
  }, []);

  return (
    <div>
      <h1>Instagram Mentions</h1>
      {mentionedMedia.length > 0 ? (
        <ul>
          {mentionedMedia.map((media) => (
            <li key={media.id}>
              <p>{media.caption}</p>
              <img src={media.media_url} alt={media.caption} width="200" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentions found.</p>
      )}
    </div>
  );
};

export default Mentions;
