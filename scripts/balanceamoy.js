const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/contract1.sol/contract1.json");

const tokenAddress = "0x5D8F5D12697C46082EC1f4b7eA5A02d481A39299"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x5b686c2bCa7B82ef59b516079a909dB3FFd5909A";

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`You now have: ${balance} NFTs in your wallet`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
