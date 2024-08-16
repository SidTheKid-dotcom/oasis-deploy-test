"use client";
import Form from "./form";

export default function LoginLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="glassmorphism relative md:p-8 flex flex-col md:flex-row w-full h-auto md:h-[700px]">
        {/* <marquee className="absolute z-10 p-[1.75rem] text-white text-lg font-bold">
          👩‍🎓 Cummins 🔥 PICT 🎓 VIT 🏛 COEP 🚀 MIT 🏫 BVDUCOE 🛡 AIT 🌄 SCOE 🌐 MIT-WPU 🩺 DYPIET 🏅 AISSMS 🏆 PCCOE 🎯 RSCOE 🌟 ICEM 🔧 ZCOER 🎒 JSCOE
        </marquee> */}
        <div className="flex flex-col mt-[3rem] justify-center items-center md:items-start  w-full md:w-1/2">
          <figure className="m-4 flex flex-row justify-center w-full mx-[-0.3rem]">
            <img src="/primary-logo.png" width="130px" height="130px" alt="Logo" />
          </figure>
          <div className="flex flex-row justify-center w-full">
            <div className="border border-white rounded-full text-white px-5 py-2 pixel-text">
              Oasis
            </div>
          </div>
          <div className="text-white mt-2 px-1 text-md md:text-2xl text-center w-full pixel-text">
            Welcome<span className="hidden md:inline"><br /></span> Aboard!
          </div>

        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 mt-8 md:mt-0">
          <Form />
        </div>
      </div>
    </div>
  );
}
