import React from 'react';
import logo from './logo.svg';
import './App.css';
import EditStudent from './components/EditStudent';
import ListStudent from './components/ListStudents';

function App() {
	return (
		<div className="App">
			{/* <EditStudent /> */}
			<h1>w62 Create a React client to update your Firebase data</h1>
			{/* <ListStudent /> */}
			<EditStudent />
		</div>
	);
}

export default App;
