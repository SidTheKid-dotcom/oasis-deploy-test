"use client";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

const BASE_URL = "https://oasis-api.xyz";

export default function Form() {
  const [mode, setMode] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BASE_URL + "/api/user/login", {
        user_cred: email,
        password: password,
      });
      const { data, status } = await response;
      setMessage(data.message);
      setLoading(false);
      if (status === 200 && data.token) {
        login("Bearer " + data.token);
        router.push("/");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  };

  const signUp = async () => {
    try {
      setLoading(true);
      if (password === conpassword) {
        const response = await axios.post(BASE_URL + "/api/user/register", {
          username: username,
          email: email,
          password: password,
        });
        const { data, status } = await response;
        setMessage(data.message);
        if (status === 201 && data.token) {
          login("Bearer " + data.token);
          router.push("/");
        }
        setLoading(false);
      } else {
        setMessage("Passwords do not match");
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-black p-8 w-full max-w-md mx-auto rounded-2xl text-white">
      <div className="text-2xl text-center mb-6 text-white pixel-text">
        {mode}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          className={`py-2 rounded pixel-text ${
            mode === "Sign In"
              ? "bg-blue-500 text-white"
              : "bg-transparent border border-white text-white"
          }`}
          onClick={() => setMode("Sign In")}
        >
          Sign In
        </button>
        <button
          className={`py-2 rounded pixel-text ${
            mode === "Sign Up"
              ? "bg-blue-500 text-white"
              : "bg-transparent border border-white text-white"
          }`}
          onClick={() => setMode("Sign Up")}
        >
          Sign Up
        </button>
      </div>
      {mode === "Sign In" && (
        <div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block pixel-text text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white open-sans"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white pixel-text">
                Password
              </label>
              <input
                id="password"
                required
                type="password"
                className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              className="w-full py-2 rounded pixel-text bg-pink-500 hover:bg-pink-600 transition duration-300"
              onClick={signIn}
            >
              {loading ? <BeatLoader color="white" size={10} /> : "Sign In"}
            </button>
          </div>
          <div className="mt-4 text-center">{message}</div>
        </div>
      )}
      {mode === "Sign Up" && (
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-white pixel-text">
              Username
            </label>
            <input
              id="username"
              required
              type="text"
              className="open-sans w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="signup-email"
              className="block text-white pixel-text"
            >
              Email
            </label>
            <input
              id="signup-email"
              required
              type="email"
              className="open-sans w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="signup-password"
              className="block pixel-text text-white"
            >
              Password
            </label>
            <input
              id="signup-password"
              required
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="block pixel-text text-white"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              required
              type="password"
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              onChange={(e) => setConpassword(e.target.value)}
            />
          </div>
          <div className="mt-6 text-center">
            <button
              className="w-full py-2 pixel-text rounded bg-pink-500 hover:bg-pink-600 transition duration-300"
              onClick={signUp}
            >
              {loading ? <BeatLoader color="white" size={10} /> : "Sign Up"}
            </button>
          </div>
          <div className="mt-4 text-center">{message}</div>
        </div>
      )}
      <Link href="https://docs.oasissocial.in/intro">
      <div className="pixel-text text-[0.7rem] text-gray-400 text-center">Read about OASIS!!</div>
      </Link>
      <Link href="https://docs.oasissocial.in/privacy">
      <div className="mt-[10px] mb-[5px] text-center pixel-text text-[0.5rem] text-gray-400">Privacy</div>
      </Link>
      <Link href="https://docs.oasissocial.in/terms">
      <div className="pixel-text text-center text-[0.5rem] text-gray-400">terms and conditions</div>
      </Link>
    </div>
  );
}
