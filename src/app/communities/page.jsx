"use client";

import ComunityCard from "@/components/community/CommunityCard";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
export default function Communities() {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://oasis-api.xyz/api/community/all`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.data;
      console.log("data fetched: ", responseData);
      setData(responseData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="md:ml-16 bg-black mx-3 md:mx-0 md:mr-12  mb-48 md:mb-0">
        <div className="">
          {data.map((community) => (
            <ComunityCard
              key={community.key}
              icon={community.icon}
              name={community.name}
              description={community.description}
              followers={community.no_of_subscribers}
              type={community.type}
              id={community.id}
              following={community.isSubscribed}
            />
          ))}
        </div>
      </div>
    </>
  );
}
