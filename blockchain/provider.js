import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`
);

export const contractAddress = "0xC3123c961eB4D644Ba12e535420C1032A07F7FD3";

export const contractABI = [
  {
    inputs: [
      { internalType: "string", name: "_patientId", type: "string" },
      { internalType: "string", name: "_patientName", type: "string" },
      { internalType: "string", name: "_data", type: "string" },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_id", type: "string" },
      { internalType: "string", name: "_data", type: "string" },
    ],
    name: "updateRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_id", type: "string" }],
    name: "deleteRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "getRecord",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "string",
        name: "patientName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "RecordAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "string",
        name: "patientName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "RecordUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "RecordDeleted",
    type: "event",
  },
];
