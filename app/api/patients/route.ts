import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const patients = await prisma.patient.findMany();

    if (patients) {
      return NextResponse.json(patients, { status: 200 });
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
