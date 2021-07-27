import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Opponent } from '../../types';

import { ButtonData } from '../main-app';

export interface ButtonProps {
	buttonText: string;
	isSelected: boolean;
}

export interface ControlsProps {
	buttonData: Array<ButtonData>;
	isPlayerHandler: (opponent: Opponent) => void;
}

const Button = styled.button`
	background-color: ${(props: ButtonProps) => (props.isSelected ? 'black' : 'transparent')};
	color: ${(props: ButtonProps) => (props.isSelected ? 'white' : 'black')};
	width: 120px;
	height: 30px;
	outline: none;
	margin: 10px;
	border-color: black;
	border-bottom: ${(props: ButtonProps) =>
		props.isSelected ? '3px solid black' : '3px solid #ff3535'};
	border-right: ${(props: ButtonProps) =>
		props.isSelected ? '3px solid black' : '3px solid #ff3535'};
	border-left: ${(props: ButtonProps) =>
		props.isSelected ? '3px solid #ff3535' : '3px solid black'};
	border-top: ${(props: ButtonProps) =>
		props.isSelected ? '3px solid #ff3535' : '3px solid black'};

	&:hover {
		width: 130px;
		height: 35px;
		border-top: 3px solid #ff3535;
		border-left: 3px solid #ff3535;
		border-bottom: 3px solid black;
		border-right: 3px solid black;
	}
`;

export function Controls({ buttonData, isPlayerHandler }: ControlsProps): ReactElement {
	return (
		<>
			{buttonData.map((btns, index) => (
				<Button key={index} onClick={() => isPlayerHandler(btns.opponentType)} {...btns}>
					{btns.buttonText}
				</Button>
			))}
		</>
	);
}
