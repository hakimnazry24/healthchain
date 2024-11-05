import React from "react";

const PatientPage = ({ params }: { params: { patientId: string } }) => {
  return <div>{params.patientId}</div>;
};

export default PatientPage;
