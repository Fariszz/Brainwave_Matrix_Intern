import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  const Token = await ethers.getContractFactory("SimpleSupplyChain");

  const supplyChain = await Token.deploy();

  await supplyChain.waitForDeployment();
  
  console.log("SupplyChain deployed to:", await supplyChain.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
