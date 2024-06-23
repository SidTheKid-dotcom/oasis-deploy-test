"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/context/authContext";

import TextFields from "../../../components/create/TextFields";
import UploadImage from "../../../components/create/UploadImage";
import Buttons from "../../../components/create/Buttons";

import LoadingSpinner from "@/components/animations/LoadingSpinner";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreatePost({ displayType, placeholders }) {
  const { token, navBarData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State management of text input fields
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [words, setWords] = useState(0);
  const [loading, setLoading] = useState(false);

  // State management of image input field
  const [uploadedFile, setUploadedFile] = useState(null);

  // State management of the communities of the user
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState({
    community_id: searchParams.get("communityId"),
    community_name: searchParams.get("communityName"),
  });

  // Final submit action of the user
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!body && !title) {
      alert('Post Body Cannot Be Empty');
      return;
    }

    if (!selectedCommunity.community_id) {
      alert('Please select a community');
      return;
    }

    // Sending data as form-data to encode our image over the network call
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('media', uploadedFile);
    formData.append('community_id', parseInt(selectedCommunity.community_id));
    formData.append('community_name', selectedCommunity.community_name);

    //Send post request for creating the post
    try {
      setLoading(true);
      await axios.post('https://oasis-api.xyz/api/post/create', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast('Post created successfully', {
        position: 'top-right',
        className: 'bg-black text-white pixel-text border border-solid border-green-400'
      })
      setTimeout(() => {
        setLoading(false);
        router.back();
      }, 700)
      //navigate back to home page { useNavigate hook from react-router-dom } 
    } catch (error) {
      console.log("Error occured in creating post: ", error);
      setLoading(false);
      toast('Couldn\'t create post', {
        position: 'top-right',
        className: 'bg-black text-white pixel-text border border-solid border-red-500'
      })
    }
  };

  // Fetch the communities of the user on mount
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        //Extract the user token from the cookie
        const response = await axios.get('https://oasis-api.xyz/api/community/all', {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
        );
        setCommunities(response.data);
      } catch (error) {
        console.log("error occured while fetching user communities: ", error);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="m-4 p-4 bg-black pixel-text w-[94.5%] lg:w-[60%] rounded-[5px] text-white flex flex-col gap-4 mb-[70%] md:mb-0">
      <Toaster />
      <section>
        <h1>CREATE {displayType}</h1>
      </section>
      {
        loading && (
          <div className="absolute inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <LoadingSpinner />
          </div>
        )}

      <div className="flex flex-col gap-4">
        <TextFields
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          words={words}
          setWords={setWords}
          placeholders={placeholders}
        />

        <UploadImage
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
        />

        <Buttons
          communities={communities}
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
