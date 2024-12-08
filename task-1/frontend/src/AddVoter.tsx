interface AddVoterProps {
    newVoter: string;
    setNewVoter: (value: string) => void;
    addNewVoter: () => void;
    newVoterStatus?: string;
}

const AddVoter: React.FC<AddVoterProps> = ({ newVoter, setNewVoter, addNewVoter, newVoterStatus }: AddVoterProps) => {
	const handleNewVoter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewVoter(e.target.value);
	};
	return (
		<div>
			<h4>Give right to vote</h4>
			<p>(only chairman can give vote right)</p>
			<div
				style={{
					width: '15em',
					display: 'flex',
					justifyContent: 'space-between',
				}}>
				<input value={newVoter} onChange={handleNewVoter} />
				<button onClick={addNewVoter}>Give right</button>
			</div>
			{newVoterStatus && <p>Status: {newVoterStatus}</p>}
		</div>
	);
};

export default AddVoter;
