"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Posts from "../../components/global-feed/Post";

export default function GlobalFeed() {
  const [posts, setPosts] = useState([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://oasis-api.xyz/feed/global");
        setPosts(response.data);
      } catch (error) {
        console.warn("Error occurred in fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center overflow-hidden mb-[100%] md:mb-0 ">
      {posts.map((post) => (
        <Posts key={post.id} post={post} muted={muted} setMuted={setMuted} amOnProfile={false} />
      ))}
    </div>
  );
}
