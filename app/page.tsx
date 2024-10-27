"use client";

import { signIn } from "@/util/auth/auth";
import React, { FormEvent } from "react";
import { useState } from "react";

const HomePage = () => {
  const [status, setStatus] = useState("idle");
  const [isPending, setIsPending] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await signIn(username, password);

      if (!res?.ok) {
        setStatus("fail");
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      } else {
        
      }
    } catch (error: any) {
      console.error(`Failed to login : ${error.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="m-32 2xl:m-52">
      <h1 className="text-center text-2xl font-semibold my-20">
        Log in to HealthChain
      </h1>
      <div className="flex justify-center">
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="username" className="block font-semibold mb-3">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="rounded-md p-2 bg-secondary font-semibold w-[400px]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block font-semibold mb-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="rounded-md p-2 bg-secondary font-semibold w-[400px]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <input type="checkbox" name="remember_me" id="remember_me" />
          <label htmlFor="remember_me" className="font-semibold ml-2 ">
            Remember me
          </label> */}
          <button
            type="submit"
            className="bg-blue-600 w-full py-2 rounded-md font-semibold mt-5"
          >
            Login
          </button>
          {status === "fail" ? (
            <p className="text-red-500 text-left">Wrong username or password</p>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default HomePage;
