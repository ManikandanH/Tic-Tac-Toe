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
	isPlayer,
	handleComputerGameStarted,
	isGameStarted,
}: {
	playerNamesCallback: (player1Name: string, player2Name: string) => void;
	isPlayer: boolean | null;
	handleComputerGameStarted?: (player1Name: string, player2Name: string) => void;
	isGameStarted: boolean;
}) {
	const [player1Name, setPlayer1Name] = useState<string>(!isPlayer ? 'Computer' : 'Player 1');
	const [player2Name, setPlayer2Name] = useState<string>('Player 2');
	const [isConfirmed, setIsConfirmed] = useState<boolean>(true);
	const [isEditDisabled, setIsEditDisabled] = useState<boolean>(false);

	const handleChange = (e: any, type: string): void => {
		if (isPlayer) {
			if (type === 'player1') {
				setPlayer1Name(e.target.value);
			} else {
				setPlayer2Name(e.target.value);
			}
		} else {
			if (type === 'player1') {
				setPlayer1Name(e.target.value);
				setPlayer2Name('Computer');
			} else {
				setPlayer2Name(e.target.value);
				setPlayer1Name('Computer');
			}
		}
	};

	const handleBlur = (e: any): void => {
		if (!isPlayer) {
			if (player1Name.trim() === 'Computer') {
				player2Name.trim() === 'Computer' && setPlayer2Name('Player 2');
			}
		}
	};

	const handleGameStarted = () => {
		handleComputerGameStarted && handleComputerGameStarted(player1Name, player2Name);
		setIsConfirmed(true);
		setIsEditDisabled(true);
	};

	const handleButton = (type: string) => {
		if (type === 'confirm') {
			setIsConfirmed(true);
			setIsEditDisabled(false);
		} else {
			setIsConfirmed(false);
			setIsEditDisabled(true);
		}
	};

	useEffect(() => {
		playerNamesCallback(player1Name, player2Name);
	}, [player2Name, player1Name, playerNamesCallback]);

	useEffect(() => {
		if (!isGameStarted) {
			setIsConfirmed(true);
			setIsEditDisabled(false);
		}
	}, [isGameStarted]);

	return (
		<PlayerControlsContainer>
			<PlayerControlsInput
				id="player1"
				placeholder="Player 1 Name"
				value={player1Name}
				disabled={isConfirmed}
				onChange={(e) => handleChange(e, 'player1')}
				onBlur={handleBlur}
			/>
			<PlayerControlsInput
				id="player2"
				placeholder="Player 2 Name"
				value={player2Name}
				disabled={isConfirmed}
				onChange={(e) => handleChange(e, 'player2')}
				onBlur={handleBlur}
			/>
			<PlayerControlsButtonContainer>
				<button onClick={() => handleButton('confirm')} disabled={isConfirmed}>
					Confirm
				</button>
				<button onClick={() => handleButton('edit')} disabled={isEditDisabled}>
					Edit
				</button>
			</PlayerControlsButtonContainer>
			<PlayerControlsButtonContainer>
				<button disabled={isGameStarted} onClick={handleGameStarted}>
					Start Game
				</button>
			</PlayerControlsButtonContainer>
		</PlayerControlsContainer>
	);
}
