import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Entry, Grid } from '../main-app';

const GridContainer = styled.div`
	display: grid;
	justify-content: center;
	grid-template-rows: repeat(${(props: GameGridProps) => props.rows}, 50px);
	grid-template-columns: repeat(${(props: GameGridProps) => props.cols}, 50px);
`;

const Cell = styled.div`
	border: 3px solid black;
	margin-left: -3px;
	margin-top: -3px;
`;

const CellContents = styled.div`
	font-size: 35px;
	font-weight: bold;
	color: ${(props: { content: string | boolean }) =>
		props.content && props.content === 'X' ? 'crimson' : ''};
`;

export interface GameGridProps {
	rows: number;
	cols: number;
	grid?: Grid;
	handleGrid?: (entryPoints: Entry) => void;
}

export function GameGrid({ rows, cols, grid, handleGrid }: GameGridProps): ReactElement {
	return (
		<GridContainer rows={rows} cols={cols}>
			{grid &&
				grid.map((rows, i) =>
					rows.map((cols, j) => (
						<Cell
							key={i + 'row' + j + 'col'}
							onClick={() => handleGrid && handleGrid({ x: i, y: j })}
						>
							<CellContents content={cols}>{cols && cols}</CellContents>
						</Cell>
					))
				)}
		</GridContainer>
	);
}
