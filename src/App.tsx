import { ReactElement } from 'react';
import styled from '@emotion/styled';

import { MainApp } from './components/main-app';

const Main = styled.main`
	text-align: center;
`;

function App(): ReactElement {
	return (
		<Main>
			<h1>Tic Tac Toe</h1>
			<MainApp />
		</Main>
	);
}

export default App;
