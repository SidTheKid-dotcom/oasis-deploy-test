import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { navBarData } = useAuth();
  const profilepic = navBarData.profile_picture;
  const { logout } = useAuth();

  const handleProfileClick = () => {
    router.push(`/profile/${navBarData.id}`);
  };

  return (
    <div className="my-auto w-16 mr-4 ml-4">
      <div className="relative inline-block">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-100 ring-slate-100 transition hover:shadow-md hover:ring-2 overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className="w-full object-cover" src={profilepic} alt="Profile" />
        </button>

        {isOpen && (
          <div className="absolute top-10 mt-3 flex w-60 flex-col gap-3 rounded-xl bg-slate-900 p-4 text-slate-100 shadow-lg pixel-text">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-lg h-12 w-12 overflow-hidden border-2 border-slate-600">
                <img
                  className="w-full object-cover"
                  src={profilepic}
                  alt="Profile"
                />
              </div>
              <div>
                <div className="flex gap-1 text-sm font-semibold pixel-text">
                  <span>{navBarData.username}</span>
                </div>
                <div className="text-xs text-slate-400 pixel-text">
                  {navBarData.email}
                </div>
              </div>
            </div>
            <div className="border-t border-slate-500/30"></div>
            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center pixel-text">
                <span className="text-3xl font-semibold">1</span>
                <span className="text-sm text-slate-400">Following</span>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <span className="text-3xl font-semibold">1</span>
                <span className="text-sm text-slate-400">Followers</span>
              </div>
            </div>
            <div className="border-t border-slate-500/30"></div>
            <div className="flex flex-col">
              <div
                className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-800"
                onClick={handleProfileClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  npm
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Profile</span>
              </div>
              <a
                href="#"
                className="flex items-center gap-3 rounded-md py-2 px-3 hover:bg-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Help Center</span>
              </a>
            </div>
            <button
              className="flex justify-center gap-3 rounded-md bg-red-600 py-2 px-3 font-semibold hover:bg-red-500 focus:ring-2 focus:ring-red-400"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
