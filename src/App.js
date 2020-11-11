import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Child from './child';

function App() {

	const [gameID, setGameID] = useState(0);

	const reload = () => {
		setGameID(gameID + 1)
	}

	return (
		<>
			<p id="tictactoe"> TIC - TAC - TOE </p>
			<Child key={gameID} reloadGame={reload} />
		</>
	);
}

export default App;
