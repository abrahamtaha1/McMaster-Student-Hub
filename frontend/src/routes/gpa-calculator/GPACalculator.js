import React, { useState } from 'react';

import { parse } from '../../shared/parser'

const GPACalculator = ({sharedData, setSharedData}) => {
	const handleFileInput = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const semesters = await parse(file);
		setSharedData({
			...sharedData,
			transcript: semesters
		});
	}

	return (
		<div>
			<h1>GPA Calculator</h1>
			<input type="file" onChange={(e) => handleFileInput(e)} />
		</div>
	);
}

export default GPACalculator;
