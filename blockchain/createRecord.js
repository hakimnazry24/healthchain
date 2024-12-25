const privateKey = process.env.WALLET_PRIVATE_KEY;
import { provider } from "./provider";
import { contractABI } from "./provider";
import { contractAddress } from "./provider";
import { ethers } from "ethers";

async function createRecord(patientId, patientName, data) {
  try {
    // Signer setup
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Send transaction
    const tx = await contract.addRecord(patientId, patientName, data);
    console.log("Transaction sent. Waiting for confirmation...");

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log("Transaction confirmed!", receipt);

    return receipt;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
}

export default createRecord;
