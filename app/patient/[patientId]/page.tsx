"use client";
import { Patient } from "@prisma/client";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import React from "react";

interface FormState {
  name: string;
}

const PatientPage = ({ params }: { params: { patientId: string } }) => {
  const patientId = params.patientId;
  const [patient, setPatient] = useState<Patient>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessUpdaet, setIsSuccessUpdaet] = useState(false);

  const [Name, setName] = useState("");
  const [patientForm, setPatientForm] = useState<Patient>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev!, [name]: value }));
  };

  const getPatientDetails = async () => {
    try {
      const url = `/api/patient?patientId=${patientId}`;

      const res = await fetch(url, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setPatient(data);
        setPatientForm(data);
      }
    } catch (error: any) {
      console.error(
        `Failed to get patient details for patient ID ${patientId} :${error.message}`
      );
    }
  };

  const handleUpdatePatient = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("patient", JSON.stringify(patientForm));

      const res = await fetch("/api/patient", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        setIsSuccessUpdaet(true);
        setTimeout(() => {
          setIsSuccessUpdaet(false);
        }, 2000);
      }
    } catch (error: any) {
      console.error(`Failed to update patient : ${error.message}`);
    } finally {
      setIsLoading(false);
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, []);

  const onEditMode = () => setIsEditMode(!isEditMode);

  return (
    <div className="w-2/3 mx-auto">
      {isEditMode && (
        <div className=" w-full bg-red-500 font-semibold p-3 text-center">
          You are currently in Edit Mode
        </div>
      )}
      <div className="flex justify-between items-center mt-10">
        <div>
          <h1 className="text-2xl font-semibold">Patient Details</h1>
          <h3 className="text-">Patient ID : {patient?.id}</h3>
        </div>

        <div className="flex items-center gap-x-3">
          {isSuccessUpdaet && <p className="text-green-500">Successfully update patient</p>}
          {isEditMode && (
            <button
              className="font-semibold text-white bg-green-500 rounded-md p-2"
              onClick={handleUpdatePatient}
            >
              {isLoading ? "Saving" : "Save"}
            </button>
          )}
          <button
            className="rounded-md bg-gray-500 text-white p-2"
            onClick={onEditMode}
          >
            {isEditMode ? "Off Edit Mode" : "On Edit Mode"}
          </button>
        </div>
      </div>
      <div className="my-5">
        <h2 className="text-xl font-semibold mb-5">General Information</h2>

        {/* general information section */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className="w-full text-black"
              defaultValue={patient?.name}
              disabled={!isEditMode}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>
              <label htmlFor="age" className="block">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                onChange={handleChange}
                className="text-black"
                defaultValue={patient?.age}
                disabled={!isEditMode}
              />
            </div>
            <div>
              <label htmlFor="sex" className="block">
                Sex
              </label>
              <select
                name="sex"
                onChange={handleChange}
                id="sex"
                className="text-black w-full"
                defaultValue={patient?.sex}
                disabled={!isEditMode}
              >
                <option value="">Select</option>
                <option value="Male" selected={patient?.sex === "Male" && true}>
                  Male
                </option>
                <option
                  value="Female"
                  selected={patient?.sex === "Female" && true}
                >
                  Female
                </option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <textarea
              onChange={handleChange}
              defaultValue={patient?.address || ""}
              disabled={!isEditMode}
              name="address"
              id="address"
              rows={5}
              className="w-full text-black"
            ></textarea>
          </div>

          <div>
            <label htmlFor="occupation" className="block">
              Occupation
            </label>
            <input
              defaultValue={patient?.occupation || ""}
              onChange={handleChange}
              disabled={!isEditMode}
              type="text"
              name="occupation"
              id="occupation"
              className="w-full text-black"
            />
          </div>

          <div>
            <label htmlFor="marital_status">Marital status</label>
            <select
              onChange={handleChange}
              disabled={!isEditMode}
              name="marital_status"
              id="marital_status"
              className="w-full text-black"
            >
              <option value="">Select</option>
              <option
                value="single"
                selected={patient?.maritalStatus === "single" && true}
              >
                Single
              </option>
              <option
                value="married"
                selected={patient?.maritalStatus === "married" && true}
              >
                Married
              </option>
              <option
                value="divorced"
                selected={patient?.maritalStatus === "divorced" && true}
              >
                Divorced
              </option>
              <option
                value="widowed"
                selected={patient?.maritalStatus === "widowed" && true}
              >
                Widowed
              </option>
            </select>
          </div>
        </div>

        {/* contact information section */}
      </div>
      <hr className="my-10" />
      <h2 className="text-lg font-semibold mb-5">Contact Information</h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <div>
          <label htmlFor="phone_number" className="block">
            Phone number
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="phone_number"
            id="phone_number"
            className="w-full text-black"
            defaultValue={patient?.phone}
            disabled={!isEditMode}
          />
        </div>

        <div>
          <label htmlFor="secondary_phone">Secondary phone number</label>
          <input
            type="text"
            onChange={handleChange}
            name="secondary_phone"
            id="secondary_phone"
            className="w-full text-black"
            disabled={!isEditMode}
            defaultValue={patient?.secondaryPhone || "-"}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            id="email"
            className="w-full text-black"
            defaultValue={patient?.email}
            disabled={!isEditMode}
          />
        </div>

        <div>
          <label htmlFor="language_preference" className="block">
            Language preference
          </label>
          <select
            onChange={handleChange}
            disabled={!isEditMode}
            name="language_preference"
            id="language_preference"
            className="w-full text-black"
          >
            <option value="">Select</option>
            <option
              value="english"
              selected={patient?.languagePreference === "english"}
            >
              English
            </option>
            <option
              value="malay"
              selected={patient?.languagePreference === "malay"}
            >
              Malay
            </option>
          </select>
        </div>
      </div>

      {/* emergency contact information */}
      <hr className="my-10" />
      <h2 className="text-xl font-semibold mb-5">
        Emergency Contact Information
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <div>
          <label htmlFor="emergency_contact_name" className="block">
            Emergency contact name
          </label>
          <input
            onChange={handleChange}
            defaultValue={patient?.emergencyContact?.emergencyContactName}
            disabled={!isEditMode}
            type="text"
            name="emergency_contact_name"
            id="emergency_contact_name"
            className="text-black w-full"
          />
        </div>

        <div>
          <label htmlFor="emergency_contact_phone">
            Emergency contact phone number
          </label>
          <input
            onChange={handleChange}
            defaultValue={patient?.emergencyContact?.emergencyContactNumber}
            type="text"
            name="emergency_contact_phone_number"
            id="emergency_contact_phone_number"
            className="text-black w-full"
            disabled={!isEditMode}
          />
        </div>

        <div>
          <label htmlFor="emergency_contact_relationship" className="block">
            Emergency contact relationship
          </label>
          <input
            onChange={handleChange}
            defaultValue={patient?.emergencyContact?.relationshipToPatient}
            disabled={!isEditMode}
            className="w-full text-black"
            type="text"
            name="emergency_contact_relationship"
            id="emergency_contact_relationship"
          />
        </div>
      </div>

      {/* medical information section */}
      <hr className="my-10" />
      <h2 className="text-lg font-semibold mb-5">Medical Information</h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4">
        <div>
          <label htmlFor="blood_type" className="block">
            Blood type
          </label>
          <select
            onChange={handleChange}
            disabled={!isEditMode}
            name="blood_type"
            id="blood_type"
            className="w-full text-black"
          >
            <option value="A" selected={patient?.bloodType === "A"}>
              A
            </option>
            <option value="B" selected={patient?.bloodType === "B"}>
              B
            </option>
            <option value="AB" selected={patient?.bloodType === "AB"}>
              AB
            </option>
            <option value="O" selected={patient?.bloodType === "O"}>
              O
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="allergies" className="block">
            Allergies
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="allergies"
            id="allergies"
            className="text-black w-full"
            defaultValue={patient?.allergies || ""}
            disabled={!isEditMode}
          />
        </div>

        <div>
          <label htmlFor="current_medication" className="block">
            Current medications
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="current_medication"
            id="current_medication"
            className="text-black w-full"
            defaultValue={patient?.currentMedication || "-"}
            disabled={!isEditMode}
          />
        </div>

        <div>
          <label htmlFor="chronic_condition" className="block">
            Chronic conditions
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="chronic_conditions"
            id="chronic_conditions"
            className="text-black w-full"
            defaultValue={patient?.chronicConditions || "-"}
            disabled={!isEditMode}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
