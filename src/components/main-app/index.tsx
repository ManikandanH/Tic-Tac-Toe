import { ReactElement, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Opponent } from '../../types';
import { gridInitialState, ROWS, COLS, PLAYER2, PLAYER1, COMPUTER } from '../../constants';

import { Controls } from '../controls';
import { GameGrid } from '../game-grid';
import { ErrorComponent } from '../error';

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

export type PlayType = 'X' | 'O';

export interface Entry {
	x: number;
	y: number;
}

export interface ButtonData {
	buttonText: string;
	isSelected: boolean;
	opponentType: Opponent;
	disabled: boolean;
}

export type Grid = Array<Array<any>>;

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
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [currentPlay, setCurrentPlay] = useState<PlayType>();
	const [isPlayer, setIsPlayer] = useState<boolean | null>(null);

	useEffect(() => {
		setGrid(gridInitialState);
	}, []);

	const isPlayerHandler = (opponent: Opponent): void => {
		setIsPlayer(() => (opponent === 'player' ? true : false));
		setButtonData((prevState) => {
			return prevState.map((btns) =>
				btns.opponentType === opponent
					? { ...btns, isSelected: !btns.isSelected, disabled: !btns.disabled }
					: { ...btns, disabled: !btns.disabled }
			);
		});
		setIsGameStarted(!isGameStarted);
		setCurrentPlay('X');
		opponent === 'computer' ? toast.info(COMPUTER) : toast.info(PLAYER1);
	};

	const handleGrid = (entryPoints: Entry): void => {
		if (!grid[entryPoints.x][entryPoints.y]) {
			if (currentPlay === 'X') {
				!isPlayer ? toast.info(COMPUTER) : toast.info(PLAYER2);
			} else {
				toast.info(PLAYER1);
			}
			setGrid((prevState) =>
				prevState.map((rows, i) =>
					rows.map((cols, j) => {
						if (i === entryPoints.x && j === entryPoints.y) {
							return currentPlay;
						}
						return cols;
					})
				)
			);
			setCurrentPlay((prevState) => (prevState === 'O' ? 'X' : 'O'));
		}
	};

	const handleReset = () => {
		toast.dismiss();
		setIsGameStarted(false);
		setButtonData(initialButtonState);
		setCurrentPlay('X');
		setGrid(gridInitialState);
	};

	return (
		<Container>
			<Controls buttonData={buttonData} isPlayerHandler={isPlayerHandler} />
			{isGameStarted && isPlayer && (
				<GameContainer>
					<GameGrid handleGrid={handleGrid} grid={grid} rows={ROWS} cols={COLS} />
					<GameResetButton onClick={handleReset}>Reset Game</GameResetButton>
				</GameContainer>
			)}
			{isGameStarted && !isPlayer && (
				<GameContainer>
					<ErrorComponent errorMessage="Feature Not developed Yet" />
					<GameResetButton onClick={handleReset}>Exit</GameResetButton>
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
