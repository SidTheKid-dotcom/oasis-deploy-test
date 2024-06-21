"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
export default function EditProfilePic({
  ProfileImage,
  setProfileImage,
  icon,
}) {
  const [displayProfile, setdisplayProfile] = useState();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileType = file.type;
      const isImage = fileType.startsWith("image/");
      if (isImage) {
        setProfileImage(file);

        const reader = new FileReader();

        reader.onload = () => {
          setdisplayProfile(reader.result);
        };
      } else {
        alert("Unsupported file format");
      }

      reader.readAsDataURL(file);
    },
    [ProfileImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <section {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {displayProfile ? (
          <div className=" flex justify-center cursor-pointer">
            <img
              src={displayProfile.toString()}
              alt=""
              className="  rounded-full  w-20 h-20 md:w-28
            md:h-28   z-20 absolute md:mt-[-13%]  mt-[-10%]     "
            />
          </div>
        ) : (
          <div className=" flex justify-center cursor-pointer">
            <img
              src={icon}
              alt=""
              className=" rounded-full   object-cover w-20 h-20 md:w-28
                md:h-28   z-20 absolute md:mt-[-13%]  mt-[-10%]    "
            />
          </div>
        )}
      </section>
    </>
  );
}
