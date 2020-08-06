import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

const ListStudent = props => {
	const [student, setStudent] = useState({});
	const [studentsArray, setStudentsArray] = useState([]);

	useEffect(() => {
		fetch(' https://tkareact.firebaseio.com/students.json')
			.then(function(response) {
				//response is plain encoded text
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}
				//convert text to json
				response.json().then(function(data) {
					//convert key-value -apairs to an array
					const sArray = Array.from(Object.keys(data), k => data[k]);
					//save the array to useState variable
					setStudentsArray(sArray);
				});
			})
			.catch(function(err) {
				console.log('Fetch Error : ', err);
			});
	}, []);
	const columns = [
		{
			Header: 'StudentId',
			accessor: 'studentid',
		},
		{
			Header: 'Nimi',
			accessor: 'name',
		},
		{
			Header: 'City',
			accessor: 'city',
		},
		{
			Header: 'Email',
			accessor: 'email',
		},
	];
	// return <div>JSON.stringfi(students)</div>;
	return <ReactTable data={studentsArray} columns={columns} />;
};

export default ListStudent;
