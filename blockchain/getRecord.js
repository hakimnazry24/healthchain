import { ethers } from "ethers";

const privateKey = process.env.WALLET_PRIVATE_KEY;
import { provider } from "./provider";
import { contractABI } from "./provider";
import { contractAddress } from "./provider";

async function getRecord(patientId) {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const hashedData = await contract.getRecord(patientId);

    if (hashedData) return hashedData;
    else `Record for patient ID ${patientId} not found`;
  } catch (error) {
    console.error("Error fetching record:", error);
    throw error;
  }
}

export default getRecord;
