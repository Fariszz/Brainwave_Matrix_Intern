import { parseName, parseBytes } from './utils';

interface Proposal {
    name: string;
    voteCount: { _hex: string };
}

interface ProposalsProps {
    proposals: Proposal[];
    voteProposal: (index: number) => void;
}

const Proposals: React.FC<ProposalsProps> = ({ proposals, voteProposal }) => {
    return (
        <div>
            <h4>proposal:</h4>{' '}
            {proposals.map((proposal, index) => {
                const name = parseName(parseBytes(proposal.name));
                const voteCount = proposal.voteCount;            
                                
                return (
                    <div key={index} style={{ padding: '1rem 0' }}>
                        🗳 {name} - {Number(voteCount)}
                        <button
                            style={{ marginLeft: '2em' }}
                            onClick={() => voteProposal(index)}>
                            Vote
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Proposals;
