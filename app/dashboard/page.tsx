"use client";

import { FormEvent, useEffect, useState } from "react";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsCreditCard2Back } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import TableRow from "@/components/TableRow";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Patient } from "@prisma/client";

const Dashboard = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [Name, setName] = useState("");
  const [Age, setAge] = useState(0);
  const [sex, setSex] = useState("Male");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [insurance, setInsurance] = useState("");
  const [patients, setPatients] = useState<Patient[] | null>([]);
  const [query, setQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[] | null>(
    []
  );

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const handleCreatePatient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("age", Age.toString());
      formData.append("sex", sex);
      formData.append("email", email);
      formData.append("phone", Phone);
      formData.append("insurance", insurance);

      const res = await fetch("/api/patient/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Something wrong when creating patient : ${error.message}`);
    }
  };

  const handleFetchPatients = async () => {
    try {
      const res = await fetch("/api/patients", {
        method: "GET",
      });

      const data: Patient[] = await res.json();

      if (res.ok) {
        setPatients(data);
      }
    } catch (error: any) {
      console.error(`Failed to fetch patients : ${error.message}`);
    }
  };

  useEffect(() => {
    handleFetchPatients();
  }, []);

  const handleSearchPatient = (query: string) => {
    patients?.forEach((patient) => {
      if (patient.name.toLowerCase().includes(query.toLowerCase())) {
        setFilteredPatients([patient]);
      }
    });
  };

  useEffect(() => {
    handleSearchPatient(query);
  }, [query]);

  return (
    <div className="grid grid-cols-4 m-10 gap-x-5">
      {/* sidebar */}
      <div className="col-span-1 text-lg ">
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <IoHomeOutline className="" />
          Dashboard
        </div>
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <IoPeopleOutline />
          Patients
        </div>
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <IoDocumentTextOutline />
          Appointments
        </div>
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <BsCreditCard2Back />
          Billing
        </div>
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <TbReportAnalytics />
          Reports
        </div>
        <div className="flex flex-nowrap gap-x-3 items-center p-3 transition ease-in-out hover:bg-secondary rounded-lg cursor-pointer my-2">
          <CiSettings />
          Settings
        </div>

        <button
          className="bg-blue-600 w-full py-2 rounded-lg font-semibold mt-20"
          onClick={openDialog}
        >
          New patient
        </button>

        <Dialog onClose={closeDialog} open={isOpenDialog} className="">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
            <DialogPanel className="max-w-3xl space-y-4 border bg-secondary p-12">
              <DialogTitle className="font-bold">Add new patient</DialogTitle>
              <form onSubmit={handleCreatePatient}>
                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="rounded-md p-2 bg-primary font-semibold w-28 col-span-2"
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Sex</label>
                  <select
                    name="sex"
                    id="sex"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                    onChange={(e) => setSex(e.target.value)}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="string"
                    name="phone"
                    id="phone"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="insurance">Insurance</label>
                  <input
                    type="text"
                    name="insurance"
                    id="insurance"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                    onChange={(e) => setInsurance(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 mt-10">
                  <button type="button" onClick={() => setIsOpenDialog(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary p-2 rounded-md font-semibold"
                  >
                    Create patient
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <input
          type="text"
          name="search_patient"
          id="search_patient"
          className="bg-secondary rounded-lg p-3 w-full mt-8"
          placeholder="Search for patient"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* main content */}
      <div className="col-span-3">
        <h1 className="text-3xl font-semibold mb-5">Patients</h1>
        {patients?.length! <= 0 && filteredPatients?.length! <= 0 ? (
          <p className="text-left font-semibold text-xl">No record added</p>
        ) : (
          <table className="w-full rounded-3xl">
            <thead className="bg-secondary">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Insurance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {query.length === 0
                ? patients?.map((patient) => (
                    <TableRow key={patient.id} patient={patient} />
                  ))
                : filteredPatients?.map((patient) => (
                    <TableRow key={patient.id} patient={patient} />
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
