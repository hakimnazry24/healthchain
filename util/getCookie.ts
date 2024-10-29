"use server";

import { cookies } from "next/headers";

const getCookie = () => {
  const cookie = cookies().get("userId");
  const userId = cookie?.value;

  if (cookie && userId) {
    return userId;
  } else {
    console.error(`No cookie and userId found`);
  }
};

export default getCookie;
