import React, { useState } from "react";
import Posts from "../global-feed/Post";

export default function CommunityPosts({ posts }) {

  const [muted, setMuted] = useState(false);

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
