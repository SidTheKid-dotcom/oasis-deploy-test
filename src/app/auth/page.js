"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginLayout from "../../components/auth/LoginLayout";
import { useAuth } from "@/context/authContext";

function Auth() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return <div className="h-[100%] w-3/4">{token ? null : <LoginLayout />}</div>;
}

export default Auth;
