"use client";
import { HiUsers } from "react-icons/hi";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import CommunityPosts from "@/components/community/CommunityPosts";
import axios from "axios";
import { format } from "date-fns";
export default function Page({ params }) {
  const [community, setCommunity] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const { token } = useAuth();

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleFollowToggle = async () => {
    try {
      if (!isFollowing) {
        const response = await axios.post(
          "https://oasis-api.xyz/api/community/subscribe",
          {
            community_id: params.id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setIsFollowing(true);
        toast("Subscription added", {
          position: "top-right",
          className:
            "bg-black text-white pixel-text border border-solid border-green-400",
        });
        setCommunity((prevCommunity) => ({
          ...prevCommunity,
          isSubscribed: true,
        }));
      } else {
        const response = await axios.delete(
          "https://oasis-api.xyz/api/community/unsubscribe",
          {
            headers: {
              Authorization: token,
            },
            data: {
              community_id: params.id,
            },
          }
        );
        setIsFollowing(false);
        toast("Unsubscribed Community", {
          position: "top-right",
          className:
            "bg-black text-white pixel-text border border-solid border-red-400",
        });
        setCommunity((prevCommunity) => ({
          ...prevCommunity,
          isSubscribed: false,
        }));
      }
    } catch (error) {
      console.error("Error during follow toggle:", error);
    }
  };

  const getCommunity = async (id) => {
    try {
      const response = await axios.get(
        `https://oasis-api.xyz/api/community?id=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = response.data;
      setCommunity(responseData);
      setIsFollowing(responseData.isSubscribed);
    } catch (error) {
      console.error("Error fetching community data:", error);
    }
  };

  useEffect(() => {
    getCommunity(params.id);
  }, [params.id, isFollowing]);

  return (
    <div className="md:mt-5 mt-4 md:w-[67%] md:mx-auto bg-black bg-opacity-80 md:bg-none md:bg-opacity-0 mx-3 mt-10 sm:mt-0  ">
      <Toaster />
      <div className="p-6">
        {community && (
          <div className="relative">
            <div className="cursor-pointer">
              {community.banner === "" ? (
                <img
                  src="/default_community_banner.png"
                  alt=""
                  className="h-48 md:h-[270px] w-full bg-black"
                />
              ) : (
                <img
                  src={community.banner}
                  alt=""
                  className="h-48 md:h-[270px] w-full object-cover"
                />
              )}
            </div>
            <div className="flex justify-center cursor-pointer">
              {community.icon === "" ? (
                <img
                  src="/default_community_profile.png"
                  alt=""
                  className="rounded-full h-20 w-20 md:h-28 md:w-28 z-20 absolute mt-[-9%]    bg-black"
                />
              ) : (
                <img
                  src={community.icon}
                  alt=""
                  className="rounded-full h-20 w-20 md:h-28 md:w-28 z-20 absolute mt-[-9%] bg-black"
                />
              )}
            </div>
            <div className="flex justify-between mt-14 text-lg ">
              <p className="font-bold text-[#00B2FF]  md:text-xl pixel-text">
                {community.name}
              </p>
              <div className="flex my-auto ml-3">
                <div className="my-auto">
                  <HiUsers color="white" fill="white" fontSize="20px" />
                </div>
                <p className="text-white text-sm font-medium ml-1 pixel-text text-2xl">
                  {community.no_of_subscribers}
                </p>
              </div>
            </div>
            <p className=" text-white my-auto mr-1 pixel-text text-xs  md:text-sm mt-4">
              Created By{" "}
            </p>
            <div className=" flex justify-between">
              <div>
                <Link href={`/profile/${community.creator.id}`}>
                  <div className=" flex my-2">
                    <img
                      src={community.creator.profile_picture}
                      alt=""
                      className="  mr-2 my-auto rounded-full h-10 w-10"
                    />
                    <p className=" text-white my-auto  text-base">
                      {community.creator.username}
                    </p>
                  </div>
                </Link>
              </div>
              <p className=" text-white my-auto  text-[10px] md:text-xs">
                {format(new Date(community.created_at), "MMMM d, yyyy h:mm a")}
              </p>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <div className="flex">
                <div>
                  <Link
                    href={{
                      pathname: "/create/post",
                      query: {
                        communityId: community.id,
                        communityName: community.name,
                      },
                    }}
                  >
                    {(community.amcreator || isFollowing) && (
                      <button className="border-[1.5px] rounded-md p-1 mr-1 md:p-2 my-auto text-white  text-[0.5rem] border-[#767676] md:text-md pixel-text">
                        Create Post
                      </button>
                    )}
                  </Link>
                </div>

                <p
                  className={`text-white rounded-md my-auto md:p-2 border-[#767676] border-[1.5px] p-1  px-1 py-2 md:px-2 text-[0.5rem] md:text-[11px] text-center cursor-pointer pixel-text ${
                    isFollowing ? "" : " bg-blue-500"
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unsubscribe" : "Subscribe"}
                </p>

                {community.amcreator && (
                  <div className="my-auto">
                    <Link href={`/EditCommunity/${community.id}`}>
                      <div className="flex ml-2">
                        <p className="my-auto text-white pixel-text text-xs md:text-md">
                          Edit
                        </p>
                        <MdEdit
                          color="#00b2ff"
                          size={20}
                          className="my-auto ml-1"
                        />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <p className="text-[#828282] text-sm pixel-text my-auto">
                {community.type}
              </p>
            </div>
          </div>
        )}

        {community && community.description.length > 200 ? (
          <>
            {showFullDescription ? (
              <>
                <p className=" text-white   mt-4 text-xs md:text-base open-sans">
                  {community.description}
                </p>

                <button
                  onClick={toggleDescription}
                  className={`text-blue-500 underline ${
                    community.posts.length > 0 ? "mb-0" : " mb-80"
                  }`}
                >
                  Read Less
                </button>
              </>
            ) : (
              <>
                <p className="text-white  mt-4 text-xs md:text-base open-sans">
                  {community.description.slice(0, 200)}...
                </p>

                <button
                  onClick={toggleDescription}
                  className="text-blue-500 underline"
                >
                  Read More
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <p className=" text-white  mt-4 text-xs md:text-base open-sans">
              {community && community.description}
            </p>
          </>
        )}

        {/* <div className="text-white my-4 text-xs md:text-base open-sans">
          {community && <p>{community.description}</p>}
        </div> */}
      </div>
      {community && community.posts.length > 0 && (
        <div className=" mt-4">
          <CommunityPosts posts={community.posts} />
        </div>
      )}
    </div>
  );
}
