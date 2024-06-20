// app/layout.js or app/layout.jsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileNav from "@/components/layout/MobileNav";
import { AuthProvider, useAuth } from "@/context/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </AuthProvider>
    </html>
  );
}

function LayoutContent({ children }) {
  const { token } = useAuth();

  const renderAuthenticatedLayout = () => (
    <>
      <Sidebar />
      <div className="w-full flex flex-col">
        <TopBar />
        <MobileNav />
        <div style={{ height: "100%" }}>
          <div className="overflow-y-auto scrollbar-hide  md:h-[85%] h-[790px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );

  const renderUnauthenticatedLayout = () => (
    <div className="md:my-[-3.5rem] flex-grow flex items-start justify-center">
      {children}
    </div>
  );

  return (
    <>
      {token && (
        <div className=" fixed md:top-0 md:left-0 md:right-0 md:bottom-0  md:my-10 md:mx-[8%]  md:bg-black    md:bg-opacity-80 z-10 md:rounded-2xl md:shadow-xl md:shadow-blue-500">
          <div className="md:my-10 md:mb-0 md:mx-4 md:p-4 md:flex z-10 h-full">
            {token
              ? renderAuthenticatedLayout()
              : renderUnauthenticatedLayout()}
          </div>
        </div>
      )}
      <div className="md:my-10 md:mx-[8%] md:p-4 md:flex z-10 min-h-screen">
        {!token && renderUnauthenticatedLayout()}
      </div>
    </>
  );
  //    return (
  //     <>
  //       {token && (
  //         <div className="hidden md:block">
  //           <div className="fixed top-0 left-0 right-0 bottom-0 bg-black my-10 mx-[8%] opacity-75 z-[-10] rounded-2xl shadow-xl shadow-blue-500"></div>
  //         </div>
  //       )}
  //       <div className="md:my-10 md:mx-[8%] md:p-4 md:flex z-10 min-h-screen">
  //         {token ? renderAuthenticatedLayout() : renderUnauthenticatedLayout()}
  //       </div>
  //     </>
  //   );
}
