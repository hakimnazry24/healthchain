const privateKey = process.env.WALLET_PRIVATE_KEY;
import { provider } from "./provider";
import { contractABI } from "./provider";
import { contractAddress } from "./provider";
import { ethers } from "ethers";

async function deleteRecord(recordId) {
  try {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const tx = await contract.deleteRecord(recordId);
    console.log("Transaction sent. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log("Transaction confirmed", receipt);

    return receipt;
  } catch (error) {
    console.error(`Failed to delete record id ${recordId} : ${error.message}`);
    throw error;
  }
}

export default deleteRecord;
