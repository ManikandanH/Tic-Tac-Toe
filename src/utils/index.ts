import { PlayType, Grid, DiagonalGridType } from '../types';

const checkGameWinnerInGrid = (
	currentPlayer: PlayType,
	gridRow: Array<any>,
	gridCol: Array<any>,
	gridDiagonal?: {
		diagonalGrid: Grid;
		diagonalType: DiagonalGridType | null;
	}
): {
	isWin: boolean;
	isRow: boolean;
	isCol: boolean;
	isDiagonal: boolean;
	isDiagonalType: DiagonalGridType | null;
} => {
	const gridRowCheck = gridRow.filter((rows) => rows !== currentPlayer).length === 0;
	const gridColCheck = gridCol.filter((cols) => cols !== currentPlayer).length === 0;

	if (gridRowCheck) {
		return {
			isWin: true,
			isRow: true,
			isCol: false,
			isDiagonal: false,
			isDiagonalType: null,
		};
	} else if (gridColCheck) {
		return {
			isWin: true,
			isRow: false,
			isCol: true,
			isDiagonal: false,
			isDiagonalType: null,
		};
	}
	if (gridDiagonal?.diagonalGrid && gridDiagonal.diagonalGrid.length > 0) {
		if (gridDiagonal.diagonalGrid.length === 1) {
			const isDiagonalGridCheck =
				gridDiagonal.diagonalGrid[0].filter((dia) => dia !== currentPlayer).length === 0;

			return {
				isWin: isDiagonalGridCheck,
				isRow: false,
				isCol: false,
				isDiagonal: isDiagonalGridCheck,
				isDiagonalType: gridDiagonal.diagonalType,
			};
		} else {
			const isMainDiagonalCheck =
				gridDiagonal.diagonalGrid[0].filter((dia) => dia !== currentPlayer).length === 0;
			const isSecondaryDiagonalCheck =
				gridDiagonal.diagonalGrid[1].filter((dia) => dia !== currentPlayer).length === 0;

			if (isMainDiagonalCheck) {
				return {
					isWin: false,
					isRow: false,
					isCol: false,
					isDiagonal: isMainDiagonalCheck,
					isDiagonalType: 'Main',
				};
			} else if (isSecondaryDiagonalCheck) {
				return {
					isWin: false,
					isRow: false,
					isCol: false,
					isDiagonal: isSecondaryDiagonalCheck,
					isDiagonalType: 'Secondary',
				};
			}

			return {
				isWin: false,
				isRow: false,
				isCol: false,
				isDiagonal: false,
				isDiagonalType: null,
			};
		}
	}

	return {
		isWin: false,
		isRow: false,
		isCol: false,
		isDiagonal: false,
		isDiagonalType: null,
	};
};

const getMainDiagonal = (grid: Grid): Array<any> => {
	return grid.map(
		(rows, rowIndex) =>
			rows.filter((cols, colIndex) => {
				if (rowIndex === colIndex) {
					return true;
				}
				return false;
			})[0]
	);
};

const getSecondaryDiagonal = (grid: Grid): Array<any> => {
	return grid.map(
		(rows, rowIndex) =>
			rows.filter((cols, colIndex) => {
				if (rowIndex + colIndex === grid.length - 1) {
					return true;
				}
				return false;
			})[0]
	);
};

const checkIsDiagonal = (
	gridRowIndex: number,
	gridColIndex: number,
	grid: Grid
): {
	diagonalGrid: Grid;
	diagonalType: DiagonalGridType | null;
} => {
	const diagonalGrid: Grid = [];

	// When entryPoints is in center of the diagonal i.e for this grid 11
	if (gridRowIndex === gridColIndex && Math.floor(grid.length / 2) === gridRowIndex) {
		diagonalGrid.push(getMainDiagonal(grid), getSecondaryDiagonal(grid));

		return {
			diagonalGrid,
			diagonalType: 'Both',
		};
	}

	// When entryPoints are in any of the Main diagonal i.e 00, 11, 22
	if (gridRowIndex === gridColIndex) {
		diagonalGrid.push(getMainDiagonal(grid));

		return {
			diagonalGrid,
			diagonalType: 'Main',
		};
	}

	//when entryPoints are in any of the secondary diagonal i.e 20, 02
	if (gridRowIndex % 2 === 0 && gridColIndex % 2 === 0) {
		diagonalGrid.push(getSecondaryDiagonal(grid));

		return {
			diagonalGrid,
			diagonalType: 'Secondary',
		};
	}

	return {
		diagonalGrid,
		diagonalType: null,
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
	isDiagonal: boolean;
	diagonalType: DiagonalGridType | null;
} => {
	const { diagonalGrid, diagonalType } = checkIsDiagonal(gridRowIndex, gridColIndex, grid);
	const { isWin, isRow, isCol, isDiagonal } = checkGameWinnerInGrid(
		currentPlayer,
		grid[gridRowIndex],
		grid.map((rows, index) => rows.filter((_, index) => index === gridColIndex)[0]),
		{
			diagonalGrid,
			diagonalType,
		}
	);
	if (isWin) {
		return {
			isWin,
			isRow,
			isCol,
			index: isRow ? gridRowIndex : gridColIndex,
			isDiagonal,
			diagonalType,
		};
	}

	return {
		isWin: false,
		isRow: false,
		isCol: false,
		index: null,
		isDiagonal: false,
		diagonalType: null,
	};
};
