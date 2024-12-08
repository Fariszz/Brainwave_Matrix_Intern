import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const Token = await ethers.getContractFactory("Ballot");
  const proposalNames = [
    ethers.encodeBytes32String("Proposal 1"),
    ethers.encodeBytes32String("Proposal 2"),
    ethers.encodeBytes32String("Proposal 3"),
  ];
  
  const ballot = await Token.deploy(proposalNames);

  await ballot.waitForDeployment();

  console.log("Ballot deployed to:", await ballot.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
