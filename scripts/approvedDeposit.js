
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi.js");
const ABI = require("../artifacts/contracts/contract1.sol/contract1.json");
require("dotenv").config();

// Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {
  const networkAddress = "https://eth-sepolia.g.alchemy.com/v2/xISVy20DszdNw5uakCDIhIsegXfROLT1";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const signer = wallet.connect(provider);

  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("contract1", signer);
  const nft = NFT.attach("0x4cC06d741cC6236B31224dE56BbD8746e38F0F80");

  // Get FXRoot contract instance
  const fxRootAddress = "0x9E688939Cb5d484e401933D850207D6750852053";//Used "FxERC721RootTunnel": "0x9E688939Cb5d484e401933D850207D6750852053",
  const fxRoot = new ethers.Contract(fxRootAddress, FXRootContractAbi, signer);

  // Token IDs to transfer
  const tokenIds = [0, 1, 2, 3, 4];

  // Approve the NFTs for transfer
  const approveTx = await nft.setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Deposit the NFTs to the FXRoot contract
  for (const tokenId of tokenIds) {
    const depositTx = await fxRoot.deposit(nft.address, wallet.address, tokenId, "0x6566");
    await depositTx.wait();
    console.log(`Token ID ${tokenId} deposited`);
  }

  console.log("All tokens approved and deposited");

  // Test balanceOf
  const balance = await nft.balanceOf(wallet.address);

  // Print the balance of the wallet
  console.log("Wallet balance:", wallet.address, "is:", balance.toString());
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
