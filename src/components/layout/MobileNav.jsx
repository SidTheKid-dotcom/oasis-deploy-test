"use client";
import React, { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import PopularAccounts from "../global-feed/PopularAccounts";
import Profile from "./profile";
import UserSearchBox from "../search/user/UserSearchBox";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { MdModeEdit } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function MobileNav() {
  const pathname = usePathname();
  const { navBarData } = useAuth();
  const [renderSearchBox, setRenderSearchBox] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleSearchClick = () => {
    setRenderSearchBox(!renderSearchBox);
  };

  const handleBlur = () => {
    setRenderSearchBox(false);
  };

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { token } = useAuth();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://oasis-api.xyz/userRecommendations",
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        setSuggestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const navigateUserProfile = (userId) => {
    // Handle the logic for navigating to the user profile page
    router.push("/profile/" + userId);
  };

  const handleFollowUser = async (userId) => {
    await axios.post(
      "https://oasis-api.xyz/api/user/follow",
      { userId: userId },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((suggestion) => suggestion.id !== userId)
    );
  };
  return (
    <>
      <div className="sticky top-0 z-50 md:hidden ">
        <div className="p-4">
          <div className="flex justify-between">
            <div className="flex">
              {!active && (
                <HiMenu
                  size={35}
                  color="white"
                  className="my-auto"
                  onClick={handleClick}
                />
              )}
              {!renderSearchBox && (
                <p className="text-white border p-1 px-4 text-xl rounded-3xl my-auto pixel-text ml-2">
                  Oasis
                </p>
              )}
              {renderSearchBox ? (
                <UserSearchBox onBlur={handleBlur} />
              ) : (
                <button onClick={handleSearchClick}>
                  <MdOutlineSearch
                    size={35}
                    color="white"
                    className="my-auto ml-2"
                  />
                </button>
              )}
            </div>
            <Profile />
          </div>
        </div>
        {active && (
          <div className="fixed left-0 top-0 w-[90%] h-full ease-in-out duration-1000 bg-black overflow-y-auto opacity-90">
            <div className="p-2">
              <div className="flex justify-between sticky top-0 bg-black">
                <img src="/primary-logo.png" alt="Logo" width="80px" />
                <FaArrowLeftLong
                  size={35}
                  color="white"
                  className="my-auto"
                  onClick={handleClick}
                />
              </div>
              <div className=" text-white text-xl ">
                <Link href="/">
                  <div className=" flex my-4">
                    <IoMdHome className=" my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/" ? "text-blue-500" : ""
                      }`}
                      onClick={handleClick}
                    >
                      Home
                    </p>
                  </div>
                </Link>
                <Link href="/communities">
                  <div className="flex my-4">
                    <IoIosPeople className="my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/communities" ? "text-blue-500" : ""
                      }`}
                      onClick={handleClick}
                    >
                      Communities
                    </p>
                  </div>
                </Link>
                <Link href="/create/post">
                  <div className="flex my-4">
                    <MdModeEdit className="my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/create/post" ? "text-blue-500" : ""
                      }`}
                      onClick={handleClick}
                    >
                      Post
                    </p>
                  </div>
                </Link>
                <Link href="/create/community">
                  <div className="flex my-4">
                    <IoIosCreate className="my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/create/community" ? "text-blue-500" : ""
                      }`}
                      onClick={handleClick}
                    >
                      new Commmnuity
                    </p>
                  </div>
                </Link>
                <hr className="border border-blue-500 mt-7" />
                {/* <div>
                 <PopularAccounts />
                </div> */}
                <div>
                  <div className="bg-black text-white rounded-[30px] p-5 pixel-text  my-10 z-10 mt-2 lg:mt-2 lg:sticky lg:top-2">
                    <h2 className="text-2md font-bold mb-5">
                      People You Might Know
                    </h2>
                    <div className=" ">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <div className="flex flex-col gap-4 text-sm lg:overflow-y-auto scrollbar-hide lg:h-[400px] ">
                          {suggestions.map((user) => (
                            <div
                              key={user.id}
                              className="grid grid-cols-12 p-3 border border-slate-500 rounded-lg"
                            >
                              <div
                                onClick={handleClick}
                                className=" col-span-9"
                              >
                                {" "}
                                <button
                                  onClick={() => navigateUserProfile(user.id)}
                                  className="  flex"
                                >
                                  <figure className="w-[40px] h-[40px] overflow-hidden rounded-full border border-white mr-2 my-auto">
                                    {user.profile_picture === null ? (
                                      <img
                                        src={"/default_profile.jpg"}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <img
                                        src={user.profile_picture}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </figure>

                                  <div className="  text-xs my-auto break-words">
                                    {user.username}
                                  </div>
                                </button>
                              </div>

                              <button
                                onClick={() => handleFollowUser(user.id)}
                                className=" text-sm col-span-3 border border-solid border-slate-100 rounded-md  hover:bg-blue-500 transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pixel-text">
                  {navBarData.subscribed_communities &&
                    navBarData.subscribed_communities.length > 0 && (
                      <div className=" flex my-4">
                        <BsFire className=" my-auto" size={30} />

                        <p className=" my-auto pixel-text text-sm ml-2">
                          Subscriptions{" "}
                        </p>
                      </div>
                    )}

                  <div
                    className="overflow-y-auto  max-h-56  scrollbar-hide "
                    onClick={handleClick}
                  >
                    {navBarData.subscribed_communities &&
                      navBarData.subscribed_communities.map((menu, index) => (
                        <Link
                          href={`/community/${menu.community.id}`}
                          key={index}
                        >
                          <li
                            onClick={() => {
                              router.push(`/community/${menu.community.id}`);
                            }}
                            className={`text-sm cursor-pointer h-14 flex items-center px-3 mb-3 rounded-lg hover:bg-[#4B84FF]/[0.45] hover:bg-[#4B84FF][0.45]`}
                          >
                            {menu.community.icon === "" ? (
                              <img
                                src={"/default_community_profile.png"}
                                className="w-11 h-11 rounded-full bg-black "
                                alt="Profile"
                                size={25}
                                round={true}
                              />
                            ) : (
                              <img
                                className="w-11 h-11 rounded-full bg-black "
                                src={menu.community.icon}
                                alt="Profile"
                                size={25}
                                round={true}
                              />
                            )}

                            <span className="origin-left duration-300 hover:block pl-3">
                              <h1 className="text-xs font-light  text-[#41a3ff]">
                                {menu.community.name}
                              </h1>
                              <h5 className="text-xs">
                                {menu.community.no_of_subscribers +
                                  " Subscribers"}
                              </h5>
                            </span>
                          </li>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
