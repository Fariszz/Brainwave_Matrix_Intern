import { ethers } from "ethers";

export const parseBytes = (bytesProposal: string) => {
  return ethers.decodeBytes32String(bytesProposal);
};

export const parseName = (name: string) => {
  const newName = name.replace("-", " ");
  return newName[0].toUpperCase() + newName.substring(1);
};
