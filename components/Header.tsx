"use client";

import { logOut } from "@/util/auth/auth";
import React from "react";
import { BsHospitalFill } from "react-icons/bs";

const Header = ({ userId }: { userId: string }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center m">
        <div className="flex flex-nowrap gap-x-5 items-center p-5 px-10">
          <BsHospitalFill size={23} />
          <h1 className="font-semibold text-2xl">HealthChain</h1>
        </div>
        {userId && (
          <button
            className="px-4 py-2 rounded-md font-semibold text-white bg-red-500 mr-5"
            onClick={() => logOut(userId)}
          >
            Log out
          </button>
        )}
      </div>
      <hr className=" border-b-2 border-secondary" />
    </div>
  );
};

export default Header;
