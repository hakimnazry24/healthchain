"use client";

import { useState } from "react";
import React from "react";
import { patients } from "@/util/mockdata";
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

const Dashboard = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

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
              <form action="">
                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Age</label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="rounded-md p-2 bg-primary font-semibold w-28 col-span-2"
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="name">Sex</label>
                  <select
                    name="sex"
                    id="sex"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
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
                  />
                </div>

                <div className="grid grid-cols-3 items-center mb-3">
                  <label htmlFor="insurance">Insurance</label>
                  <input
                    type="text"
                    name="insurance"
                    id="insurance"
                    className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-10">
                  <button type="submit" onClick={() => setIsOpenDialog(false)}>
                    Cancel
                  </button>
                  <button type="button" onClick={() => setIsOpenDialog(false)} className="bg-primary p-2 rounded-md font-semibold">
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
        />
      </div>

      {/* main content */}
      <div className="col-span-3">
        <h1 className="text-3xl font-semibold mb-5">Patients</h1>
        <table className="w-full rounded-3xl">
          <thead className="bg-secondary">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Insurance</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <TableRow key={patient.id} patient={patient} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
