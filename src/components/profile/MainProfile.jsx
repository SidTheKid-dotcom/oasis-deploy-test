"use client"

import UserPosts from "./options/UserPosts"
import UserCommunities from "./options/UserCommunities"
import UserEvents from "./options/UserEvents"
import UserSaved from "./options/UserSaved"
import FollowersCard from "./FollowersCard"

import Links from "./prompts/Links"

import ConfirmDelete from "./prompts/ConfirmDelete"

import { useState, useContext } from "react"
import axios from "axios"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Toaster } from "sonner"
import { toast } from "sonner"

const { useAuth } = require("@/context/authContext");
import { Context } from "../layout/Context";

export default function MainProfile({ userInfo, setUserInfo, loading, }) {

    const { token } = useAuth();
    const { navBarData } = useContext(Context);
    const [activeIndex, setActiveIndex] = useState(0);
    const [socialButton, setSocialButton] = useState(false);
    const [showLinks, setShowLinks] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({
        delete: false,
        postId: null,
    });

    let ConditionalComponent;

    switch (activeIndex) {
        case 0:
            ConditionalComponent = UserPosts;
            break;
        case 1:
            ConditionalComponent = UserCommunities;
            break;
        case 2:
            ConditionalComponent = UserEvents;
            break;
        case 3:
            ConditionalComponent = UserSaved;
            break;
        default:
            ConditionalComponent = null;
        // Render nothing if activeIndex is not 1, 2, or 3
    }
    const toggleFollowUser = async () => {
        try {
            if (!userInfo.amfollowing) {
                const response = await axios.post('http://3.110.161.150:4000/api/user/follow',
                    { userId: userInfo.id },
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                setUserInfo(prevState => ({
                    ...prevState,
                    amfollowing: !prevState.amfollowing,
                    followers: [...prevState.followers, response.data.self]
                }));
                toast('User followed successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-green-400',
                })
            }
            else {
                await axios.delete('http://3.110.161.150:4000/api/user/unfollow',
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                        },
                        data: {
                            userId: userInfo.id
                        }
                    }
                )
                setUserInfo(prevState => ({
                    ...prevState,
                    amfollowing: !prevState.amfollowing,
                    followers: userInfo.followers.filter(follower => follower.id !== navBarData.id)
                }));
                toast('User Unfollowed successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-red-500',
                })
            }
        }
        catch (error) {
            console.error('Error occured while following user ', error)
        }
    }

    const handleShowLinks = () => {
        setShowLinks(true);
    }

    return (
        <div className="px-5 flex flex-col min-h-[100vh] h-full text-white bg-black pixel-text">
            <Toaster />
            {/* Overlay to disable other components when Links is active */}
            {
                showLinks && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Links links={userInfo.social_links} setShowLinks={setShowLinks} />
                    </div>
                )
            }
            {
                userInfo.editable && confirmDelete.delete && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        {/* Also pass in post ID as prop, post ID is set through the UserPosts */}
                        <ConfirmDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />
                    </div>
                )
            }
            <section className="max-h-[200px] h-[25vh]">
                <div className="grid grid-cols-12 h-full">
                    <div className="col-span-2 flex flex-col justify-center items-center">
                        <div className="col-span-2 flex flex-col justify-center items-center">
                            <figure className="relative border border-white w-[80px] h-[80px] flex place-content-center rounded-full overflow-hidden">
                                <img className="w-full object-cover" src={userInfo.profile_picture || '/github.svg'}></img>
                            </figure>
                        </div>
                    </div>
                    <div className="col-span-7 mt-[-10px] p-5 flex flex-col justify-center">
                        <div className="font-bold text-3xl">
                            {userInfo.username || <Skeleton />}
                        </div>
                        <div className="text-xl">
                            u/{userInfo.username || <Skeleton />}
                        </div>
                    </div>
                    {
                        userInfo.editable ? (
                            <div className="col-span-3 flex flex-col justify-center items-center">
                                <button className="m-2 px-4 py-2 border border-solid border-slate-100 rounded-xl bg-[#323741]">Edit Profile</button>
                            </div>
                        ) : (
                            userInfo.amfollowing ? (
                                <div className="col-span-3 flex flex-col justify-center items-center text-[1rem]">
                                    <button onClick={toggleFollowUser} className="m-2 p-2 px-3 min-w-[75px] bg-blue-500 rounded-[5px]">
                                        Unfollow
                                    </button>
                                </div>
                            ) : (
                                <div className="col-span-3 flex flex-col justify-center items-center text-[1rem]">
                                    <button onClick={toggleFollowUser} className="m-2 p-2 px-3 min-w-[75px] bg-blue-500 rounded-[5px]">
                                        Follow
                                    </button>
                                </div>
                            )
                        )
                    }
                </div>
                <div></div>
            </section>
            <section>
                <div className="mx-[1.5rem]">{userInfo.bio}</div>
            </section>
            <section className="grid grid-cols-3 gap-5 items-center mx-[1.5rem] my-[0.5rem]">
                <div className="col-span-1 flex flex-row gap-2 font-extralight">
                    <img src='/calendar-days-solid.svg' width="15px"></img>
                    Date joined: Missing</div>
                <button onClick={handleShowLinks} className="col-span-1 p-2 w-[30%] flex flex-row gap-2 text-center self-center font-bold rounded-full">
                    <img src='/link-solid.svg' height="15px" width="15px" className="mt-[5px]"></img>
                    Links
                </button>
                <button onClick={() => setSocialButton(!socialButton)} className="col-span-1 border border-blue-500 rounded-md p-1  md:hidden lg:hidden">
                    Social
                </button>
            </section>
                {socialButton && (
                    <div className="relative ">
                    <FollowersCard username={userInfo.username} followers={userInfo.followers} following={userInfo.following} loading={loading}/></div>
                )}
            <section>
                <div className="flex flex-row gap-4 w-full mx-[1.35rem] my-[1rem]">
                    <ProfileButton tag={'Posts'} index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    <ProfileButton tag={'Communities'} index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    {/** 
                    <ProfileButton tag={'Events'} index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    <ProfileButton tag={'Saved'} index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    */}
                </div>
            </section>
            <section className="mx-[1.32rem]">
                {
                    ConditionalComponent && <ConditionalComponent posts={userInfo.posts} communities={userInfo.communities} events={userInfo.events} saved={userInfo.saved} editable={userInfo.editable} setConfirmDelete={setConfirmDelete} />
                }
            </section>
        </div>
    )
}

const ProfileButton = ({ tag, index, activeIndex, setActiveIndex }) => {

    const focusButton = (index) => {
        setActiveIndex(index);
    }

    return (
        <button onClick={() => focusButton(index)} className={`px-4 py-2 flex justify-center border rounded-full ${activeIndex == index ? 'bg-blue-500' : 'border-slate-500'}`}>
            {tag}
        </button>
    )
}