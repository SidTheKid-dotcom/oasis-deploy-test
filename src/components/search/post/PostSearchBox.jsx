import { useEffect, useState } from "react";
import axios from "axios";

import { MdOutlineSearch } from "react-icons/md";

export default function PostSearchBox({ setPosts, originalPosts }) {
    const [search, setSearch] = useState('');
    const [isRequesting, setIsRequesting] = useState(false);

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {

        setHasMounted(true);

        let delaySearch;

        const getPosts = async () => {
            if (search.trim() !== '') {
                setIsRequesting(true);

                console.log(search);

                try {
                    const response = await axios.post(`http://3.110.161.150:4000/search/post`, {
                        query: search
                    });
                    setPosts(response.data);

                    setIsRequesting(false);
                } catch (error) {
                    console.log('Error occurred in sending search request: ', error);
                }
            } else {
                // If search query is empty, reset the posts to original
                if(hasMounted)   setPosts(originalPosts);
            }
        }

        delaySearch = setTimeout(getPosts, 200);

        return () => clearTimeout(delaySearch);

    }, [search]);


    const handleChange = (value) => {
        setSearch(value);
    }

    return (
        <div className="relative text-white pixel-text w-full flex flex-row justify-end">
            <input
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-[5px] bg-slate-900"
                onChange={(e) => handleChange(e.target.value)}
                value={search}
            />
          <MdOutlineSearch size={25} color="white" className=" my-auto absolute top-[0.5rem]" />
        </div>
    );
}
