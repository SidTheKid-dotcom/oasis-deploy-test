"use client";
import React, { useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PopularAccounts from "../global-feed/PopularAccounts";
import { MdModeEdit } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { useAuth } from "@/context/authContext";
export default function Sidebar() {
  const { navBarData } = useAuth();
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
              <p
                className={`my-auto pixel-text ml-2 ${
                  pathname === "/" ? "text-blue-500" : ""
                }`}
              >
                Home{" "}
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
          <Link href="/create/post">
            <div className="flex my-4">
              <MdModeEdit className="my-auto" size={30} />
              <p
                className={`my-auto pixel-text ml-2 ${
                  pathname === "/create/post" ? "text-blue-500" : ""
                }`}
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
                  pathname === "/create/post" ? "text-blue-500" : ""
                }`}
              >
                new Commmnuity
              </p>
            </div>
          </Link>

          <hr className="border border-blue-500  mt-7" />
          <div>
            <div className=" flex my-4">
              <BsFire className=" my-auto" size={30} />
              <p className=" my-auto pixel-text text-md ml-2">Subscriptions </p>
            </div>

            <div className="overflow-y-auto  max-h-56  scrollbar-hide">
              {navBarData.subscribed_communities &&
                navBarData.subscribed_communities.map((menu, index) => (
                  <Link href={`/community/${menu.community.id}`}>
                    <li
                      key={index}
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
                          {menu.community.no_of_subscribers + " Subscribers"}
                        </h5>
                      </span>
                    </li>
                  </Link>
                ))}
            </div>
          </div>
          <div className="lg:hidden">
            <PopularAccounts />
          </div>
        </div>
      </div>
    </>
  );
}
