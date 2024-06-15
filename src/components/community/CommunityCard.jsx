"use client"
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
export default function ComunityCard({
    key,
    name,
    description,
    followers,
    type,
    icon,
}) {

    const [isfollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        setIsFollowing(!isfollowing);
      };

  return (
    <>
    <div className="my-7" key={key}>
      <div className="m-6 md:m-0 bg-black p-5  opacity-95 rounded-3xl  md:mr-16">
        <div className="col-span-8 my-4">
          <div className="mb-3">
            <div className="flex justify-between">
              <div className="flex w-full sm:justify-between">
                <div className="rounded-full my-auto overflow-hidden flex">
                  <img
                    src={icon}
                    alt=""
                    className="  h-24  w-24 rounded-full "
                  />
                  <p className= " pixel-text text-[#00B2FF] font-bold text-sm md:text-lg   my-auto  ml-3 sm:ml-3  ">
                  {name}
                </p>
                </div>
                
                <div className=" pixel-text hidden sm:block sm:flex">
                  <p className="text-[#828282] text-sm md:text-md my-auto">
                    {type}
                  </p>
                  <div className="flex my-auto ml-3">
                    <div className="my-auto">
                      <HiUsers
                        color="white"
                        fill="white"
                        fontSize="18px"
                      />
                    </div>
                    <p className="text-white text-sm font-medium ml-1">
                      {followers}
                    </p>
                  </div>
                </div>

                <p
                  className={`hidden sm:block text-white rounded-md my-auto border-[#767676] border-[1.5px]  p-1 sm:font-semibold px-4  text-sm  sm:mr-4 ml-1 cursor-pointer pixel-text ${
                    isfollowing ? 'bg-[#00B2FF]' : ''
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isfollowing ? 'Following' : 'Follow'}
                </p>
              </div>
            </div>

            <div className="flex mt-3 sm:hidden">
              <p className="text-[#828282] pixel-text  text-xs my-auto">
                {type}
              </p>
              <div className="flex my-auto">
                <div className="my-auto ml-4">
                  <HiUsers color="white" fill="white" fontSize="15px" />
                </div>
                <p className="text-white text-xs font-medium ml-1 my-auto ">
                  {followers}
                </p>
                <p className={`text-white my-auto border-[#767676] border-[1.5px] rounded-md p-[1.5px] text-xs px-4 ml-4 md:hidden pixel-text  ${
                    isfollowing ? 'bg-[#00B2FF]' : ''
                  }` }
                  onClick={handleFollowToggle}>
                  {isfollowing ? 'Following' : 'Follow'}
                </p>
              </div>
            </div>
          </div>
          <p className="text-white text-xs md:text-xs">{description}</p>
        </div>
      </div>
    </div>
    <hr className="border border-blue-500   mx-3 " />
  </>
  );
}
