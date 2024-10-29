"use server";

import prisma from "@/prisma/db";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const signIn = async (username: string, password: string) => {
  let isAuth = false;

  try {
    if (username && password) {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
          password: password,
        },
        select: {
          id: true,
          privilege: true,
        },
      });

      if (user) {
        await createSession(user.id);

        isAuth = true;
        return { ok: true, user: user };
      }
    } else {
      return { ok: false };
    }
  } catch (error: any) {
    console.error(`Something wrong when signing in : ${error.message}`);
  } finally {
    if (isAuth) redirect("/dashboard");
  }
};

export const logOut = async (id: string) => {
  await deleteSession(id);
};
