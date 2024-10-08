"use client";

import BannerPic from "@/components/community/BannerPic";
import ProfilePic from "@/components/community/ProfilePic";
import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

import LoadingSpinner from "@/components/animations/LoadingSpinner";

export default function CreateCommunity() {
  const [loading, setLoading] = useState(false);
  const [BannerImage, setBannerImage] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [name, SetName] = useState("");
  const [description, setDescription] = useState("");
  const [Visibilty, setVisibilty] = useState("");
  const { token, navBarData } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://oasis-api.xyz/api/community/create",
        {
          name,
          description,
          type: Visibilty,
          banner: BannerImage,
          icon: ProfileImage,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast("Community created successfully", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-green-400",
      });
      setTimeout(() => {
        setLoading(false);
        router.push(`/profile/${navBarData.id}`);
      }, 700);
    } catch (error) {
      console.error("Error creating community:", error);
      toast("Cant Create Community", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-red-400",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="relative bg-black bg-opacity-80 md:bg-none md:bg-opacity-0 p-3 mx-3">
        <p className=" ml-[17%] text-md md:text-2xl font-semibold text-[#00B2FF] md:px-11 mt-4 md:mt-2 mb-5 md:mb-0 pixel-text">
          Create Community
        </p>
        {loading && (
          <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <LoadingSpinner />
          </div>
        )}

        <div className="mt-3 md:w-[58%] md:mx-auto">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="relative  mb-14">
                <BannerPic
                  BannerImage={BannerImage}
                  setBannerImage={setBannerImage}
                />
                <ProfilePic
                  ProfileImage={ProfileImage}
                  setProfileImage={setProfileImage}
                />
              </div>
              <div className=" ">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="text-black bg-slate-200 p-2 rounded-md my-4 md:my-2 mt-7 w-full placeholder-font-pixel-text open-sans"
                  onChange={(e) => SetName(e.target.value)}
                />
                <textarea
                  placeholder="Description..."
                  required
                  className="text-black bg-slate-200 p-2 rounded-md my-2 w-full h-32 md:h-16 placeholder-font-pixel-text open-sans"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="flex mb-16">
                  <select
                    required
                    className="bg-[#323741] rounded-[5px] p-2 rounded-md my-4 md:my-2  text-white pixel-text"
                    onChange={(e) => setVisibilty(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Visibility
                    </option>
                    <option value="NSFW">NSFW</option>
                    <option value="PUBLIC">Public</option>
                  </select>
                  <button
                    className="flex text-white border-[1px] border-[#767676] p-1 my-auto rounded-md px-2 ml-9 hover:bg-[#00B2FF]"
                    type="submit"
                  >
                    <p className="my-auto pixel-text">Create </p>
                    <BiSolidSend className="ml-2 my-auto" size={25} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
