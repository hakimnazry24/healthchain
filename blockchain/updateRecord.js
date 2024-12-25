const privateKey = process.env.WALLET_PRIVATE_KEY;
import { provider } from "./provider";
import { contractABI } from "./provider";
import { contractAddress } from "./provider";


async function updateRecord(recordId, updatedData) {
  try {
    // Set up signer
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Send transaction to update the record
    const tx = await contract.updateRecord(recordId, updatedData);
    console.log("Transaction sent. Waiting for confirmation...");

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log("Transaction confirmed!", receipt);

    return receipt;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
}

export default updateRecord;
