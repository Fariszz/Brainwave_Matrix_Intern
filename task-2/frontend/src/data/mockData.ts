import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bitcoin Mining ASIC",
    manufacturer: "Bitmain",
    timestamp: new Date().toISOString(),
    locations: ["Shenzhen", "Hong Kong"],
    handlers: ["Manufacturer", "Distributor"],
  },
  {
    id: "2",
    name: "Hardware Wallet",
    manufacturer: "Ledger",
    timestamp: new Date().toISOString(),
    locations: ["Paris", "Singapore"],
    handlers: ["Manufacturer", "Quality Control"],
  },
  {
    id: "3",
    name: "Security Key",
    manufacturer: "Yubico",
    timestamp: new Date().toISOString(),
    locations: ["Stockholm", "New York"],
    handlers: ["Manufacturer", "Warehouse"],
  },
];
