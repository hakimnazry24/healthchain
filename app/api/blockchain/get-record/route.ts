import { NextRequest, NextResponse } from "next/server";
import getRecord from "@/blockchain/getRecord";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const patientId = searchParams.get("patientId");

  try {
    const record = await getRecord(patientId);

    if (!record) {
      return NextResponse.json(
        { message: "No record for associated ID " },
        { status: 404 }
      );
    } else {
      return NextResponse.json(record, { status: 200 });
    }
  } catch (error: any) {
    console.error(
      `Failed to get record for patient id ${patientId} : ${error.message}`
    );
  }
}
