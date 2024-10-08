"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function FollowersCard({ username, followers, following }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-black pixel-text text-white rounded-[30px] mx-5 border border-solid border-slate-700 lg:border-none my-2 lg:my-0   lg:sticky lg:top-0">
      <div className="py-2">
        <section className="m-2 p-2 flex flex-row justify-around">
          <h1 className="font-bold text-xl">{username}</h1>
          {/* <div className="flex flex-row py-1 px-3 border border-solid border-white rounded-[30px]">
            <button className="flex flex-row gap-2">
              <h1>Share</h1>
              <figure className="cursor-pointer mt-[5px]">
                <img
                  src="/share-nodes-solid.svg"
                  width="15px"
                  height="15px"
                  alt="Share icon"
                ></img>
              </figure>
            </button>
          </div> */}
        </section>

        <div className="h-[20px]"></div>

        <section className="grid grid-cols-2">
          <div
            className={`flex flex-col text-center ${activeTab == 0 ? "bg-[#2a313d]" : "bg-transparent"
              }`}
          >
            <button onClick={() => setActiveTab(0)}>
              <h1>followers</h1>
              <div>{followers?.length}</div>
            </button>
          </div>
          <div
            className={`flex flex-col    text-center ${activeTab == 1 ? "bg-[#2a313d]" : "bg-transparent"
              }`}
          >
            <button onClick={() => setActiveTab(1)}>
              <h1>Following</h1>
              <div>{following?.length}</div>
            </button>
          </div>
        </section>

        <div className="h-[2px] my-3 bg-[#838d9e]"></div>

        <section className="text-lg  overflow-x-hidden  scrollbar-hide">
          <div className="overflow-y-auto min-h-14 max-h-80  scrollbar-hide">
            {activeTab == 0
              ? followers?.map((account, index) => (
                <Follower key={index} account={account} />
              ))
              : following?.map((account, index) => (
                <Following key={index} account={account} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const Follower = ({ account }) => {
  const router = useRouter();
  const navigateUserProfile = (userId) => {
    // Handle the logic for navigating to the user profile page
    router.push("/profile/" + userId);
  };
  return (
    <button
      onClick={() => navigateUserProfile(account.id)}
      className="p-2 flex flex-row gap-4 "
    >
      <figure className="relative border border-white w-[40px] h-[40px] flex place-content-center rounded-full overflow-hidden">
        <img
          className="w-full object-cover"
          src={account.profile_picture}
        ></img>
      </figure>
      <div
        className="flex flex-row justify-center h-full text-xs"
        style={{ marginTop: "11px" }}
      >
        {account.username.slice(0, 15)}
        {
          account.username.length > 15 && (
            <span className="text-white">...</span>
          )
        }
      </div>
    </button>
  );
};

const Following = ({ account }) => {
  const router = useRouter();
  const navigateUserProfile = (userId) => {
    // Handle the logic for navigating to the user profile page
    router.push("/profile/" + userId);
  };
  return (
    <button
      onClick={() => navigateUserProfile(account.id)}
      className="p-2 flex flex-row gap-4"
    >
      <figure className="relative border border-white w-[40px] h-[40px] flex place-content-center rounded-full overflow-hidden">
        <img
          className="w-full object-cover"
          src={account.profile_picture}
        ></img>
      </figure>
      <div
        className="flex flex-row justify-center h-full text-xs"
        style={{ marginTop: "11px" }}
      >
        {account.username.slice(0, 15)}
        {
          account.username.length > 15 && (
            <span className="text-white">...</span>
          )
        }
      </div>
    </button>
  );
};
