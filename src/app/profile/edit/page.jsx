"use client";

import React, { useEffect, useState, Suspense } from "react";
import { BiSolidSend } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/animations/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";

function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        bio: "",
        username: "",
        profile_picture: null,
    });
    const [displayImage, setDisplayImage] = useState("");
    const { token, navBarData } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const getUserProfile = async () => {
        try {
            const response = await axios.get("https://oasis-api.xyz/api/user/profileforupdate", {
                headers: {
                    Authorization: token,
                },
            });
            const userData = response.data;
            setData({
                bio: userData.bio,
                username: userData.username,
                profile_picture: userData.profile_picture,
            });
            setDisplayImage(userData.profile_picture);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("bio", data.bio);
            if (data.profile_picture) {
                formData.append("media", data.profile_picture);
            }

            await axios.patch(
                "https://oasis-api.xyz/api/user/updateprofile",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast("Profile Updated Successfully", {
                position: "top-right",
                className:
                    "bg-black text-white pixel-text border border-solid border-green-400",
            });

            setTimeout(() => {
                setLoading(false);
                router.back();
            }, 700);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast("Error Updating Profile", {
                position: "top-right",
                className:
                    "bg-black text-white pixel-text border border-solid border-red-400",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData((prevData) => ({
            ...prevData,
            profile_picture: file,
        }));
        const reader = new FileReader();
        reader.onload = () => {
            setDisplayImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (parseInt(navBarData.id) !== parseInt(searchParams.get("userId"))) {
        return (
            <div className="bg-black text-white text-2xl picel-text h-screen w-full flex flex-col justify-center items-center">
                <figure>
                    <img src="/mischeif.jpeg" width="300px" height="300px" alt="Logo" />
                </figure>
                <figcaption>
                    Can&apos;t edit someone else&apos;s profile, darling.
                </figcaption>
            </div>
        );
    }

    return (
        <>
            <Toaster />
            {loading && (
                <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                    <LoadingSpinner />
                </div>
            )}
            <div className="bg-black bg-opacity-80 md:bg-none md:bg-opacity-0 p-3 mx-3">
                <p className="text-center text-md md:text-2xl font-semibold text-[#00B2FF] md:px-11 mt-4 md:mt-2 mb-5 md:mb-0 pixel-text">
                    Edit Profile
                </p>
                <div className="mt-3 md:w-[58%] md:mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-10">
                            <div className="flex flex-col items-center">
                                <label className="cursor-pointer">
                                    {displayImage ? (
                                        <img
                                            src={displayImage}
                                            alt="Profile"
                                            className="rounded-full w-32 h-32 object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed border-gray-400">
                                            <span className="text-gray-400">Upload Image</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            {/* <input
                type="text"
                placeholder="Username"
                name="username"
                value={data.username}
                required
                className="bg-black p-2 rounded-md my-4 md:my-2 mt-7 w-full text-white placeholder-white open-sans"
                onChange={handleChange}
              /> */}
                            <textarea
                                placeholder="Bio..."
                                name="bio"
                                value={data.bio}
                                required
                                className="bg-black p-2 rounded-md my-2 w-full text-xs h-32 md:h-16 text-white placeholder-white open-sans"
                                onChange={handleChange}
                            ></textarea>
                            <div className="flex mb-16">
                                <button
                                    className="flex text-white border-[1px] border-[#767676] p-1 my-auto rounded-md px-2 ml-9 hover:bg-[#00B2FF]"
                                    type="submit"
                                >
                                    <p className="my-auto pixel-text">Update</p>
                                    <BiSolidSend className="ml-2 my-auto" size={25} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditProfile />
        </Suspense>
    )
}