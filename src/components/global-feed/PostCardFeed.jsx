import { useState, useContext } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { Toaster, toast } from 'sonner';

export default function PostCardFeed({
    loadMedia,
    likedState,
    setLikedState,
    followingState,
    setFollowingState,
    likes,
    setLikes,
    comments,
    post,
    isActive,
    muted,
    setMuted,
    playerRef,
}) {
    const { token, navBarData } = useAuth();

    const toggleMute = () => setMuted(prevMuted => !prevMuted);

    const renderMedia = () => {
        if (!loadMedia || !post.media_type) return <div className="w-full h-full bg-gray-300 animate-pulse" />;

        if (post.media_type === 'video') {
            return (
                <div>
                    <div>
                        <button onClick={e => e.stopPropagation() || toggleMute()}>
                            {muted ? 'Unmute' : 'Mute'}
                        </button>
                    </div>
                    <div className="relative flex justify-center items-center bg-black h-0 pb-[56.25%]">
                        <ReactPlayer
                            id="post-video-player"
                            className="absolute top-0 left-0 w-full h-full"
                            controls
                            url={post.media}
                            muted={muted}
                            playing={isActive}
                            width="100%"
                            height="100%"
                            ref={playerRef}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="relative flex justify-center items-center bg-black h-0 pb-[56.25%]">
                <figure className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img src={post.media} className="object-contain max-w-full max-h-full" alt="Post Media" />
                </figure>
            </div>
        );
    };

    const toggleFollowUser = async () => {
        try {
            await axios.post('https://oasis-api.xyz/api/user/follow',
                { userId: post.user.id },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setFollowingState(prevState => !prevState);
            toast('User Followed Successfully', {
                position: 'top-right',
                className: 'bg-black text-white pixel-text border border-solid border-green-400',
            });
        } catch (error) {
            console.error('Error occurred while following user ', error);
        }
    };

    const togglePostLike = async () => {
        try {
            if (!likedState) {
                await axios.post(
                    'https://oasis-api.xyz/api/post/like',
                    { postId: post.id },
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                toast('Post Liked Successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-green-400',
                });
                setLikes(prevLikes => prevLikes + 1);
                setLikedState(true);
            } else {
                await axios.delete(
                    'https://oasis-api.xyz/api/post/unlike',
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                        data: {
                            postId: post.id
                        },
                    }
                );
                toast('Post Unliked Successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-red-500',
                });
                setLikes(prevLikes => prevLikes - 1);
                setLikedState(false);
            }
        } catch (error) {
            console.log('Error occurred while toggling post like: ', error);
        }
    };

    return (
        <div className="lazy-post-card w-full pixel-text">
            <Toaster />
            <div className="px-[0.2rem] md:py-[1rem] md:px-[2rem] text-white flex flex-col min-h-[100px] border-y border-blue-500">
                <section>
                    <div className="mt-[1rem] grid grid-cols-12 items-center">
                        <div className="col-span-2 rounded-full overflow-hidden w-[40px] h-[40px] md:w-[50px] md:h-[50px] border border-solid border-white">
                            <figure className="w-full h-full">
                                <img
                                    src={loadMedia ? post.user.profile_picture || '/github.svg' : '/github.svg'}
                                    className="w-full h-full object-cover"
                                    alt="Profile Picture"
                                />
                            </figure>
                        </div>
                        <div className="col-span-6 text-md flex flex-col justify-center">
                            <Link href={`/profile/${post.user.id}`}>
                                <div className="font-bold">{post.user.username}</div>
                            </Link>
                            <Link href={`/community/${post.community.id}`}>
                                <div className="text-sm">
                                    <i>@{post.community.name}</i>
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-3 flex flex-col items-center text-[0.8rem] md:text-[1rem]">
                            {!followingState && post.user.id !== navBarData.id && (
                                <button onClick={toggleFollowUser} className=" p-2 px-3 w-[80px] md:w-[100px] bg-blue-500 rounded-[5px]">
                                    Follow
                                </button>
                            )}
                        </div>
                        <div className="col-span-1 flex flex-row justify-end">
                        </div>
                    </div>
                </section>
                <section className="my-[10px]">
                    <div className="text-[0.75rem]">{post.title}</div>
                    <div className="text-[0.75rem]">
                        {post.body.length > 200 ? (
                            <>
                                {post.body.slice(0, 200)}...
                                <Link href={`/post-card?postId=${post.id}`}>
                                    <button className="text-blue-500 underline">
                                        Read More
                                    </button>
                                </Link>
                            </>
                        ) : (
                            post.body
                        )}
                    </div>
                </section>
                <section>{renderMedia()}</section>
                <section className="mt-[20px] mb-[10px] w-full">
                    <div className="flex flex-row gap-6">
                        <button onClick={togglePostLike} className="flex flex-col items-center">
                            <figure>
                                <img src={likedState ? '/heart-solid.svg' : '/heart-regular.svg'} width="25px" alt="Heart Icon" />
                            </figure>
                            <figcaption>{likes}</figcaption>
                        </button>
                        <div className="flex flex-col">
                            <Link href={{ pathname: '/post-card', query: { postId: post.id } }}>
                                <button>
                                    <figure>
                                        <img src="/comment-regular.svg" width="25px" alt="Comment Icon" />
                                    </figure>
                                    <figcaption>{comments}</figcaption>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}