import Feed from "@/components/community/Feed";
import Top from "@/components/community/Top";
import PeopleYouMightKnow from "@/components/global-feed/PopularAccounts";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-12">
      {/* in this mobile screen is default and css for laptop is in md: */}
      <div className="col-span-12 lg:col-span-8 lg:px-20 overflow-hidden">
        <Feed />
      </div>
      <div className="hidden lg:block lg:col-span-4  ">
        <Top />
      </div>
    </div>
  );
}
