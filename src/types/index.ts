export type Opponent = 'player' | 'computer';

export type PlayType = 'X' | 'O';

export type Grid = Array<Array<any>>;

export type DiagonalGridType = 'Main' | 'Secondary' | 'Both';

export interface Entry {
	x: number;
	y: number;
}
