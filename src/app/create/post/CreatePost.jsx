"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";

import TextFields from "../../../components/create/TextFields";
import UploadImage from "../../../components/create/UploadImage";
import Buttons from "../../../components/create/Buttons";

export default function CreatePost({ displayType, placeholders }) {

  const { token } = useAuth();

  // State management of text input fields
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [words, setWords] = useState(0);

  // State management of image input field
  const [uploadedFile, setUploadedFile] = useState(null);

  // State management of the communities of the user
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState({});

  const [displayMessage, setDisplayMessage] = useState(false);


  // Final submit action of the user

  const handleSubmit = async () => {

    event.preventDefault();

    // Sending data as form-data to encode our image over the network call

    const formData = {
      title: title,
      body: body,
      media: uploadedFile,
      community_id: parseInt(selectedCommunity.community_id),
      community_name: selectedCommunity.community_name
    }
    //Send post request for creating the post

    try {
      const response = await axios.post('https://oasis-api.xyz/api/post/create', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 201)
      {
        setDisplayMessage(true);
      };
      //navigate back to home page { useNavigate hook from react-router-dom } 
    }
    catch (error) {
      console.log("Error occured in creating post: ", error)
    }
  }

  // Fetch the communities of the user on mount

  useEffect(() => {

    const fetchCommunities = async () => {
      try {

        //Extract the user token from the cookie
        const token = localStorage.getItem('token');

        const response = await axios.get('https://oasis-api.xyz/api/community/all', {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        setCommunities(response.data);
      }
      catch (error) {
        console.log("error occured while fetching user communities: ", error);
      }
    }

    fetchCommunities();
  }, [])

  return (
    <div className="m-4 p-4 bg-black pixel-text w-[94.5%] lg:w-[60%] rounded-[5px] text-white flex flex-col gap-4">
      <section>
        <h1>CREATE {displayType}</h1>
      </section>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <TextFields setTitle={setTitle} body={body} setBody={setBody} words={words} setWords={setWords} placeholders={placeholders}/>

        <UploadImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

        <Buttons communities={communities} setSelectedCommunity={setSelectedCommunity} />
      </form>
    </div>
  );
}