import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Entry } from '../main-app';
import { Grid } from '../../types';

const GridContainer = styled.div`
	display: grid;
	justify-content: center;
	grid-template-rows: repeat(${(props: GridContainerProps) => props.rows}, 50px);
	grid-template-columns: repeat(${(props: GridContainerProps) => props.cols}, 50px);
`;

const Cell = styled.div`
	border: 3px solid black;
	margin-left: -3px;
	margin-top: -3px;
    filter: ${(props: CellProps) => (!props.win ? 'none' : 'blur(5px)')};
}
`;

const CellContents = styled.div`
	font-size: 35px;
	font-weight: bold;
	color: ${(props: { content: string | boolean }) =>
		props.content && props.content === 'X' ? 'crimson' : ''};
`;

export interface CellProps {
	win: boolean;
}

export interface GridContainerProps {
	rows: number;
	cols: number;
}
export interface GameGridProps {
	rows: number;
	cols: number;
	grid?: Grid;
	handleGrid?: (entryPoints: Entry) => void;
	isGameComplete: boolean;
}

export function GameGrid({
	rows,
	cols,
	grid,
	handleGrid,
	isGameComplete,
}: GameGridProps): ReactElement {
	return (
		<GridContainer rows={rows} cols={cols}>
			{grid &&
				grid.map((rows, i) =>
					rows.map((cols, j) => (
						<Cell
							win={isGameComplete && !cols}
							key={i + 'row' + j + 'col'}
							onClick={() => handleGrid && handleGrid({ x: i, y: j })}
						>
							{cols ? <CellContents content={cols}>{cols}</CellContents> : null}
						</Cell>
					))
				)}
		</GridContainer>
	);
}
