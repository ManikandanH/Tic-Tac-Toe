import { PlayType, Grid } from '../types';

const checkGameWinnerInGrid = (
	currentPlayer: PlayType,
	gridRow: Array<any>,
	gridCol: Array<any>,
	gridDiagnal?: Array<any>
): {
	isWin: boolean;
	isRow: boolean;
	isCol: boolean;
} => {
	if (!gridDiagnal) {
		const gridRowCheck = gridRow.filter((rows) => rows !== currentPlayer).length === 0;
		const gridColCheck = gridCol.filter((cols) => cols !== currentPlayer).length === 0;

		if (gridRowCheck) {
			return {
				isWin: true,
				isRow: true,
				isCol: false,
			};
		} else if (gridColCheck) {
			return {
				isWin: true,
				isRow: false,
				isCol: true,
			};
		}
	}

	return {
		isWin: false,
		isRow: false,
		isCol: false,
	};
};

export const checkGameWinnerForPlayers = (
	currentPlayer: PlayType,
	grid: Grid,
	gridRowIndex: number,
	gridColIndex: number
): {
	isWin: boolean;
	isRow: boolean;
	isCol: boolean;
	index: number | null;
} => {
	const { isWin, isRow, isCol } = checkGameWinnerInGrid(
		currentPlayer,
		grid[gridRowIndex],
		grid.map((rows, index) => rows.filter((_, index) => index === gridColIndex)[0])
	);
	if (isWin) {
		return {
			isWin,
			isRow,
			isCol,
			index: isRow ? gridRowIndex : gridColIndex,
		};
	}

	return {
		isWin: false,
		isRow: false,
		isCol: false,
		index: null,
	};
};
