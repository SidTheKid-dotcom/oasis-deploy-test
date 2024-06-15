import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';

import { useState } from "react";
import ReactPlayer from "react-player";

export default function UploadImage({ uploadFile, setUploadedFile, values }) {
  const [displayImage, setDisplayImage] = useState((values.media_type === 'image') ? values.media : null);
  const [displayVideo, setDisplayVideo] = useState((values.media_type === 'video') ? values.media : null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const fileType = file.type;

    const isImage = fileType.startsWith('image/');
    const isVideo = fileType.startsWith('video/');

    if (isVideo) {
      setDisplayImage(null);
      setDisplayVideo(URL.createObjectURL(file));
    } else if (isImage) {
      setDisplayVideo(null);
      const reader = new FileReader();
      reader.onload = () => {
        setDisplayImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setDisplayImage(null);
      setDisplayVideo(null);
      alert('Unsupported file format');
    }
  }, [uploadFile]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {displayImage && (
        <img src={displayImage.toString()} alt="Uploaded" width="150px" />
      )}
      {displayVideo && (
        <ReactPlayer url={displayVideo} controls width="100%" height="auto" />
      )}
      {(!displayVideo && !displayImage) && (
        <div className="w-full min-h-[250px] flex flex-col items-center justify-center border-4 border-dashed border-gray-600 rounded-[7px]">
          <img src="/image-regular.svg" alt="Tick" width="70px" />
          <span className="mt-3 p-2 text-white text-center text-xl">
            Drag & Drop your images or videos here
          </span>
          <span className="p-2 text-gray-500 text-center text-md">
            or{" "}
            <u className="cursor-pointer text-white">browse</u> from gallery
          </span>
        </div>
      )}
    </section>
  );
}
