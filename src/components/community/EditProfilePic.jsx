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

        reader.readAsDataURL(file);
      } else {
        setProfileImage(null);
        alert("Unsupported file format");
      }
    },
    [ProfileImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <section {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {displayProfile ? (
          <div className="flex justify-center cursor-pointer">
            <img
              src={displayProfile.toString()}
              alt=""
              className="rounded-full w-20 h-20 md:w-28 md:h-28 z-20 absolute md:mt-[-13%] mt-[-10%] object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-center object-cover cursor-pointer">
            <img
              src={icon === "" ? "/default_community_profile.png" : icon}
              alt=""
              className="rounded-full object-cover w-20 h-20 md:w-28 md:h-28 z-20 absolute md:mt-[-13%] mt-[-10%]"
            />
          </div>
        )}
      </section>
    </>
  );
}
