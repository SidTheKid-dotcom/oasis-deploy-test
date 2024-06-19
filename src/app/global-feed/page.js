import GlobalFeed from "./GlobalFeed";
import PopularAccount from "../../components/global-feed/PopularAccounts";

export default function GlobalFeedPage() {
  return (
    <div className="grid grid-cols-12 ">
      {/* in this mobile screen is default and css for laptop is in md: */}
      <div className="col-span-12 lg:col-span-8 px-4 lg:px-20 overflow-hidden">
        <GlobalFeed />
      </div>
      <div className="hidden lg:block lg:col-span-4  ">
        <PopularAccount />
      </div>
    </div>
  );
}
