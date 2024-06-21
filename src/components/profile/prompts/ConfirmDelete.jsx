"use client"

import axios from "axios"
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

import LoadingSpinner from "@/components/animations/LoadingSpinner";

export default function ConfirmDelete({ postId, setConfirmDelete }) {

    const { token } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete('https://oasis-api.xyz/api/post/delete', {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: { postId: parseInt(postId) } // Pass the data in the 'data' field
            });

            if (response.status === 201) {
                toast('Post deleted successfully', {
                    position: 'top-right',
                    className: 'bg-black text-white pixel-text border border-solid border-green-400'
                })
                setConfirmDelete({ delete: false, postId: null });
                setTimeout(() => {
                    setLoading(false);
                }, 700)
            }
        } catch (error) {
            console.error('Error occurred while deleting the post:', error);
            toast("Couldn't Delete Post", {
                position: 'top-right',
                className: 'bg-black text-white pixel-text border border-solid border-red-400'
            })
            setLoading(false);
        }
    };


    const handleCancelDelete = () => {
        setConfirmDelete(false);
    }

    return (
        <div className="opacity-100 grid grid-cols-12 h-full md:w-full w-[500px]">
            {
                loading && (
                    <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                        <LoadingSpinner />
                    </div>
                )
            }
            <div className="col-span-2"></div>
            <div className="col-span-7 flex flex-col items-center justify-center">
                <section className="max-w-[500px] flex flex-col md:w-[50%] w-full bg-[#2a313d] rounded-[5px] p-3">
                    <h1 className="font-bold text-2xl">Confirm Delete</h1>
                    <div className="mt-[0.5rem] mb-[2rem]">Are you sure you want to delete?</div>
                    <div className="w-full flex flex-rol justify-end gap-2">
                        <button onClick={handleCancelDelete} className="p-[7px] text-black font-bold rounded-[5px] bg-green-400">Cancel</button>
                        <button onClick={handleConfirmDelete} className="p-[7px] text-black font-bold rounded-[5px] bg-red-400">Confirm</button>
                    </div>
                </section>
            </div>
            <div className="col-span-3"></div>
        </div>
    )
}