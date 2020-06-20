import React from 'react';
import './App.css';
import Routes from './routes';
import ContextWrapper from './user-contex';

import { Container } from 'reactstrap';

function App() {
	return (
		<ContextWrapper>
			<Container>
				<h1>Event app</h1>
				<div className='content'>
					<Routes />
				</div>
			</Container>
		</ContextWrapper>
	);
}

export default App;
