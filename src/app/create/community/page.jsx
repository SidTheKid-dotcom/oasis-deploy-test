"use client";

import BannerPic from "@/components/community/BannerPic";
import ProfilePic from "@/components/community/ProfilePic";
import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
export default function CreateCommunity() {
  const [BannerImage, setBannerImage] = useState(null);

  const [ProfileImage, setProfileImage] = useState(null);

  const [name, SetName] = useState("");
  const [description, setDescription] = useState("");
  const [Visibilty, setVisibilty] = useState("");
  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      toast("Community Created Successfully", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-green-400",
      });
    } catch (error) {
      console.error("Error posting data:", error);

      toast("Cant Create Community", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-red-400",
      });
    }
  };

  return (
    <>
      <Toaster />
      <div className=" bg-black bg-opacity-80 md:bg-none md:bg-opacity-0 p-3 mx-3  ">
        <p className=" text-md md:text-2xl font-semibold text-[#00B2FF] md:px-11  mt-4 md:mt-2 mb-5 md:mb-0 pixel-text ">
          Create Community
        </p>
        <div className="  mt-3  md:w-[58%] md:mx-auto ">
          <form onSubmit={handleSubmit}>
            <div className="  ">
              <div>
                <div className="  relative mb-10">
                  <BannerPic
                    BannerImage={BannerImage}
                    setBannerImage={setBannerImage}
                  />

                  <ProfilePic
                    ProfileImage={ProfileImage}
                    setProfileImage={setProfileImage}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className=" bg-black p-2 rounded-md  my-4 md:my-2 mt-7 w-full text-white placeholder-white  "
                    onChange={(e) => SetName(e.target.value)}
                  />
                  <textarea
                    placeholder="Description..."
                    required
                    className="bg-black p-2 rounded-md my-2 w-full  h-32 md:h-16 text-white   placeholder-white "
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className=" flex   mb-16 ">
                    <select
                      required
                      name=""
                      id=""
                      className="bg-black p-2 rounded-md my-4 md:my-2 w text-white"
                      onChange={(e) => setVisibilty(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Visibilty
                      </option>
                      <option value="NSFW">NSFW</option>
                      <option value="PUBLIC">Public</option>
                    </select>
                    <button
                      className=" flex  text-white border-[1px] border-[#767676] p-1  my-auto rounded-md px-2     ml-9 hover:bg-[#00B2FF]"
                      type="submit"
                    >
                      <p className="   my-auto">Create </p>
                      <BiSolidSend className=" ml-2 my-auto" size={25} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
