import prisma from "@/prisma/db";
import { PrivilegeEnum } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
   
    const formData = await req.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const privilege = formData.get("privilege")?.toString();

    if (!username || !password || !privilege) {
      return NextResponse.json({
        message: "Bad request",
        status: 400,
      });
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        privilege: privilege as PrivilegeEnum,
      },
    });

    if (user) {
      return NextResponse.json(
        { data: user, message: "Succesfully create user" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error(`failed to create user : ${error.message}`);
    return NextResponse.json(
      { message: "failed to create user" },
      { status: 500 }
    );
  }
}
