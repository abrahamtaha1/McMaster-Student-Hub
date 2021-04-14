import React, { useState } from 'react';

import './LandingPage.css';

const LandingPage = ({sharedData, setSharedData}) => {
	return (
		<div>
			<div class="row">
  <div class="column" style = {{backgroundColor: "#F5F5DC"}}>
    <h1>GPA Calculator </h1>
    <p>Using your McMaster transcript, quickly 
		calculate your cGPA with ease. 
	</p>

	<p>
		Available in both 12.0 and 4.0 format. This
		tool also allows you to calculate your cGPA based on a
		specified number of courses, if you're only interested 
		in later year classes, for example.
	</p>
  </div>
  <div class="column" style = {{backgroundColor: "#F5F5DC"}}>
    <h1>Grad Prerequisites Checker</h1>
    <p>Using your McMaster Transcript, quickly
		check if you sastify both the course and cGPA
		requirements for your given graduate program choice.
	<br></br>
		This tool will also notify you of your
		outstanding requirements to be filled.
	</p>
  </div>
  <div class="column" style = {{backgroundColor: "#F5F5DC"}}>
    <h1>Financial Calculator</h1>
    <p>Inputting your current outstanding loans, the current intrest rate
		and your montly loan payments you can determine your payback time.
	</p>
  </div>
  <div class="column" style = {{backgroundColor: "#F5F5DC"}}>
    <h1>Property Reviews</h1>
    <p>Explore various proerties for rent around McMaster
		and use filters to narrow your search down to the perfect property.
	</p>
	<p>
	<a href="https://docs.google.com/forms/d/e/1FAIpQLScZHp0KeYd8uIO4NhzDP1lTy6Hbrw1LBklOr0HsXNMuRiA4aw/viewform?usp=sf_link">Click Here </a>
	to submit your own property review.
	</p>
  </div>
</div>
		</div>
	);
}

export default LandingPage;
