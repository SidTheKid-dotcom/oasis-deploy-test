"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const { useAuth } = require("@/context/authContext");

const PeopleYouMightKnow = () => {
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
    <div className="bg-black text-white rounded-[30px] p-5 pixel-text  my-10 z-10 mt-2 lg:mt-2 lg:sticky lg:top-2">
      <h2 className="text-2md font-bold mb-5">People You Might Know</h2>
      <div className=" ">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4 text-sm lg:overflow-y-auto scrollbar-hide lg:h-[400px] ">
            {
              suggestions.length === 0 && (
                <div className="mt-[-1.25rem] flex flex-col gap-2 items-center justify-center h-full w-full">
                <figure>
                <img src="/no_content.png" alt="No Suggestions" width='150px' />
                </figure>
                  <p>No suggestions found.</p>
                </div>
              )
            }
            {suggestions?.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 p-3 border border-slate-500 rounded-lg"
              >
                <button
                  onClick={() => navigateUserProfile(user.id)}
                  className="col-span-9  flex"
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
                    {user.username.slice(0, 10)}
                    {
                      user.username.length > 10 && (
                        <span className="text-white">...</span>
                      )
                    }
                  </div>
                </button>
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
  );
};

export default PeopleYouMightKnow;
