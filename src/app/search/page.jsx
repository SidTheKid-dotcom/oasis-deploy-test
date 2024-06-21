"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Posts from "@/components/global-feed/Post";
import ComunityCard from "@/components/community/CommunityCard";

function SearchPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const router = useRouter();

  const [searchData, setSearchData] = useState({
    posts: [],
    communities: [],
    users: [],
  });

  const [displayPosts, setDisplayPosts] = useState(true);
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displayCommunities, setDisplayCommunities] = useState(false);

  const [activeVideoId, setActiveVideoId] = useState(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (search) {
      const getPosts = async () => {
        try {
          const response = await axios.post(
            `https://oasis-api.xyz/search/post`,
            {
              query: search,
            }
          );
          setSearchData((prevSearchData) => ({
            ...prevSearchData,
            posts: response.data,
          }));
        } catch (error) {
          console.log("Error occurred in sending search request: ", error);
        }
      };

      const getUsers = async () => {
        try {
          const response = await axios.post(
            `https://oasis-api.xyz/search/user`,
            {
              query: search,
            }
          );
          setSearchData((prevSearchData) => ({
            ...prevSearchData,
            users: response.data,
          }));
        } catch (error) {
          console.log("Error occurred in sending search request: ", error);
        }
      };

      const getCommunities = async () => {
        try {
          const response = await axios.post(
            `https://oasis-api.xyz/search/community`,
            {
              query: search,
            }
          );
          setSearchData((prevSearchData) => ({
            ...prevSearchData,
            communities: response.data,
          }));
        } catch (error) {
          console.log("Error occurred in sending search request: ", error);
        }
      };

      getPosts();
      getUsers();
      getCommunities();
    }
  }, [search]);

  const navigateUserProfile = (userId) => {
    router.push("/profile/" + userId);
  };

  const handleSearchTypeChange = (event) => {
    const { value } = event.target;
    setDisplayPosts(value === "posts");
    setDisplayUsers(value === "users");
    setDisplayCommunities(value === "communities");
  };

  const NoResults = ({ message }) => (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-20">
      <img src="/no-results.jpg" alt="No Results" className="w-40 h-40 mb-5" />
      <p className="text-lg">{message}</p>
    </div>
  );

  return (
    <div className="flex flex-col-reverse lg:grid grid-cols-12 pixel-text mb-[95%] md:mb-0 w-full">
      <div className="col-span-8 lg:px-20 ml-[10px] mr-[25px] bg-black bg-opacity-80 rounded-lg">
        {displayPosts && searchData.posts.length > 0
          ? searchData.posts.map((post, index) => (
            <Posts
              key={index}
              post={post}
              isActive={false}
              setActiveVideoId={setActiveVideoId}
              muted={muted}
              setMuted={setMuted}
              volume={volume}
              setVolume={setVolume}
            />
          ))
          : displayPosts && <NoResults message="No posts found." />}
        {displayUsers && searchData.users.length > 0 ? (
          <div className="flex flex-col gap-4 text-sm text-white bg-black">
            {searchData.users.map((user) => (
              <button
                key={user.id}
                onClick={() => navigateUserProfile(user.id)}
                className="grid grid-cols-12 p-3 border border-slate-500 rounded-lg"
              >
                <div className="col-span-9 gap-4 flex flex-row">
                  <figure className="w-[30px] h-[30px] overflow-hidden rounded-full border border-white">
                    <img
                      src={user.profile_picture || "/default-profile.png"}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div>
                    <div className="font-bold">{user.username}</div>
                    <div className="text-sm text-slate-400 break-words">
                      u/{user.username}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(user.id)}
                  className="h-full text-sm col-span-3 border border-solid border-slate-100 rounded-xl bg-pink-500 hover:bg-blue-500 transition-colors"
                >
                  Add
                </button>
              </button>
            ))}
          </div>
        ) : (
          displayUsers && <NoResults message="No users found." />
        )}
        {displayCommunities && searchData.communities.length > 0
          ? searchData.communities.map((community) => (
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
          ))
          : displayCommunities && <NoResults message="No communities found." />}
      </div>
      <div className="lg:block lg:col-span-4 lg:h-[250px] lg:mx-5 bg-black text-white lg:rounded-[30px] lg:p-5 px-3 py-2 pixel-text  my-10 ">
        <div className="hidden lg:block mb-5">
          <h1 className="text-2xl font-bold">Search: {search}</h1>
        </div>
        <div className="flex flex-row lg:flex-col gap-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              value="posts"
              checked={displayPosts}
              onChange={handleSearchTypeChange}
              className="form-radio text-blue-500 h-4 w-4 mr-2"
            />
            <span className="text-md">Posts</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              value="users"
              checked={displayUsers}
              onChange={handleSearchTypeChange}
              className="form-radio text-blue-500 h-4 w-4 mr-2"
            />
            <span className="text-md">Users</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="searchType"
              value="communities"
              checked={displayCommunities}
              onChange={handleSearchTypeChange}
              className="form-radio text-blue-500 h-4 w-4 mr-2"
            />
            <span className="text-md">Communities</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
