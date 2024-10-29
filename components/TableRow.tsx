"use client"

import { patients } from "@/util/mockdata";
import { Patient } from "@prisma/client";
import React, { FormEvent } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { DialogPanel } from "@headlessui/react";
import { DialogTitle } from "@headlessui/react";

const TableRow = ({ patient }: { patient: Patient }) => {
  const [isSureDelete, setIsSureDelete] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [Name, setName] = useState(patient.name);
  const [Age, setAge] = useState(patient.age);
  const [sex, setSex] = useState(patient.sex);
  const [email, setEmail] = useState(patient.email);
  const [Phone, setPhone] = useState(patient.phone);
  const [insurance, setInsurance] = useState(patient.insurance);

  const openDialog = () => {
    setIsOpenDialog(true);
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const handleDeletePatient = async (patientId: string) => {
    try {
      const formData = new FormData();
      formData.append("patientId", patientId);

      const res = await fetch("/api/patient", {
        method: "DELETE",
        body: formData,
      });
      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Failed to delete patient :${error.message}`);
    }
  };

  const handleEditPatient = async (
    e: FormEvent<HTMLFormElement>,
    patientId: string
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("age", Age.toString());
      formData.append("sex", sex);
      formData.append("email", email);
      formData.append("phone", Phone);
      formData.append("insurance", insurance);
      formData.append("patientId", patient.id);

      const res = await fetch("/api/patient/", {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        location.reload();
      }
    } catch (error: any) {
      console.error(`Something wrong when updating patient : ${error.message}`);
    }
  };

  return (
    <>
      <tr>
        <td className="p-5 border border-secondary">{patient.name}</td>
        <td className="p-5 border border-secondary">{patient.age}</td>
        <td className="p-5 border border-secondary">{patient.sex}</td>
        <td className="p-5 border border-secondary">{patient.email}</td>
        <td className="p-5 border border-secondary">{patient.phone}</td>
        <td className="p-5 border border-secondary">{patient.insurance}</td>
        <td className="p-5 border border-secondary ">
          <FaTrash
            className="inline-block mr-3 cursor-pointer"
            onClick={() => handleDeletePatient(patient.id)}
          />{" "}
          <FaEdit
            className="inline-block cursor-pointer"
            onClick={() => openDialog()}
          />
        </td>
      </tr>
      <Dialog onClose={closeDialog} open={isOpenDialog} className="">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel className="max-w-3xl space-y-4 border bg-secondary p-12">
            <DialogTitle className="font-bold">
              Edit Patient Information
            </DialogTitle>
            <form onSubmit={(e) => handleEditPatient(e, patient.id)}>
              <div className="grid grid-cols-3 items-center mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-md p-2 bg-primary font-semibold w-full col-span-2"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={Name}
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
                  defaultValue={Age}
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
                  defaultValue={sex}
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
                  defaultValue={email}
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
                  defaultValue={Phone}
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
                  defaultValue={insurance}
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
                  Update patient
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default TableRow;
