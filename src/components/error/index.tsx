import { ReactElement } from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div``;

export interface ErrorComponentProps {
	errorMessage: string;
}

export function ErrorComponent({ errorMessage }: ErrorComponentProps): ReactElement {
	return <ErrorContainer>{errorMessage}</ErrorContainer>;
}
