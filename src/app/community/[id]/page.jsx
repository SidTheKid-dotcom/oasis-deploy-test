"use client"
import { HiUsers } from "react-icons/hi";
import axios from "axios";
import { useEffect, useState } from "react";

import{ formatDistanceToNow} from 'date-fns'




export default function Page({ params }) {
    const [community, setCommunity] = useState(null);
  
    const getCommunity = async (id) => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0MSIsImVtYWlsIjoia2lyYUBnbWFpbC5jb20iLCJpYXQiOjE3MTQyOTkwMDF9.1ZuTu6j00mouWxrPwrWR8u3Fn9RmLwuqeRE_gBJrR24";
        const response = await axios.get(
          `http://3.110.161.150:4000/api/community?id=${id}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        const responseData = response.data;
        console.log(responseData)
        setCommunity(responseData);
      } catch (error) {
        console.log("Error", error);
      }
    };
  
    useEffect(() => {
      getCommunity(params.id);
    }, [params.id]);
  
    return (
      <div className="mt-9 w-1/2 ml-8">
        {community && (
          <div className="relative">
            <div className="cursor-pointer">
              <img src={community.banner} className="h-[300px] w-full" />
            </div>
            <div className="flex justify-center cursor-pointer">
              <img
                src={community.icon}
                alt=""
                className="rounded-full w-36 h-36 z-20 absolute mt-[-13%] bg-black"
              />
            </div>
            <div className="flex justify-between mt-2 text-2xl">
              <p className="text-white font-bold">{community.name}</p>
              <div className="flex my-auto ml-3">
                <div className="my-auto">
                  <HiUsers color="white" fill="white" fontSize="25px" />
                </div>
                <p className="text-white text-sm font-medium ml-1 text-2xl">{community.no_of_subscribers}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex">
                <button className="border-[1.5px] rounded-3xl p-2 text-white border-[#767676]">Create Post +</button>
                <button className="ml-4 border-[1.5px] rounded-3xl p-2 text-white border-[#767676] px-4">Follow</button>
                <p className="ml-4 text-white my-auto">{formatDistanceToNow(new Date(community.created_at),{addSuffix:true})}</p>
              </div>
              <p className="text-[#828282] text-xl">{community.type}</p>
            </div>
          </div>
        )}
        <div className="text-white my-4">
          {community && <p>{community.description}</p>}
        </div>
      </div>
    );
  }
     

