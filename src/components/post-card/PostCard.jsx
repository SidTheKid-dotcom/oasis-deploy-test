import React, { useContext } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import Link from "next/link";

import { formatDistanceToNow } from 'date-fns';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";

import { Toaster, toast } from "sonner";
import debounce from "lodash/debounce";
import ReactMarkdown from 'react-markdown';


const PostCard = ({ post, setPost, totalComments }) => {
  const { token, navBarData } = useAuth();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullBody, setShowFullBody] = useState(false);
  
  const [toastVisible, setToastVisible] = useState(false);

  const toggleFollowUser = debounce(async () => {
    try {
      await axios.post(
        "https://oasis-api.xyz/api/user/follow",
        { userId: post.user.id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setPost((prevPost) => ({
        ...prevPost,
        isFollowing: true,
      }));
      toast("User Followed Successfully", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-green-400",
      });
    } catch (error) {
      console.error("Error occired while following user ", error);
    }
  }, 300);

  const togglePostLike = debounce(async () => {
    try {
      if (!post.isLiked) {
        await axios.post(
          "https://oasis-api.xyz/api/post/like",
          { postId: parseInt(postId) },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        setPost((prevPost) => ({
          ...prevPost,
          no_of_likes: prevPost.no_of_likes + 1,
          isLiked: true, // Correcting the state update
        }));
        toast("Post Liked Successfully", {
          position: "top-right",
          className:
            "bg-black text-white pixel-text border border-solid border-green-400",
        });
      } else {
        await axios.delete("https://oasis-api.xyz/api/post/unlike", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: {
            postId: parseInt(postId),
          },
        });
        setPost((prevPost) => ({
          ...prevPost,
          no_of_likes: prevPost.no_of_likes - 1,
          isLiked: false, // Correcting the state update
        }));
        toast("Post Unliked Successfully", {
          position: "top-right",
          className:
            "bg-black text-white pixel-text border border-solid border-red-500",
        });
      }
    } catch (error) {
      console.log("Error occurred while toggling post like: ", error);
    }
  }, 300);

  const copyPostLink = async () => {
    console.log(post);
    await navigator.clipboard.writeText(`https://oasissocial.in/post-card?postId=${post.id}`);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1500); // Hide toast after 1.5 seconds
  };


  return (
    <div>
      <Toaster />
      <div className="px-[1rem] md:px-[2rem] text-white flex flex-col w-full min-h-[100px] bg-black pixel-text ">
        <section>
          <div className="mt-[1rem] grid grid-cols-12 items-center">
            <div className="col-span-2 rounded-full overflow-hidden w-[50px] h-[50px] border border-solid border-white">
              <figure className="w-full h-full">
                {post.user.profile_picture ? (
                  <img
                    src={post.user.profile_picture}
                    className="w-full h-full object-cover"
                    alt="Profile Picture"
                  ></img>
                ) : (
                  <img
                    src="/github.svg"
                    className="w-full h-full object-cover"
                    alt="Profile Picture"
                  ></img>
                )}
              </figure>
            </div>
            <div className="col-span-6 text-md flex flex-col justify-center">
              <Link href={`/profile/${post.user.id}`}>
                <div className="font-bold">{post.user.username}</div>
              </Link>
              <Link href={`/community/${post.community.id}`}>
                <div className="text-[0.65rem]">
                  <i>@{post.community.name}</i>
                </div>
              </Link>
              <i className='text-gray-400 text-[0.65rem]'>&bull; {formatDistanceToNow(post.created_at, { addSuffix: true })}</i>
            </div>
            <div className="col-span-3 flex flex-col items-center text-[1rem]">
              {!post.isFollowing && post.user.id !== navBarData.id && (
                <button
                  onClick={toggleFollowUser}
                  className="m-2 p-2 px-3 min-w-[75px] bg-blue-500 rounded-[5px]"
                >
                  Follow
                </button>
              )}
            </div>
            <div className="col-span-1 flex flex-row justify-end"></div>
          </div>
        </section>
        <section className="my-[10px] open-sans flex flex-col gap-2">
          <div className="text-[1rem] post-card break-word">
            {post.title.length > 40 ? (
              !showFullTitle ? (
                <>
                  <ReactMarkdown>{post.title.slice(0, 40)}</ReactMarkdown>
                  ...
                  <button onClick={() => setShowFullTitle(true)} className="text-blue-500 underline">
                    Read More
                  </button>
                </>
              ) : (
                <>
                  <ReactMarkdown>{post.title}</ReactMarkdown>
                  <button onClick={() => setShowFullTitle(false)} className="text-blue-500 underline">
                    Show Less
                  </button>
                </>

              )
            ) : (
              <ReactMarkdown>{post.title}</ReactMarkdown>
            )}
          </div>
          <div className="text-[0.75rem] post-card break-word">
            {post.body.length > 1000 ? (
              !showFullBody ? (
                <>
                  <ReactMarkdown>{post.body.slice(0, 1000)}</ReactMarkdown>...
                  <button onClick={() => setShowFullBody(true)} className="text-blue-500 underline">
                    Read More
                  </button>
                </>
              ) : (
                <>
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                  <button onClick={() => setShowFullBody(false)} className="text-blue-500 underline">
                    Show Less
                  </button>
                </>

              )
            ) : (
              <ReactMarkdown>{post.body}</ReactMarkdown>
            )}
          </div>
        </section>
        <section>
          {post.media_type ? (
            <div className="rounded-[10px] w-full min-h-[50px] overflow-hidden">
              {post.media_type === "video" ? (
                <div className="relative flex justify-center items-center bg-[#22272b] rounded-lg h-[400px] lg:h-[300px] pb-[56.25%]">
                  <ReactPlayer
                    id="post-video-player"
                    className="absolute top-0 left-0 w-full h-full"
                    controls
                    url={post.media}
                    muted={false}
                    playing={true}
                    loop={true}
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <div className="relative flex justify-center items-center bg-[#22272b] rounded-lg h-[400px] lg:h-[300px] pb-[56.25%]">
                  <figure className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img
                      src={post.media}
                      className="object-contain max-w-full max-h-full"
                      alt="Post Media"
                    />
                  </figure>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          )}
        </section>
        <section className="mt-[20px] mb-[10px] w-full flex flex-row justify-between">
          <div className="flex flex-row gap-6">
            <button
              onClick={togglePostLike}
              className="flex flex-col items-center"
            >
              <figure>
                <img
                  src={post.isLiked ? "/heart-solid.svg" : "/heart-regular.svg"}
                  width="25px"
                ></img>
              </figure>
              <figcaption>{post.no_of_likes}</figcaption>
            </button>
            <div className="flex flex-col ">
              <figure>
                <img src="/comment-regular.svg" width="25px"></img>
              </figure>
              <figcaption>{totalComments}</figcaption>
            </div>
          </div>
          <div className="relative">
            <button
              className="flex flex-col items-center"
              onClick={copyPostLink}
            >
              <figure>
                <img
                  src="/share (1).svg"
                  width="25px"
                  alt="Share Icon"
                />
              </figure>
              <figcaption>Share</figcaption>
            </button>
            {toastVisible && (
              <div className="absolute text-xs top-[-3rem] right-0 p-2 bg-gray-800 text-white rounded-lg shadow-lg">
                Link copied!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostCard;
