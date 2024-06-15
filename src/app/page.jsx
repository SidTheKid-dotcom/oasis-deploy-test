'use client'
import GlobalFeedPage from "./global-feed/page";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { token } = useAuth();

  return (
    <div>
      {token ? <GlobalFeedPage /> : null}
    </div>
  );
}