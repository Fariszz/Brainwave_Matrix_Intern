import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import TokenArtifact from './ABI/Ballot.json';
import contractAddress from './ABI/contract-address.json';
import Proposals from "./Proposals";
import AddVoter from "./AddVoter";

export const DApp = () => {
    const [token, setToken] = useState<Contract>();
	const [chairperson, setChairperson] = useState('');
	const [proposals, setProposals] = useState([]);
	const [newVoter, setNewVoter] = useState('');
	const [newVoterStatus, setNewVoterStatus] = useState('');

    // **************** Ethers Connection for the SmartContract ****************
    async function _initialize() {
		await _intializeEthers();
	}
    const _intializeEthers = async () => {
        try {
			const _provider = new ethers.BrowserProvider(window.ethereum);

			const _token = new ethers.Contract(
				contractAddress.Token,
				TokenArtifact.abi,		
				await _provider.getSigner()
			);
			
			// get the chairman address
			const newChairperson = await _token.chairperson();
			
			// get the proposals
			const newProposal = await _token.getAllProposals();		

			setToken(_token);
			setChairperson(newChairperson);
			setProposals(newProposal);
        } catch(error) {
            console.error("Error in _intializeEthers:", error);
        }
    }

		// It gives the right to vote to a new address
	const addNewVoter = async () => {
		try {
			if (!token) { 
				throw new Error('Token is not initialized'); 
			}
		
			await token.giveRightToVote(newVoter);
			setNewVoterStatus('Success');
		} catch (err) {
			console.log(err);
			setNewVoterStatus('An error has occured');
		}
	};

    	// Connects to the smart contract token id (check /contracts/contract-address.json)
	async function init() {
    // const [selectedAddress] = await window.ethereum.enable();
		await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		_initialize();
	}

    useEffect(() => {
		// When the page loads it will initialize the init function
		// that we need to connect the frontend with the smartcontract
		init();
	}, []);

	useEffect(() => {		
	}, [chairperson]);

	const handleVoteProposal = async (index: number) => {
		if (!token) { 
			throw new Error('Token is not initialized'); 
		}
		
		token.vote(index).catch(error => {
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
			<AddVoter
				addNewVoter={addNewVoter}
				setNewVoter={setNewVoter}
				newVoter={newVoter}
				newVoterStatus={newVoterStatus}
			/>
		</div>
	);
}