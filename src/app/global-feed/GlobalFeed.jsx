"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Posts from "../../components/global-feed/Post";
import Banner from "./Banner";

export default function GlobalFeed() {
  const [posts, setPosts] = useState([]);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  /* const bannerData = [
    { image: "https://res.cloudinary.com/dzhpx2alw/image/upload/v1723822149/WhatsApp_Image_2024-08-16_at_20.58.12_4cfc7471_b7zsb2.jpg" }, { image: "https://res.cloudinary.com/dzhpx2alw/image/upload/v1723822149/WhatsApp_Image_2024-08-16_at_20.58.12_875c8379_gpi6pv.jpg", link: "www.example.com" }]
 */
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://oasis-api.xyz/feed/global");
        setPosts(response.data);
      } catch (error) {
        console.warn("Error occurred in fetching posts: ", error);
      }
    };
    const fetchBanner = async () => {
      try {
        const response = await axios.get("https://oasis-api.xyz/banner");
        setBannerData(response.data);
      } catch (error) {
        console.warn("Error occurred in fetching banner: ", error);
      }
    };

    fetchPosts();
    fetchBanner();
  }, []);

  return (
    <div className="bg-black bg-opacity-80 rounded-lg w-full flex flex-col items-center overflow-hidden mb-[100%] md:mb-0 ">
      <Banner banners={bannerData} />
      {posts.map((post) => (
        <Posts
          key={post.id}
          post={post}
          muted={muted}
          setMuted={setMuted}
          volume={volume}
          setVolume={setVolume}
          amOnProfile={false} />
      ))}
    </div>
  );
}
