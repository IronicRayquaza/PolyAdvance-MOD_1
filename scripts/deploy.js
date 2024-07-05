const hre = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    // Get the contract factory
    const NFT = await hre.ethers.getContractFactory("contract1");

    // Deploy the contract
    const nft = await NFT.deploy();

    // Wait for the contract to be deployed
    await nft.deployed();

    // Log the contract address
    console.log("NFT contract deployed to:", nft.address);

    // Export the contract address
    const metadataDir = "metadata";
    const contractAddressFile = `${metadataDir}/contractAddress.js`;

    // Ensure the metadata directory exists
    if (!fs.existsSync(metadataDir)) {
      fs.mkdirSync(metadataDir);
    }

    // Write the contract address to the file
    fs.writeFileSync(
      contractAddressFile,
      `export const nftAddress = "${nft.address}";\n`
    );

    console.log(`Contract address saved to ${contractAddressFile}`);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exit(1);
  }
}

// Execute the deployment function
main().then(() => process.exit(0));
