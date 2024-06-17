import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function EditBannerPic({ BannerImage, setBannerImage, banner }) {
  const [displayBanner, setDisplayBanner] = useState();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setBannerImage(file);
      // The reader is used to display the selected image on the DOM
      const reader = new FileReader();

      reader.onload = () => {
        setDisplayBanner(reader.result);
      };

      reader.readAsDataURL(file);
    },
    [BannerImage]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <section {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {displayBanner ? (
          <img
            src={displayBanner.toString()}
            className="   h-48 md:h-[250px] w-full"
          />
        ) : (
          <div className="cursor-pointer">
            <img src={banner} className=" h-48 md:h-[250px] w-full" />
          </div>
        )}
      </section>
    </>
  );
}
