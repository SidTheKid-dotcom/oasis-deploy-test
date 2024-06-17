"use client";
import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import PopularAccouts from "../global-feed/PopularAccounts";
import Profile from "./profile";
import UserSearchBox from "../search/user/UserSearchBox";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
export default function MobileNav() {
  const pathname = usePathname();
  const [renderSearchBox,setRenderSearchBox]=useState(false);
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const handleSearchClick = () => {
    setRenderSearchBox(!renderSearchBox);
  }
  const handleBlur = () => {
    setRenderSearchBox(false);
  }
  return (
    <>
      <div className="  sticky top-0  z-50 md:hidden ">
        <div>
          <div className=" p-4">
            <div className=" flex justify-between">
              <div className=" flex">
                {!active && (
                  <HiMenu
                    size={35}
                    color="white"
                    className=" my-auto"
                    onClick={handleClick}
                  />
                )}
                {!renderSearchBox && (
                  <p className=" text-white border p-1 px-4  text-xl rounded-3xl my-auto   pixel-text ml-2 ">
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
              <Profile/>
            </div>
          </div>
        </div>
        {active && (
          <div
            className={
              active
                ? " fixed left-0 top-0 w-[90%]   ease-in-out duration-1000"
                : " fixed left-[-110%] "
            }
          >
            <div
              className=" bg-black min-h-screen p-2    opacity-90  
     transition-transform"
            >
              <div className=" flex justify-between">
                <img src="/logo.png" alt="" />
                <FaArrowLeftLong
                  size={35}
                  color="white"
                  className=" my-auto"
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
                  <div className=" flex my-4">
                    <IoIosPeople className=" my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/communities" ? "text-blue-500" : ""
                      }`}
                    >
                      Communities
                    </p>
                  </div>
                </Link>

                <Link href="/events">
                  <div className=" flex my-4">
                    <SlCalender className=" my-auto" size={30} />
                    <p
                      className={`my-auto pixel-text ml-2 ${
                        pathname === "/events" ? "text-blue-500" : ""
                      }`}
                    >
                      Events
                    </p>
                  </div>
                </Link>
                <hr className="border border-blue-500  mt-7" />
                <div>
                  <div className=" flex my-4">
                    <BsFire className=" my-auto" size={30} />
                    <p className=" my-auto pixel-text text-xl ml-2">
                      Top Communities{" "}
                    </p>
                  </div>
                  <PopularAccouts/>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
