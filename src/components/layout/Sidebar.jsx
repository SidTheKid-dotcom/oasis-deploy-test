"use client";
import React, { useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Context } from "./Context";
import PopularAccounts from "../global-feed/PopularAccounts";

export default function Sidebar() {
  const { navBarData } = useContext(Context);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div className=" hidden md:block mr-10 w-[30%] h-full  sticky top-16 pixel-text">
        <div className=" flex">
          <img src="/logo.png" alt="" />
          <p className=" text-white border p-2 px-5  text-2xl rounded-3xl my-auto ml-2  pixel-text">
            Oasis
          </p>
        </div>
        <div className=" text-white text-xl ">
          <Link href="/">
            <div className=" flex my-4">
              <IoMdHome className=" my-auto" size={30} />
              <p className={`my-auto pixel-text ml-2 ${pathname === "/" ? "text-blue-500" : ""
                }`}>Home </p>
            </div>
          </Link>
          <Link href="/communities">
            <div className=" flex my-4">
              <IoIosPeople className=" my-auto" size={30} />
              <p
                className={`my-auto pixel-text ml-2 ${pathname === "/communities" ? "text-blue-500" : ""
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
                className={`my-auto pixel-text ml-2 ${pathname === "/events" ? "text-blue-500" : ""
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
            <div className="lg:hidden">
              <PopularAccounts />
            </div>
            {navBarData.subscribed_communities && navBarData.subscribed_communities.map((menu, index) => (
              <li key={index} onClick={() => { router.push(`/communities/${menu.community.id}`) }}
                className={`text-sm cursor-pointer h-14 flex items-center px-3 mb-3 rounded-lg hover:bg-[#4B84FF]/[0.45] hover:bg-[#4B84FF][0.45]`}>
                <img
                  className="w-11 overflow-hidden object-cover"
                  src={menu.community.image}
                  alt="Profile"
                  size={25}
                  round={true}
                />
                <span
                  className='origin-left duration-300 hover:block pl-3'
                >
                  <h1 className="text-[18px] font-light text-[#41a3ff]" >{menu.community.name}</h1>
                  <h5 className="text-[13px]">{menu.community.no_of_subscribers + ' Subscribers'}</h5>
                </span>
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
