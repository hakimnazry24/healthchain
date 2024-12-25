import prisma from "@/prisma/db";
import { Patient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import createRecord from "@/blockchain/createRecord";
import updateRecord from "@/blockchain/updateRecord";
// api for delete patient
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

// api for update patient
export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();

    // const name = formData.get("name");
    // const age = formData.get("age");
    // const sex = formData.get("sex");
    // const email = formData.get("email");
    // const phone = formData.get("phone");
    // const insurance = formData.get("insurance");
    // const patientId = formData.get("patientId");

    const rawPatient = formData.get("patient") as string;
    const parsed = JSON.parse(rawPatient);
    const patientId = parsed.id;
    const patient: Partial<Patient> = {
      name: parsed.name,
      address: parsed.address,
      age: parsed.age,
      allergies: parsed.allergies,
      bloodType: parsed.blood_type,
      chronicConditions: parsed.chronic_condition,
      currentMedication: parsed.current_medication,
      email: parsed.email,
      emergencyContact: {
        emergencyContactName: parsed.emergency_contact_name,
        emergencyContactNumber: parsed.emergency_contact_phone_number,
        relationshipToPatient: parsed.emergency_contact_relationship,
      },
      insurance: parsed.insurance,
      languagePreference: parsed.language_preference,
      maritalStatus: parsed.marital_status,
      notes: parsed.notes,
      occupation: parsed.occupation,
      sex: parsed.sex,
      phone: parsed.phone_number,
      secondaryPhone: parsed.secondary_phone,
    };

    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId,
      },
      data: patient,
    });

    if (updatedPatient) {
      const patientId = updatedPatient.id;
      const parsedRecord = JSON.stringify(updatedPatient);
      const hashedRecord = crypto
        .createHash("sha256")
        .update(parsedRecord)
        .digest("hex");

      const receipt = await updateRecord(patientId, hashedRecord);

      return NextResponse.json(
        { message: receipt },
        { status: 200, statusText: "Patient successfully updated" }
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to update patient : ${error.message}`);
  }
}

// api for create patient
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
      const patientId = patient.id;
      const patientName = patient.name;
      const parsedData = JSON.stringify(patient);
      const recordHash = crypto
        .createHash("sha256")
        .update(parsedData)
        .digest("hex");

      const receipt = await createRecord(patientId, patientName, recordHash);

      return NextResponse.json({ message: receipt }, { status: 200 });
    } else {
      throw new Error("Unsuccesful creating new patient");
    }
  } catch (error: any) {
    throw new Error(`Error when creating new patient : ${error.message}`);
  }
}

// api for get patient
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const patientId = searchParams.get("patientId");

    if (!patientId)
      return NextResponse.json({ message: "Bad response" }, { status: 400 });

    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId as string,
      },
    });

    if (patient) return NextResponse.json(patient, { status: 200 });
    else
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
  } catch (error) {
    throw error;
  }
}
