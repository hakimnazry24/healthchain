"use server";

import prisma from "@/prisma/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createSession = async (id: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    const session = await prisma.session.create({
      data: {
        userId: id,
        expiresAt: expiresAt,
      },
    });

    if (session) {
      cookies().set("userId", id, {
        expires: expiresAt,
        path: "/",
      });
    }
  } catch (error: any) {
    console.error(`Failed to create session : ${error.message}`);
  }
};

export const deleteSession = async (id: string) => {
  let isLoggedOut = false;

  try {
    const session = await prisma.session.delete({
      where: {
        userId: id,
      },
    });

    if (session) {
      cookies().delete("userId");
      isLoggedOut = true;
    }
  } catch (error: any) {
    console.error(`Failed to delete session from database : ${error.message}`);
  } finally {
    if (isLoggedOut) redirect("/");
  }
};
