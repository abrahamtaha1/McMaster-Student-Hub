import React, { useState } from 'react';

import { parse } from '../../shared/parser'
import './Prerequisites.css';

const Prerequisites = ({sharedData, setSharedData}) => {
	const [programChoice, setProgramChoice] = useState('Basket weaving');
	const [requirementsResult, setRequirementsResult] = useState(null);

	const handleFileInput = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const semesters = await parse(file);
		setSharedData({
			...sharedData,
			transcript: semesters
		});
	}

	const calculatePrerequisites = async () => {
		const requestOptions = {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ program: programChoice })
		};

        const res = await (await fetch('http://localhost:3001/program-prerequisites', requestOptions)).json();

		// Check prerequisites against the parsed transcript here
		setRequirementsResult(res?.givenProgramName);
    }

	return (
		<div className='Wrapper'>
			<h1>Graduate Program Prerequisite Checker</h1>
			<input type="file" onChange={(e) => handleFileInput(e)} />
			<select style={{ marginTop: '1rem' }} onChange={(event) => setProgramChoice(event.target.value)}>
				<option value='Basket weaving'>Basket weaving</option>
				<option value='Software eng'>Software Eng</option>
				<option value='Philosophy'>Philosophy</option>
				<option value='Med school'>Med school</option>
			</select>
			<button style={{ marginTop: '1rem' }} onClick={() => calculatePrerequisites()}>
				Check program requirements
			</button>
			<h3>{ requirementsResult }</h3>
		</div>
	);
}

export default Prerequisites;
