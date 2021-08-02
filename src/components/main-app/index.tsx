import { ReactElement, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Entry, Grid, Opponent, PlayType } from '../../types';
import { gridInitialState, ROWS, COLS } from '../../constants';

import { Controls } from '../controls';
import { GameGrid } from '../game-grid';
import { checkGameWinnerForPlayers, computerGenerateEntries } from '../../utils';
import { PlayerControls } from '../player-controls';

const Container = styled.div`
	text-align: center;
`;

const GameContainer = styled.div`
	padding: 1rem 0;
`;

const GameResetButton = styled.button`
	background-color: transparent;
	color: black;
	width: 120px;
	height: 30px;
	outline: none;
	margin: 10px;
	border-color: black;
	border-bottom: 3px solid #ff3535;
	border-right: 3px solid black;
	border-left: 3px solid black;
	border-top: 3px solid #ff3535;

	&:hover {
		width: 130px;
		height: 35px;
		border-top: 3px solid black;
		border-left: 3px solid #ff3535;
		border-bottom: 3px solid black;
		border-right: 3px solid #ff3535;
	}
`;

const GameExitButton = styled.button`
	background-color: transparent;
	color: black;
	width: 120px;
	height: 30px;
	outline: none;
	margin: 10px;
	border-color: black;
	border-bottom: 3px solid #ff3535;
	border-right: 3px solid black;
	border-left: 3px solid black;
	border-top: 3px solid #ff3535;

	&:hover {
		width: 130px;
		height: 35px;
		border-top: 3px solid black;
		border-left: 3px solid #ff3535;
		border-bottom: 3px solid black;
		border-right: 3px solid #ff3535;
	}
`;

export interface ButtonData {
	buttonText: string;
	isSelected: boolean;
	opponentType: Opponent;
	disabled: boolean;
}

export function MainApp(): ReactElement {
	const initialButtonState: ButtonData[] = [
		{
			buttonText: 'vs Player',
			isSelected: false,
			opponentType: 'player',
			disabled: false,
		},
		{
			buttonText: 'vs Computer',
			isSelected: false,
			opponentType: 'computer',
			disabled: false,
		},
	];
	const [buttonData, setButtonData] = useState<ButtonData[]>(initialButtonState);
	const [grid, setGrid] = useState<Grid>([]);
	const [isGameGridLoaded, setIsGameGridLoaded] = useState(false);
	const [currentPlay, setCurrentPlay] = useState<PlayType>('X');
	const [isPlayer, setIsPlayer] = useState<boolean | null>(null);
	const [isGameComplete, setIsGameComplete] = useState<boolean>(false);
	const [player1Name, setPlayer1Name] = useState<string>();
	const [player2Name, setPlayer2Name] = useState<string>();
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const [entry, setEntries] = useState<Entry>({ x: -1, y: -1 });

	useEffect(() => {
		setGrid(gridInitialState);
	}, []);

	const handlePlayersNameCallback = (player1Name: string, player2Name: string) => {
		setPlayer1Name(player1Name);
		setPlayer2Name(player2Name);
	};

	const isPlayerHandler = (opponent: Opponent): void => {
		if (opponent === 'player') {
			setIsPlayer(true);
		} else {
			setIsPlayer(false);
		}
		setIsGameGridLoaded(true);
		setButtonData((prevState) => {
			return prevState.map((btns) =>
				btns.opponentType === opponent
					? { ...btns, isSelected: !btns.isSelected, disabled: !btns.disabled }
					: { ...btns, disabled: !btns.disabled }
			);
		});
	};

	const computerIsPlaying = (grid: Grid, currentPlay: PlayType, currentEntries: Entry) => {
		const { x, y }: Entry = computerGenerateEntries(grid, currentPlay, currentEntries);
		const cloneGrid = [...grid].map((rows, i) =>
			rows.map((cols, j) => {
				if (i === x && j === y) {
					return currentPlay;
				}
				return cols;
			})
		);

		setGrid(cloneGrid);
		setCurrentPlay(currentPlay === 'X' ? 'O' : 'X');
	};

	const handleGrid = (entryPoints: Entry): void => {
		if (!grid[entryPoints.x][entryPoints.y] && !isGameComplete) {
			const cloneGrid = [...grid].map((rows, i) =>
				rows.map((cols, j) => {
					if (i === entryPoints.x && j === entryPoints.y) {
						return currentPlay;
					}
					return cols;
				})
			);

			if (isPlayer) {
				const { isCol, isRow, isWin, index, isDiagonal, diagonalType } =
					checkGameWinnerForPlayers(currentPlay, cloneGrid, entryPoints.x, entryPoints.y);

				if (isWin) {
					if (isDiagonal) {
						setGrid((prevState) =>
							prevState.map((rows, i) =>
								rows.map((cols, j) => {
									if (diagonalType === 'Main' && i === j) {
										return currentPlay;
									}
									if (diagonalType === 'Secondary' && i + j === grid.length - 1) {
										return currentPlay;
									}
									return false;
								})
							)
						);
					} else {
						setGrid((prevState) =>
							prevState.map((rows, i) =>
								rows.map((cols, j) => {
									if (isRow && i === index) {
										return currentPlay;
									}
									if (isCol && j === index) {
										return currentPlay;
									}
									return false;
								})
							)
						);
					}
					toast.success(
						currentPlay === 'X'
							? `${player1Name} won the match`
							: `${player2Name} won the match`
					);
					setIsGameComplete(true);
				} else {
					setGrid(cloneGrid);
					setCurrentPlay((prevState) => (prevState === 'O' ? 'X' : 'O'));
				}
			} else {
				setGrid(cloneGrid);
				setCurrentPlay((prevState) => (prevState === 'O' ? 'X' : 'O'));
				setTimeout(() => {
					computerIsPlaying(cloneGrid, currentPlay === 'X' ? 'O' : 'X', entryPoints);
				}, 500);
			}
			setEntries(entryPoints);
		}
	};

	const handleReset = () => {
		toast.dismiss();
		setCurrentPlay('X');
		setGrid(gridInitialState);
		setIsGameComplete(false);
		setIsGameStarted(false);
	};

	const handleExit = () => {
		toast.dismiss();
		setCurrentPlay('X');
		setIsGameGridLoaded(false);
		setIsPlayer(false);
		setPlayer2Name('');
		setPlayer1Name('');
		setButtonData(initialButtonState);
		setGrid(gridInitialState);
		setIsGameComplete(false);
	};

	const handleComputerGameStarted = (player1Name: string, player2Name: string) => {
		setPlayer1Name(player1Name);
		setPlayer2Name(player2Name);
		setIsGameStarted(true);
		if (player1Name === 'Computer') {
			computerIsPlaying(grid, 'X', entry);
		}
	};

	return (
		<Container>
			<Controls buttonData={buttonData} isPlayerHandler={isPlayerHandler} />
			{isGameGridLoaded && (
				<GameContainer>
					<PlayerControls
						handleComputerGameStarted={handleComputerGameStarted}
						isPlayer={isPlayer}
						isGameStarted={isGameStarted}
						playerNamesCallback={handlePlayersNameCallback}
					/>
					<GameGrid
						isGameComplete={isGameComplete}
						handleGrid={handleGrid}
						grid={grid}
						rows={ROWS}
						cols={COLS}
					/>
					<GameResetButton onClick={handleReset}>Reset Game</GameResetButton>
					<GameExitButton onClick={handleExit}>Exit</GameExitButton>
				</GameContainer>
			)}
			<ToastContainer
				closeOnClick
				position="bottom-center"
				autoClose={false}
				pauseOnFocusLoss={false}
			/>
		</Container>
	);
}
