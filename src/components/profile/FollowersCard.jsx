"use client"

import { useState } from "react";

export default function FollowersCard({ username, followers, following }) {

  const [activeTab, setActiveTab] = useState(0);

  console.log(following);

  return (
    <div className=" bg-slate-900 pixel-text text-white rounded-[30px] mx-5 ">
      <div className="py-2">
        <section className="m-2 p-2 flex flex-row justify-around">
          <h1 className="font-bold text-xl">{username}</h1>
          <div className="flex flex-row py-1 px-3 border border-solid border-white rounded-[30px]">
            <button className="flex flex-row gap-2">
              <h1>Share</h1>
              <figure className="cursor-pointer mt-[5px]">
                <img src='/share-nodes-solid.svg' width="15px" height="15px" alt="Share icon"></img>
              </figure>
            </button>
          </div>
        </section>

        <div className="h-[20px]"></div>

        <section className="grid grid-cols-2">
          <div className={`flex flex-col text-center ${activeTab == 0 ? 'bg-[#2a313d]' : 'bg-transparent'}`}>
            <button onClick={() => setActiveTab(0)}>
              <h1>followers</h1>
              <div>{followers?.length}</div>
            </button>
          </div>
          <div className={`flex flex-col text-center ${activeTab == 1 ? 'bg-[#2a313d]' : 'bg-transparent'}`}>
            <button onClick={() => setActiveTab(1)}>
              <h1>Following</h1>
              <div>{following?.length}</div>
            </button>
          </div>
        </section>

        <div className="h-[2px] my-3 bg-[#838d9e]"></div>

        <section className="text-lg min-h-[40px] max-h-[60vh] overflow-x-hidden">
          <div className="overflow-y-auto ">
            {
              activeTab == 0 ? (
                followers?.map((account, index) => (
                  <Follower key={index} account={account} />
                ))
              ) : (
                following?.map((account, index) => (
                  <Following key={index} account={account} />
                ))
              )
            }

          </div>
        </section>
      </div>
    </div>
  );
}


const Follower = ({ account }) => {
  return (
    <button className="p-2 flex flex-row gap-4">
      <div className="ml-2 border border-white h-[40px] w-[40px] rounded-full"><img src={account.profile_picture}></img></div>
      <div className="flex flex-col justify-center text-lg" style={{ marginTop: '4px' }}>{account.username}</div>
    </button>
  )
}

const Following = ({ account }) => {
  return (
    <button className="p-2 flex flex-row gap-4">
      <div className="ml-2 border border-white h-[40px] w-[40px] rounded-full"><img src='/image.png'></img></div>
      <div className="flex flex-col justify-center text-lg" style={{ marginTop: '4px' }}>{account.username}</div>
    </button>
  )
}