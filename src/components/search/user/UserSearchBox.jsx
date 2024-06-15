'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdOutlineSearch } from "react-icons/md";
import DisplayUsers from "./DisplayUsers";

export default function UserSearchBox({ onBlur }) {

    const router = useRouter();

    const [search, setSearch] = useState('');
    const [isRequesting, setIsRequesting] = useState(false);
    const [users, setUsers] = useState([]);
    const searchBoxRef = useRef(null);

    useEffect(() => {
        const getUsers = async () => {
            if (search.trim() !== '') {
                setIsRequesting(true);

                try {
                    const response = await axios.post(`https://oasis-api.xyz/search/user`, {
                        query: search
                    });

                    setUsers(response.data);
                    setIsRequesting(false);
                } catch (error) {
                    console.log('Error occurred in sending search request: ', error);
                }
            }
        }

        const delaySearch = setTimeout(getUsers, 200);

        return () => clearTimeout(delaySearch);

    }, [search]);

    const handleSearchRequest = () => {
        if (searchBoxRef.current) {
            searchBoxRef.current.blur();
            searchBoxRef.current.value = "";
        }
        router.push('/search?filter=' + search);
    }

    const handleChange = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                onBlur();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onBlur]);

    return (
        <div className="relative m-3 w-[150px] md:w-[300px]" ref={searchBoxRef}>
            <div className="relative text-white pixel-text w-full flex flex-row">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 rounded-[5px] bg-slate-900"
                    onChange={(e) => handleChange(e.target.value)}
                    value={search}
                    onFocus={() => console.log("Input focused")}
                />
                <button onClick={handleSearchRequest}>
                    <MdOutlineSearch size={25} color="white" className="my-auto absolute right-2 top-[0.5rem]" />
                </button>
            </div>
            {search && (
                <div className="absolute top-[3rem] left-0 w-full z-50 bg-slate-900 text-white overflow-auto scrollbar-hide max-h-[200px] rounded-md shadow-lg">
                    {isRequesting ? (
                        <div className="py-2 px-4">Loading...</div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} className="border-b border-gray-700 py-2 px-4">
                                <DisplayUsers user={user} />
                            </div>
                        ))
                    ) : (
                        <div className="py-2 px-4">No users found</div>
                    )}
                </div>
            )}
        </div>
    );
}
