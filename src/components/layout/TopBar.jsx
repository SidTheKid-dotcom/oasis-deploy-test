'use client'

import React, { useState } from "react";
import UserSearchBox from "../search/user/UserSearchBox";
import { MdOutlineSearch } from "react-icons/md";
import Profile from "./profile";

export default function TopBar() {
    const [renderSearchBox, setRenderSearchBox] = useState(false);

    const handleClick = () => {
        setRenderSearchBox(!renderSearchBox);
    };

    const handleBlur = () => {
        setRenderSearchBox(false);
    };

    return (
        <div className="hidden md:flex justify-end sticky top-16 z-50">
            {renderSearchBox ? (
                <UserSearchBox onBlur={handleBlur} />
            ) : (
                <button onClick={handleClick}>
                    <MdOutlineSearch size={35} color="white" className="my-auto absolute right-[6rem] top-[1rem]" />
                </button>
            )}
            <Profile/>
        </div>
    );
}
