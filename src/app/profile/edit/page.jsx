"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/context/authContext";

import LoadingSpinner from "@/components/animations/LoadingSpinner";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const { token, navBarData } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    // State management of text input fields
    const [data, setData] = useState(null);

    if (parseInt(navBarData.id) !== parseInt(searchParams.get('userId'))) {
        return (
            <div className="bg-red-500 h-[100px]">Cant edit someone elses profile darling</div>
        )
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://oasis-api.xyz/api/user/profileforupdate', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
                );
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.log("error occured while fetching user communities: ", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>all good</div>
    )
}
