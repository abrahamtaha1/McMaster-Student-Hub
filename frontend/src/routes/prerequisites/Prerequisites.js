import React, { useState, useEffect } from 'react';
import GPACalculator from '../gpa-calculator/GPACalculator'
import { parse } from '../../shared/parser'
import './Prerequisites.css';


let requirementsResult;
let setRequirementsResult;
let GPA;
let gpaReq;
// let prereqNeeded = [];
const Prerequisites = ({sharedData, setSharedData}) => {
	const [programChoice, setProgramChoice] = useState('MBA');
	// const [requirementsResult, setRequirementsResult] = useState(null);
	const [GPA, setGPA] = useState(-1)
	const [prereqNeeded, setPrereqNeeded] = useState([])

	const letter2point12 = {"A+": 12.0, "A": 11.0, "A-": 10.0, "B+": 9.0, "B": 8.0, "B-": 7.0, "C+": 6.0, "C": 5.0, "C-": 4.0, "D+": 3.0, "D": 2.0, "D-": 1.0, "F": 0.0};

	function allCourses(transcript){
		let sum = 0;
		for (let i = 0; i < transcript.length; i++){
			sum += transcript[i].coursesWithGrades.length;
		}
		return sum;
	}

	const calcGPA = async (n) => {
		let achieved = 0;
		let sum = 0;
		let semesterAchieved = 0;
		let semesterSum = 0;
		let GPAlist = [];
		let errormsg = false;
		if (!sharedData.transcript || !sharedData.transcript.length) {
			errormsg = true;
			setSharedData({
				...sharedData,
				GPA: null
			});
			return [errormsg, GPAlist];
		}
		else	errormsg = false;
		if(!n)
			n = allCourses(sharedData.transcript);
		for (let i = sharedData.transcript.length - 1; i >= 0; i--) {
			if (n <= 0)	break;
			for (let course of sharedData.transcript[i].coursesWithGrades) {
				if (n <= 0)	break;
				if (course.grade !== null && course.grade !== "COM" && course.grade !== "E") {
					achieved += letter2point12[course.grade] * parseFloat(course.weightAchieved);
					semesterAchieved += letter2point12[course.grade] * parseFloat(course.weightAchieved);
					n -= 1;
				}
				sum += parseFloat(course.weightAchieved);
				semesterSum += parseFloat(course.weightAchieved);
			}
			if (semesterSum > 0)
				GPAlist.push({group: "Semster GPA", key: "Semester " + (i+1), value: (semesterAchieved/semesterSum).toFixed(2)});
			semesterAchieved = 0;
			semesterSum = 0;
		}
		setGPA((achieved/sum).toFixed(2))

		////////////////////////////////////////////// 
		const requestOptions = {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ programChoice : programChoice })
		};

		const res = await (await fetch('http://localhost:3001/program-prerequisites', requestOptions)).json();

		// Check prerequisites against the parsed transcript here
		//setRequirementsResult(res.givenProgramName);
		requirementsResult = res.givenProgramName;
		gpaReq = res.gpaReq;
	}


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
		const currentCourses = [];

		// reset global variables
		let prereqNeededTemp = [];
		requirementsResult = []

		await calcGPA()

		for (let i = sharedData.transcript.length - 1; i >= 0; i--) {
			for (let course of sharedData.transcript[i].coursesWithGrades) {
				currentCourses.push(course.course);
			}
		}

		for(let i = requirementsResult.length - 1; i >= 0; i--){
			if(!currentCourses.includes(requirementsResult[i])){
				prereqNeededTemp.push(requirementsResult[i]);
			}
		}
		setPrereqNeeded(prereqNeededTemp)
    }

	let gpaDisplay = (GPA !== null && GPA !== -1) ? 'Current GPA : ' + GPA + '\n\n\nNeeded GPA: ' + gpaReq : ''

	return 	(
		
		<div className='Wrapper'>
			<h1>Graduate Program Prerequisite Checker</h1>
			<input type="file" onChange={(e) => handleFileInput(e)} />
			<select style={{ marginTop: '1rem' }} onChange={(event) => setProgramChoice(event.target.value)}>
				<option value='MBA'>Master of Business Administration (MBA)</option>
				<option value='MEng'>Manufacturing Engineering (MEng)</option>
			</select>
			<button style={{ marginTop: '1rem' }} onClick={async () => await calculatePrerequisites()}>
				Check program requirements
			</button>
			<h3>{gpaDisplay}</h3>
			<h3>Prerequisite needed: { prereqNeeded.map((el) => <li key={el}>{el}</li>) }</h3>
		</div>
	);
}


export default Prerequisites;
