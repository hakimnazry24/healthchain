"use server";

import prisma from "@/prisma/db";
import { createSession } from "./session";
import { redirect } from "next/navigation";

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
        return { ok: true };
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
  try {
    const logOut = await prisma.session.delete({
      where: {
        userId: id,
      },
    });

    redirect("/");
  } catch (error: any) {
    console.error(`Failed to log out : ${error.message}`);
  }
};
