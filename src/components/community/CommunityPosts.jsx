import React from "react";
import Posts from "../global-feed/Post";

export default function CommunityPosts({ posts, muted, setMuted }) {
  return (
    <>
      <div className="w-full flex flex-col items-center overflow-hidden">
        {posts.map((post) => (
          <Posts key={post.id} post={post} muted={muted} setMuted={setMuted} />
        ))}
      </div>
    </>
  );
}
