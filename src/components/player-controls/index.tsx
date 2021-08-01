import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const PlayerControlsContainer = styled.div`
	text-align: center;
`;

const PlayerControlsButtonContainer = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	margin: 20px;
`;

const PlayerControlsInput = styled.input`
	display: block;
	margin: 10px auto;
	border: ${(props) => (props.id === 'player1' ? '2px solid crimson' : '2px solid black')};
	color: ${(props) => (props.id === 'player1' ? 'crimson' : 'black')};
	height: 20px;
	border-radius: 2px;
`;

export function PlayerControls({
	playerNamesCallback,
}: {
	playerNamesCallback: (player1Name: string, player2Name: string) => void;
}) {
	const [player1Name, setPlayer1Name] = useState<string>('Player 1');
	const [player2Name, setPlayer2Name] = useState<string>('Player 2');
	const [isConfirmed, setIsConfirmed] = useState<boolean>(true);

	const handleChange = (e: any, type: string): void => {
		if (type === 'player1') {
			setPlayer1Name(e.target.value);
		} else {
			setPlayer2Name(e.target.value);
		}
	};

	useEffect(() => {
		playerNamesCallback(player1Name, player2Name);
	}, [player2Name, player1Name, playerNamesCallback]);

	return (
		<PlayerControlsContainer>
			<PlayerControlsInput
				id="player1"
				placeholder="Player 1 Name"
				value={player1Name}
				disabled={isConfirmed}
				onChange={(e) => handleChange(e, 'player1')}
			/>
			<PlayerControlsInput
				id="player2"
				placeholder="Player 2 Name"
				value={player2Name}
				disabled={isConfirmed}
				onChange={(e) => handleChange(e, 'player2')}
			/>
			<PlayerControlsButtonContainer>
				<button onClick={() => setIsConfirmed(true)} disabled={isConfirmed}>
					Confirm
				</button>
				<button onClick={() => setIsConfirmed(false)} disabled={!isConfirmed}>
					Edit
				</button>
			</PlayerControlsButtonContainer>
		</PlayerControlsContainer>
	);
}
