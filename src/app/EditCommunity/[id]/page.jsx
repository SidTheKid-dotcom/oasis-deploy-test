"use client";

import React, { useEffect, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import EditBannerPic from "@/components/community/EditBannerPic";
import EditProfilePic from "@/components/community/EditProfilePic";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/animations/LoadingSpinner";

import { useRouter } from "next/navigation";

export default function EditCommunity({ params }) {
  const [loading, setLoading] = useState(false);
  const [BannerImage, setBannerImage] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState("");
  const [Visibilty, setVisibilty] = useState("");
  const [data, setData] = useState([]);
  const { token, navBarData } = useAuth();
  const router = useRouter();

  const getCommunity = async (id) => {
    try {
      const response = await axios.get(
        `https://oasis-api.xyz/api/community?id=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const responseData = response.data;
      setData(responseData);
      setBannerImage(data.banner);
      setDescription(data.description);
      setProfileImage(data.icon);
      setVisibilty(data.type);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading
      const response = await axios.patch(
        "https://oasis-api.xyz/api/community/update",
        {
          id: params.id,
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
      toast("Community Edited Successfully", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-green-400",
      });

      setTimeout(() => {
        setLoading(false);
        router.push(`/community/${data.id}`);
      }, 700);
    } catch (error) {
      console.error("Error posting data:", error);
      toast("Error Editing Community", {
        position: "top-right",
        className:
          "bg-black text-white pixel-text border border-solid border-red-400",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommunity(params.id);
  }, [params.id]);

  return (
    <>
      <Toaster />
      {loading && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <div className=" bg-black bg-opacity-80 md:bg-none md:bg-opacity-0 p-3 mx-3  ">
        <p className=" text-center text-md md:text-2xl font-semibold text-[#00B2FF] md:px-11  mt-4 md:mt-2 mb-5 md:mb-0 pixel-text  ">
          Edit Community
        </p>
        <div className="  mt-3  md:w-[58%] md:mx-auto ">
          <form onSubmit={handleSubmit}>
            <div className="  ">
              <div>
                <div className="  relative mb-10">
                  <EditBannerPic
                    BannerImage={BannerImage}
                    setBannerImage={setBannerImage}
                    banner={data.banner}
                  />
                  <EditProfilePic
                    ProfileImage={ProfileImage}
                    setProfileImage={setProfileImage}
                    icon={data.icon}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    required
                    className=" bg-black p-2 rounded-md  my-4 md:my-2 mt-7 w-full text-white placeholder-white open-sans "
                    readOnly
                  />
                  <textarea
                    placeholder="Description..."
                    defaultValue={data.description}
                    required
                    className="bg-black p-2 rounded-md my-2 w-full  text-xs h-32 md:h-16 text-white   placeholder-white open-sans"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className=" flex   mb-16 ">
                    <select
                      required
                      value={data.type}
                      className="bg-black p-2 rounded-md my-4 md:my-2 w text-white pixel-text"
                      readOnly
                    >
                      <option value="" disabled hidden>
                        Visibility
                      </option>
                      <option value="NSFW">NSFW</option>
                      <option value="PUBLIC">Public</option>
                    </select>
                    <button
                      className=" flex  text-white border-[1px] border-[#767676] p-1  my-auto rounded-md px-2     ml-9 hover:bg-[#00B2FF]"
                      type="submit"
                    >
                      <p className="   my-auto pixel-text">Edit </p>
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
