import { PatientType } from "@/type";
import { Patient } from "@prisma/client";
import React from "react";

const TableRow = ({ patient }: { patient: Patient }) => {
  return (
    <tr>
      <td className="p-5 border border-secondary">{patient.name}</td>
      <td className="p-5 border border-secondary">{patient.age}</td>
      <td className="p-5 border border-secondary">{patient.sex}</td>
      <td className="p-5 border border-secondary">{patient.email}</td>
      <td className="p-5 border border-secondary">{patient.phone}</td>
      <td className="p-5 border border-secondary">{patient.insurance}</td>
    </tr>
  );
};

export default TableRow;
