import React, { useState } from 'react';

import { parse } from '../../shared/parser'

const LandingPage = ({sharedData, setSharedData}) => {
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
			<h1>Landing Page</h1>
			<input type="file" onChange={(e) => handleFileInput(e)} />
			{ sharedData?.transcript && <div><pre>{ JSON.stringify(sharedData.transcript, null, 2) }</pre></div> }
		</div>
	);
}

export default LandingPage;
