import axios from "axios";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

import TextFields from "../TextFields";
import EventDetails from "./EventDetails";
import EventType from "./EventType";
import UploadImage from "../UploadImage";

export default function UpdateEvent({ displayType, values }) {

  // State management of text input fields
  const [title, setTitle] = useState(values.title);
  const [body, setBody] = useState(values.description);
  const [words, setWords] = useState(values.description.split(' ').length);

  const { token } = useAuth();

  const [timeChanged, setTimeChanged] = useState({
    start: false,
    end: false
  });

  const [eventType, setEventType] = useState(values.type);
  const [eventDetails, setEventDetails] = useState({
    venue: values.venue,
    startDate: values.start.split('T')[0],
    endDate: values.end.split('T')[0],
    startTime: values.start.split('T')[1].split('.')[0],
    endTime: values.end.split('T')[1].split('.')[0],
  });

  // State management of image input field
  const [uploadedFile, setUploadedFile] = useState(values.media);

  // Final submit action of the user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: 7,
      title: title,
      description: body,
      updatedMedia: uploadedFile,
      type: eventType.toUpperCase(), 
      venue: eventDetails.venue,
      start: (timeChanged.start &&  timeChanged.end) ? eventDetails.startDate + "T" + eventDetails.startTime + ":00.000Z" : eventDetails.startDate + "T" + eventDetails.startTime,
      end: (timeChanged.start &&  timeChanged.end) ? eventDetails.endDate + "T" + eventDetails.endTime + ":00.000Z" : eventDetails.endDate + "T" + eventDetails.endTime,
    }

    try {
      const response = await axios.put(
        'http://3.110.161.150:4000/api/event/updateevent', formData,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response.data);

      // Navigate back to events page if response.status is 201
    } catch (error) {
      console.log("Error occurred in updating event: ", error);
    }
  };

  return (
    <div className="m-4 p-4 bg-gray-800 w-[60%] rounded-[5px] text-white flex flex-col gap-4">
      <section>
        <h1>Update {displayType}</h1>
      </section>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <TextFields title={title} setTitle={setTitle} body={body} setBody={setBody} words={words} setWords={setWords} values={values} />

        <EventType eventType={eventType} setEventType={setEventType} />

        <EventDetails eventDetails={eventDetails} setEventDetails={setEventDetails} timeChanged={timeChanged} setTimeChanged={setTimeChanged} />

        <UploadImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} values={values}/>

        <section className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="py-2 px-5 bg-black rounded-[5px] w-[120px]">Share</button>
        </section>
      </form>
    </div>
  );
}