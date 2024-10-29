import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const formData = await req.formData();

    const patientId = formData.get("patientId")?.toString();

    const deletedPatient = await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });

    if (deletedPatient) {
      return NextResponse.json(
        {},
        { status: 200, statusText: "Succesfully delete patienet" }
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to delete patient : ${error.message}`);
  }
}

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const insurance = formData.get("insurance");
    const patientId = formData.get("patientId");

    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId?.toString(),
      },
      data: {
        name: name?.valueOf() as string,
        age: parseInt(age?.toString()!),
        sex: sex?.toString()!,
        email: email?.toString()!,
        phone: phone?.toString()!,
        insurance: insurance?.toString()!,
      },
    });

    if (updatedPatient) {
      return NextResponse.json(
        {},
        { status: 200, statusText: "Patient successfully updated" }
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to update patient : ${error.message}`);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const insurance = formData.get("insurance");

    const patient = await prisma.patient.create({
      data: {
        name: name?.valueOf() as string,
        age: parseInt(age?.toString()!),
        sex: sex?.toString()!,
        email: email?.toString()!,
        phone: phone?.toString()!,
        insurance: insurance?.toString()!,
      },
    });

    if (patient) {
      return NextResponse.json(
        { message: "Patient successfully createad" },
        { status: 200 }
      );
    } else {
      throw new Error("Unsuccesful creating new patient");
    }
  } catch (error: any) {
    throw new Error(`Error when creating new patient : ${error.message}`);
  }
}
