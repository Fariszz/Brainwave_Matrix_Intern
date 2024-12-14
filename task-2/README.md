# Supply Chain Management  DApp

A decentralized Supply Chain Management built with Ethereum smart contracts and React.

## Prerequisites

- Node.js (v16 or higher)
- pnpm
- MetaMask browser extension
- Git

## Project Structure

```
ballot-dapp/
├── frontend/           # React frontend application
├── contracts/         # Smart contract source files
├── scripts/          # Deployment and test scripts
└── test/            # Contract test files
```

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ballot-dapp
```

2. Install dependencies:
```bash
pnpm install
```

3. Install frontend dependencies:
```bash
cd frontend
pnpm install
```

## Running the Application

1. Start the frontend development server:
```bash
cd frontend
pnpm dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Connect your MetaMask wallet to interact with the DApp

## Features

- Add voters to the ballot
- View proposals
- Cast votes for proposals
- View voting results

## Development

- To compile contracts:
```bash
pnpm hardhat compile
```

- To run local blockchain:
```bash
pnpm hardhat node --hostname 127.0.0.1
```

- To deploy contracts:
```bash
pnpm hardhat run scripts/deploy.ts --network localhost
```

## Technology Stack

- Frontend: React + TypeScript + Vite
- Smart Contracts: Solidity
- Development Environment: Hardhat
- Package Manager: pnpm
- Web3 Integration: ethers.js
