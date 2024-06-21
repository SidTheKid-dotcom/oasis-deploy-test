import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { Toaster, toast } from 'sonner';
import debounce from 'lodash/debounce';
import { formatDistanceToNow } from 'date-fns';

import ConfirmDelete from '../profile/prompts/ConfirmDelete';

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
    volume,
    setVolume,
    playerRef,
    amOnProfile,
}) {
    const { token, navBarData } = useAuth();
    const [toastRendered, setToastRendered] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({ delete: false, postId: 0 });

    //const toggleMute = () => setMuted(prevMuted => !prevMuted);

    useEffect(() => {
        const volumeInitializer = () => {
            const player = playerRef.current?.getInternalPlayer();

            console.log('yolo ', post.id, ' ', loadMedia, ' ', player);

            const handleVolumeChange = () => {
                if (player?.muted || player?.volume === 0) {
                    setMuted(true);
                } else {
                    setMuted(false);
                    setVolume(player?.volume);
                }
            };

            player?.addEventListener('volumechange', handleVolumeChange);

            // Cleanup the event listener on component unmount
            return () => {
                player?.removeEventListener('volumechange', handleVolumeChange);
            };
        };

        setTimeout(volumeInitializer, 1000);

    }, [loadMedia]);

    const renderMedia = () => {
        if (!loadMedia || !post.media_type) return <div className="w-full h-full bg-gray-300 animate-pulse" />;

        if (post.media_type === 'video') {
            return (
                <div>
                    <div>
                        {/* <button onClick={e => e.stopPropagation() || toggleMute()} className='pixel-text'>
                            {muted ? 'Unmute' : 'Mute'}
                        </button> */}
                    </div>
                    <div className="relative flex justify-center items-center bg-[#22272b] rounded-lg h-[400px] lg:h-[300px] pb-[56.25%]">
                        <ReactPlayer
                            id="post-video-player"
                            className="absolute top-0 left-0 w-full h-full"
                            controls
                            url={post.media}
                            volume={volume}
                            muted={muted}
                            playing={isActive}
                            loop={true}
                            width="100%"
                            height="100%"
                            ref={playerRef}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="relative flex justify-center items-center bg-[#22272b] rounded-lg h-[400px] lg:h-[300px] pb-[56.25%]">
                <figure className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <img src={post.media} className="object-contain max-w-full max-h-full" alt="Post Media" />
                </figure>
            </div>
        );
    };

    const handleToast = (message, className) => {
        if (!toastRendered) {
            setToastRendered(true);
            toast(message, {
                position: 'top-right',
                className: className,
            });
            setTimeout(() => setToastRendered(false), 1000);
        }
    };

    const toggleFollowUser = debounce(async () => {
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
            handleToast('User Followed Successfully', 'bg-black text-white pixel-text border border-solid border-green-400');
        } catch (error) {
            console.error('Error occurred while following user ', error);
        }
    }, 300);

    const togglePostLike = debounce(async () => {
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
                setLikes(prevLikes => prevLikes - 1);
                setLikedState(false);
            }
        } catch (error) {
            console.log('Error occurred while toggling post like: ', error);
        }
    }, 300);

    const handleDeletePost = async () => {
        setConfirmDelete({
            delete: true,
            postId: post.id
        })
    };

    return (
        <div className="lazy-post-card w-full">
            <Toaster />
            {
                confirmDelete.delete && (
                    <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                        <ConfirmDelete
                            postId={confirmDelete.postId}
                            setConfirmDelete={setConfirmDelete}
                        />
                    </div>
                )
            }
            <div className="py-[1rem] px-[1rem] my-[0.5rem] rounded-lg bg-black text-white flex flex-col min-h-[100px] border border-solid border-slate-600">
                <section>
                    <div className="my-[0.5rem] grid grid-cols-12 items-center">
                        <div className="col-span-2 rounded-full overflow-hidden w-[40px] h-[40px] md:w-[50px] md:h-[50px] border border-solid border-white">
                            <figure className="w-full h-full">
                                <img
                                    src={loadMedia ? post.user.profile_picture || '/github.svg' : '/github.svg'}
                                    className="w-full h-full object-cover"
                                    alt="Profile Picture"
                                />
                            </figure>
                        </div>
                        <div className="col-span-8 text-md flex flex-col justify-center pixel-text">
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
                        <div className="col-span-1 flex flex-col items-center text-[0.8rem] md:text-[1rem]">
                            {!followingState && post.user.id !== navBarData.id && (
                                <button onClick={toggleFollowUser} className=" p-2 px-3 w-[80px] md:w-[100px] bg-blue-500 rounded-[5px] pixel-text">
                                    Follow
                                </button>
                            )}
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-end text-[0.8rem] md:text-[1rem]">
                            {
                                amOnProfile && (<button onClick={handleDeletePost} className=" p-2 px-3 w-[50px] bg-red-400 rounded-[5px] pixel-text flex flex-col justify-center items-center">
                                    <img src='/trash-solid.svg' width='15px'></img>
                                </button>
                                )
                            }
                        </div>
                    </div>
                </section>
                <section className="my-[10px] open-sans flex flex-col gap-2">
                    <div className="text-[1rem] break-words">
                        {post.title.length > 40 ? (
                            <>
                                {post.title.slice(0, 40)}...
                            </>
                        ) : (
                            post.title
                        )}
                    </div>
                    <div className="text-[0.75rem] break-words post-card">
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
                <section className="mt-[20px] mb-[10px] w-full pixel-text">
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
