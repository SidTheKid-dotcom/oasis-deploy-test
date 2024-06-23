import { useEffect, useState } from "react";
import axios from "axios";

import Posts from "../../global-feed/Post";
import Link from "next/link";

export default function UserPosts({ posts, editable }) {
  const [muted, setMuted] = useState(false);

  /* useEffect(() => {
        const updateUserPosts = async () => {
            console.log('updating user info');
            try {
                // Extract the user token from the cookie
                const token = localStorage.getItem('token');

                // Send the API request to update user posts
                const response = await axios.post('// hit like post end point', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        // userInfo: ({...prevInfo, posts: posts }));
                    }
                });

                const updatedUserPosts = response.data.posts;
                setUserInfo(prevInfo => ({ ...prevInfo, posts: updatedUserPosts }));

            } catch (error) {
                console.log("Error occurred while updating user's posts: ", error);
            }
        };

        return () => {
            // Call the function to send the API request only on unmount
            updateUserPosts();
        };
    }, []); */

  return (
    <div>
      {editable && (
        <Link href={{ pathname: "/create/post" }}>
          {/* <button className="p-2 border border-solid border-slate-400 bg-[#2a313d] font-[2rem] rounded-full">
            &nbsp;+ Create Post &nbsp;
          </button> */}
        </Link>
      )}
      <div className="mt-[1rem] w-full flex flex-col items-center overflow-hidden">
        {posts.length > 0 ? (
          <>
            {posts?.map((post) => (
              <Posts
                key={post.id}
                post={post}
                muted={muted}
                setMuted={setMuted}
                amOnProfile={editable}
              />
            ))}
          </>
        ) : (
          <>
            <div className="  flex justify-center flex-col items-center">
              <img src="/no_content.png" alt="" className=" w-1/3" />
              <p>No posts yet</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
