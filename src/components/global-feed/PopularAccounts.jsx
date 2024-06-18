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
    <div className="bg-black text-white rounded-[30px] p-5 pixel-text mx-3 my-10 mt-4 md:fixed  md:top-32">
      <h2 className="text-2md font-bold mb-5">People You Might Know</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 text-sm">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-12 p-3 border border-slate-500 rounded-lg"
            >
              <button
                onClick={() => navigateUserProfile(user.id)}
                className="col-span-9 gap-4 flex flex-row"
              >
                <figure className="w-[30px] h-[30px] overflow-hidden rounded-full border border-white">
                  <img
                    src={user.profile_picture || "/default-profile.png"}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div>
                  <div className="font-bold">{user.username}</div>
                  <div className="text-sm text-slate-400">
                    u/{user.username}
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleFollowUser(user.id)}
                className="text-sm col-span-3 border border-solid border-slate-100 rounded-xl bg-[#323741] hover:bg-blue-500 transition-colors"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeopleYouMightKnow;
