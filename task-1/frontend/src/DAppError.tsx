import { useState, useEffect } from "react";
import { ethers, Contract } from 'ethers';
import TokenArtifact from './ABI/Ballot.json';
import contractAddress from './ABI/contract-address.json';
import Proposals from "./Proposals";

export const DAppTest = () => {
	interface Proposal {
    name: string;
    voteCount: { _hex: string };
}

   const [token, setToken] = useState<Contract>();
	const [newVoter, setNewVoter] = useState('');
	const [newVoterStatus, setNewVoterStatus] = useState('');
	const [voterStatus, setVoterStatus] = useState('');
	const [voterAddressToCheck, setVoterAddressToCheck] = useState('');
	const [proposals, setProposals] = useState([]);
	const [chairperson, setChairperson] = useState('');

    	// **************** Ethers Connection for the SmartContract ****************
	async function _initialize(address: string) {
		await _intializeEthers(address);
	}

	const _intializeEthers = async (address: string) => {
		try {
			console.log("Initializing ethers...");
			const _provider = new ethers.BrowserProvider(window.ethereum);
		
			const _token = new ethers.Contract(
				contractAddress.Token,
				TokenArtifact.abi,		
				await _provider.getSigner()
			);
		
			// get the proposals
			const newProposal = await _token.getAllProposals();
			// console.log("Proposals:", newProposal);

			// get the chairman address
			const newChairperson = await _token.chairperson();
			
			// save the token data into a hook to reuse it along the app
			setToken(_token);
			setProposals(newProposal);
			setChairperson(newChairperson);
		} catch (error) {
			console.error("Error in _intializeEthers:", error);
		}
	};

	// Connects to the smart contract token id (check /contracts/contract-address.json)
	async function init() {
		const [selectedAddress] = await window.ethereum.enable();
		_initialize(selectedAddress);
	}

	useEffect(() => {
		// When the page loads it will initialize the init function
		// that we need to connect the frontend with the smartcontract
		init();
	}, []);

	useEffect(() => {		
	}, [chairperson]);

	// **************** Here Starts The Real Logic of the Frontend -> SmartContract ****************

	// Vote the selected proposal (you can only vote one time)
	const voteProposal = async (proposal: Proposal) => {
		if (!token) { throw new Error('Token is not initialized'); } await token.vote(proposal);
	};

	// // Check if the address the user entered is a a voter or not
	const checkAddressVoter = async () => {
		try {
			const voterData = await token.voters(`${voterAddressToCheck}`);
			setVoterStatus(voterData);
		} catch (err) {
			console.log(err);
			setVoterStatus('An error has occured');
		}
	};

	// // It gives the right to vote to a new address
	// const addNewVoter = async () => {
	// 	try {
	// 		await token.giveRightToVote(newVoter);
	// 		setNewVoterStatus('Success');
	// 	} catch (err) {
	// 		console.log(err);
	// 		setNewVoterStatus('An error has occured');
	// 	}
	// };

	const handleVoteProposal = (index: number) => {
		if (!token) { 
			throw new Error('Token is not initialized'); 
		}
		const proposal = proposals[index];
		token.vote(proposal).catch(error => {
			console.error('Error voting:', error);
		});
	};

    return (
		// console.log(handleVoteProposal),
		<div style={{ padding: '3rem 5rem' }}>
			<h1>Voting System</h1>
			<div>
				<h4>chairperson: {chairperson}</h4>
			</div>
			<Proposals proposals={proposals} voteProposal={handleVoteProposal}/>
		</div>
	);
}