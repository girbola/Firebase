import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';

const EditStudent = props => {
	const [student, setStudent] = useState({
		studentid: props.studentID,
		city: props.city,
		name: props.name,
		email: props.email,
		phone: props.phone,
	});
	useEffect(() => {
		fetch('https://tkareact.firebaseio.com/students/')
			.then(function(response) {
				//response is plain encoded text
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}
				//convert text to json
				response.json().then(function(data) {
					setStudent(data);
				});
			})
			.catch(function(err) {
				console.log('Fetch Error : ', err);
			});
	}, []);
	// { studentID: 'e1901043', name: 'Marko', city: 'Turku' });
	return (
		<div>
			<form>
				<label>StudentID</label>
				<input value={student.studentid} onChange={e => updateStudent(e)} placeholder="StudentID"></input>
				<br />

				<label>Name</label>
				<input value={student.name} onChange={e => validateName(e)} placeholder="Name"></input>
				<br />

				<label>City</label>
				<input value={student.city} placeholder="City"></input>
				<br />

				<label>Email</label>
				<input
					id="email"
					type="email"
					value={student.email}
					onChange={e => updateEmail(e)}
					placeholder="Email"
				></input>
				<br />

				<label>Phone</label>
				<input id="phone" value={student.phone} onChange={e => updatePhone(e)} placeholder="Phone"></input>
				<br />
			</form>
			<button onClick={save}>Save</button>
			<div>Stringify {JSON.stringify(student)}</div>
		</div>
	);
	// onChange={(social, e) => {
	// 	validateSOS(e);
	// 	// setSocial(social);
	// 	// console.log(e);
	// }}

	function updateEmail(event) {
		const reg = new RegExp(/\S+@\S+\.\S+/);
		const test = reg.test(event.target.value);

		console.log('VALUE: ' + event.target.value + ' test: ' + test);
		if (test) {
			document.getElementById('email').style.background = 'yellow';
		} else {
			document.getElementById('email').style.background = 'red';
		}
	}
	function updatePhone(event) {
		const reg = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
		const test = reg.test(event.target.value);

		console.log('VALUE: ' + event.target.value + ' test: ' + test);
		if (test) {
			document.getElementById('phone').style.background = 'yellow';
		} else {
			document.getElementById('phone').style.background = 'red';
		}

		setStudent({ phone: event.target.value });
	}
	function validateName(event) {
		const value = capitalizeFirstLetter(event.target.value);
		if (value.length >= 0) {
			setStudent({ name: value });
		}
	}
	function capitalizeFirstLetter(value) {
		if (value.length >= 1) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		} else {
			return '';
		}
	}

	function save() {
		fetch('https://tkareact.firebaseio.com/students/e1901043.json', {
			method: 'PATCH',
			'Content-Type': 'application/json',
			body: JSON.stringify(student),
		})
			.then(function(response) {
				//response is plain encoded text
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}
				//convert text to json
				response.json().then(function(data) {
					setStudent(data);
				});
			})
			.catch(function(err) {
				console.log('Fetch Error : ', err);
			});
	}
	function updateStudent(e) {
		let s = Object.assign({}, student);
		s[e.target.name] = e.target.value;
		setStudent(s);
	}
};

export default EditStudent;
