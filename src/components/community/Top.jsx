"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Top() {
  const { useAuth } = require("@/context/authContext");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          "https://oasis-api.xyz/api/community/top"
        );
        console.log(response.data);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);
  return (
    <>
      {
        <div className="bg-black text-white rounded-[30px] p-5 pixel-text  my-10 z-10 mt-4 lg:mt-8 lg:sticky lg:top-4">
          <h2 className="text-2md  mb-5 text-center">Top Communities</h2>
          <div className="  lg:overflow-y-auto scrollbar-hide  lg:h-[400px]">
            {suggestions.map((user) => (
              <Link href={`/community/${user.id}`} key={user.id}>
                <div className="grid grid-cols-12 p-3  gap-4 border border-slate-500 rounded-lg mb-3">
                  <figure className="w-[40px] h-[40px] my-auto col-span-2 overflow-hidden rounded-full border ">
                    {user.icon === "" ? (
                      <img
                        src={"/default_profile.jpg"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={user.icon}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </figure>
                  <div className="  col-span-10 ml-1  text-xs  my-auto">
                    {user.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      }
    </>
  );
}
