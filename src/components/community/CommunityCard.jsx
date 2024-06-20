"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { useAuth } from "@/context/authContext";
import { Toaster, toast } from "sonner";
export default function ComunityCard({
  key,
  name,
  description,
  followers,
  type,
  icon,
  id,
  following,
}) {
  const [isfollowing, setIsFollowing] = useState(following);
  const { token } = useAuth();
  const handleFollowToggle = async () => {
    try {
      if (!isfollowing) {
        const response = await axios.post(
          "https://oasis-api.xyz/api/community/subscribe",
          {
            community_id: id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        toast("Subscription added", {
          position: "top-right",
          className:
            "bg-black text-white pixel-text border border-solid border-green-400",
        });

        setIsFollowing(true);
      } else {
        const response = await axios.delete(
          "https://oasis-api.xyz/api/community/unsubscribe",
          {
            headers: {
              Authorization: token,
            },
            data: {
              community_id: id,
            },
          }
        );

        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error during follow toggle:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="my-4  rounded-lg border border-solid border-slate-600"
        key={key}
      >
        <div className="  bg-black  p-3  rounded-lg opacity-95 rounded-3xl  ">
          <div className=" my-4">
            <div className="mb-3">
              <div className="">
                {/* <div className="flex w-full sm:justify-between"> */}
                <div className=" ">
                  <div className="  ">
                    <div className=" my-auto overflow-hidden   col-span-5">
                      <div className=" grid grid-cols-12">
                        <div className=" col-span-3">
                          <Link href={`/community/${id}`}>
                            {icon === "" ? (
                              <img
                                src="/default_community_profile.png"
                                alt=""
                                className="  w-16 h-16 sm:h-22  sm:w-22 md:h-24  md:w-24 rounded-full "
                              />
                            ) : (
                              <img
                                src={icon}
                                alt=""
                                className=" md:h-24  md:w-24 h-16 w-16 sm:h-22 sm:w-22  object-cover rounded-full "
                              />
                            )}
                          </Link>
                        </div>
                        <div className=" my-auto col-span-9 break-words">
                          <Link href={`/community/${id}`}>
                            <p className=" pixel-text text-[#00B2FF] text-xs  font-bold   my-auto  ml-5 sm:ml-3  ">
                              {name.length > 200 ? (
                                <>
                                  {name.slice(0, 200)}...
                                  <Link href={`/community/${id}`}>
                                    <button className="text-blue-500 underline">
                                      Read More
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                <>{name}</>
                              )}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* <p className="text-[#828282] text-sm  my-auto col-span-2 pixel-text hidden md:block">
                      {type}
                    </p> */}
                    {/* <div className="flex my-auto ml-3 col-span-3 pixel-text hidden md:block">
                      <div className="my-auto flex">
                        <HiUsers color="white" fill="white" fontSize="18px" />
                        <p className="text-white text-sm font-medium ml-1">
                          {followers}
                        </p>
                      </div>
                    </div> */}

                    {/* <p
                      className={`hidden md:block text-white rounded-md my-auto border-[#767676] border-[1.5px]  p-1 sm:font-semibold px-2  text-[10px]  sm:mr-4 ml-1  text-center col-span-2 cursor-pointer pixel-text ${
                        isfollowing ? " px-1 mx text-[9px]" : "bg-[#00B2FF]"
                      }`}
                      onClick={handleFollowToggle}
                    >
                      {isfollowing ? "Unsubscribe" : "Subscribe"}
                    </p> */}
                  </div>
                </div>
              </div>

              <div className="flex mt-3 justify-between">
                <div className="flex my-auto">
                  <p className="text-[#828282] pixel-text  text-xs my-auto">
                    {type}
                  </p>
                  <div className="my-auto ml-4">
                    <HiUsers color="white" fill="white" fontSize="15px" />
                  </div>
                  <p className="text-white text-xs font-medium ml-1 my-auto ">
                    {followers}
                  </p>
                </div>
                <p
                  className={` ml-4 text-white rounded-md my-auto border-[#767676] border-[1.5px]  p-1 md:text-[8px] sm:font-semibold px-2 text-[7px]   cursor-pointer pixel-text ${
                    isfollowing ? "" : " bg-[#00B2FF]"
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isfollowing ? "Unsubscribe" : "Subscribe"}
                </p>
              </div>
            </div>
            <p className="text-white open-sans text-xs  ml-1  mt-3 break-words">
              {description.length > 200 ? (
                <>
                  {description.slice(0, 200)}...
                  <Link href={`/community/${id}`}>
                    <button className="text-blue-500 underline">
                      Read More
                    </button>
                  </Link>
                </>
              ) : (
                <>{description}</>
              )}
            </p>
          </div>
        </div>
      </div>
      {/* <hr className="border border-blue-500   mx-3 " /> */}
    </>
  );
}
