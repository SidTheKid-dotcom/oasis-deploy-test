// components/user-profile/UserProfile.jsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import FollowersCard from "../../../components/profile/FollowersCard";
import MainProfile from "../../../components/profile/MainProfile";

export default function UserProfile({ params }) {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `https://oasis-api.xyz/api/user/profile?userId=${params.slug}`,
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.log("error occurred while fetching user's info: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [token, params.slug]);

  return (
    <div className="grid grid-cols-12 mt-[2rem] ">
      <div className="px-[0.5rem] col-span-12 lg:col-span-8">
        {loading ? null : (
          <MainProfile
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loading={loading}
          />
        )}
      </div>
      <div className="hidden lg:block lg:col-span-4">
        {loading ? null : (
          <FollowersCard
            username={userInfo.username}
            followers={userInfo.followers}
            following={userInfo.following}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
