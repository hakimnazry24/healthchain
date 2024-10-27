import React from "react";
import { BsHospitalFill } from "react-icons/bs";

const Header = () => {
  return (
    <div className="">
      <div className="flex flex-nowrap gap-x-5 items-center p-5 px-10">
          <BsHospitalFill size={23}/>
          <h1 className="font-semibold text-2xl">HealthChain</h1>
      </div>
      <hr className=" border-b-2 border-secondary"/>
    </div>
  );
};

export default Header;
