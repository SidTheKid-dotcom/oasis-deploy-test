"use client"

import axios from "axios";
import { useState } from "react";

import { useAuth } from "@/context/authContext";

import TextFields from "../../../components/create/TextFields";
import EventDetails from "../../../components/create/event/EventDetails";
import EventType from "../../../components/create/event/EventType";
import UploadImage from "../../../components/create/UploadImage";

export default function CreateEvent({ displayType, placeholders }) {

  const { token } = useAuth();

  // State management of text input fields
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [words, setWords] = useState(0);

  const [eventType, setEventType] = useState('SOCIAL');
  const [eventDetails, setEventDetails] = useState({
    venue: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });

  // State management of image input field
  const [uploadedFile, setUploadedFile] = useState(null);

  // Final submit action of the user

  const handleSubmit = async () => {

    event.preventDefault();

    // Sending data as form-data to encode our image over the network call

    const formData = {
      title: title,
      description: body,
      media: uploadedFile,
      type: eventType.toUpperCase(), 
      venue: eventDetails.venue,
      start: eventDetails.startDate + "T" + eventDetails.startTime + ":00.000Z",
      end: eventDetails.endDate + "T" + eventDetails.endTime + ":00.000Z",
    }

    //Send post request for creating the post

    try {
      const response = await axios.post('https://oasis-api.xyz/api/event/createevent', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // navigate back to events page is response.statsus is 201
    }
    catch (error) {
      console.log("Error occured in creating post: ", error)
    }
  }

  return (
    <div className="m-4 p-4 bg-gray-800 w-[60%] rounded-[5px] text-white flex flex-col gap-4">
      <section>
        <h1>Update {displayType}</h1>
      </section>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <TextFields setTitle={setTitle} body={body} setBody={setBody} words={words} setWords={setWords} placeholders={placeholders} />

        <EventType eventType={eventType} setEventType={setEventType} />

        <EventDetails eventDetails={eventDetails} setEventDetails={setEventDetails} />

        <UploadImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />

        <section className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="py-2 px-5 bg-black rounded-[5px] w-[120px]">Share</button>
        </section>
      </form>
    </div>
  );
}