import { useEffect, useState } from "react";
import axios from "axios";

import Posts from "../../global-feed/Post";
import Link from 'next/link';

export default function UserPosts({ posts, setConfirmDelete, editable }) {

    const [muted, setMuted] = useState(true);

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

    const handleDeletePost = (postId) => {
        // pass in a post ID to the function
        // also take in a useState like post ID from the MainProfile and set it to this particular post's ID

        console.log(postId);

        setConfirmDelete({ delete: true, postId: parseInt(postId) });
    }

    return (
        <div>
            {editable && <Link href={{ pathname: '/create/post' }}>
                <button className="p-2 border border-solid border-slate-400 bg-[#2a313d] font-[2rem] rounded-full">+ Create Post &nbsp;</button>
            </Link>
            }
            <div className="mt-[1rem] w-full flex flex-col items-center overflow-hidden">
                {posts?.map(post => (
                    <Posts
                        key={post.id}
                        post={post}
                        muted={muted}
                        setMuted={setMuted}
                    />
                ))}
            </div>
        </div>
    )
}
