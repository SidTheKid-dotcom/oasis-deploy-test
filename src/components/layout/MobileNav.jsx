"use client";
import React, { useState } from "react";
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
                <img src="/logo.png" alt="" />
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
                <hr className="border border-blue-500 mt-7" />
                <div className="pixel-text">
                  <div className=" flex my-4">
                    <BsFire className=" my-auto" size={30} />
                    <p className=" my-auto pixel-text text-sm ml-2">
                      Subscribed Communities{" "}
                    </p>
                  </div>
                  
                  <div className="overflow-y-auto  max-h-56  scrollbar-hide">
                    {navBarData.subscribed_communities &&
                      navBarData.subscribed_communities.map((menu, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            router.push(`/community/${menu.community.id}`);
                          }}
                          className={`text-sm cursor-pointer h-14 flex items-center px-3 mb-3 rounded-lg hover:bg-[#4B84FF]/[0.45] hover:bg-[#4B84FF][0.45]`}
                        >
                          <img
                            className="w-11 overflow-hidden object-cover"
                            src={menu.community.image}
                            alt="Profile"
                            size={25}
                            round={true}
                          />
                          <span className="origin-left duration-300 hover:block pl-3">
                            <h1 className="text-[18px] font-light text-[#41a3ff]">
                              {menu.community.name}
                            </h1>
                            <h5 className="text-[13px]">
                              {menu.community.no_of_subscribers + " Subscribers"}
                            </h5>
                          </span>
                        </li>
                      ))}
                  </div>
                </div>
                <div>
                  <PopularAccounts />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
