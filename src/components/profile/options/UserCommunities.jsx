import { useState } from "react";
import Link from "next/link";

import ComunityCard from "@/components/community/CommunityCard";

export default function UserCommunities({ communities, editable }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* {editable && (
        <Link href={{ pathname: "/create/community" }}>
          <button className="mb-[1rem] p-2 border border-solid border-slate-400 bg-[#2a313d] font-[2rem] rounded-full">
            &nbsp;+ Create Community&nbsp;
          </button>
        </Link>
      )} */}
      <div className="flex flex-row gap-4">
        <button
          onClick={() => setActiveIndex(0)}
          className={`px-2 bg-black font-[2rem]  text-xs rounded-md border border-solid ${
            activeIndex === 0 ? "bg-blue-500" : "border-slate-400"
          }`}
        >
          &nbsp;Created&nbsp;
        </button>
        <button
          onClick={() => setActiveIndex(1)}
          className={`p-2 text-xs rounded-md bg-black font-[2rem] rounded-full border border-solid ${
            activeIndex === 1 ? "bg-blue-500" : "border-slate-400"
          }`}
        >
          &nbsp;Joined&nbsp;
        </button>
      </div>
      {activeIndex === 0
        ? communities.created.map((community) => {
            return (
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
            );
          })
        : communities.joined.map((community, index) => {
            return (
              <ComunityCard
                key={community.key}
                icon={community.icon}
                name={community.name}
                description={community.description}
                followers={community.no_of_subscribers}
                type={community.type}
                id={community.id}
                following={true}
              />
            );
          })}
    </div>
  );
}
