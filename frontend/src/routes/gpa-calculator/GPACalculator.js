import React, { useState } from 'react';
import "@carbon/charts/styles.css";
import { SimpleBarChart } from "@carbon/charts-react";

import { parse } from '../../shared/parser';
import './GPACalculator.css';

const GPACalculator = ({sharedData, setSharedData}) => {
	const [formData, setFormData] = useState({
		numberOfCourses: null,
		gradeScale: 12.0
	});
	const [GPAgraph, setGPAgraph] = useState({
		semesterGPA: null,
		option: null
	});
	const [errormsg, seterrormsg] = useState(null);

	const handleFileInput = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		const semesters = await parse(file);
		setSharedData({
			...sharedData,
			transcript: semesters
		});

	}
	const letter2point12 = {"A+": 12.0, "A": 11.0, "A-": 10.0, "B+": 9.0, "B": 8.0, "B-": 7.0, "C+": 6.0, "C": 5.0, "C-": 4.0, "D+": 3.0, "D": 2.0, "D-": 1.0, "F": 0.0};
	const letter2point4 = {"A+": 4.0, "A": 3.9, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0};

	function allCourses(transcript){
		let sum = 0;
		for (let i = 0; i < transcript.length; i++){
			sum += transcript[i].coursesWithGrades.length;
		}
		return sum;
	}

	const calcGPA = (n) => {
		let achieved = 0;
		let sum = 0;
		let semesterAchieved = 0;
		let semesterSum = 0;
		let GPAlist = [];
		let scale = formData.gradeScale;
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
				if (course.grade !== null && course.grade !== "COM") {
					if (scale == 12.0) {
						achieved += letter2point12[course.grade] * parseFloat(course.weightAchieved);
						semesterAchieved += letter2point12[course.grade] * parseFloat(course.weightAchieved);
					}
					else {
						achieved += letter2point4[course.grade] * parseFloat(course.weightAchieved);
						semesterAchieved += letter2point4[course.grade] * parseFloat(course.weightAchieved);
					}
					n -= 1;
				}
				sum += parseFloat(course.weightAchieved);
				semesterSum += parseFloat(course.weightAchieved);
			}
			if (semesterSum > 0)
				GPAlist.push({ group: "Semester " + (i+1), key: "Semester " + (i+1), value: (semesterAchieved/semesterSum).toFixed(2) });
			semesterAchieved = 0;
			semesterSum = 0;
		}
		setSharedData({
			...sharedData,
			GPA: (achieved/sum).toFixed(2)}
			);
		return [errormsg, GPAlist];
	}

	const setGPA = (n) => {
		let errormsg = calcGPA(n)[0];
		let GPAlist = calcGPA(n)[1];
		if (errormsg) {
			seterrormsg("Missing transcript or Invalid file input!");
			return;
		}
		else
			seterrormsg(null);
		setGPAgraph({
			option: {
				title: "GPA Bar Chart",
				axes: {
					bottom: {
						title: "Semester",
						mapsTo: "key",
						scaleType: "labels"
					},
					left: {
						mapsTo: "value",
						title: "Average GPA",
						scaleType: "linear"
					}
				},
				height: "400px"
			},
			semesterGPA: GPAlist.reverse()
		});
	}

	return (
		<div className='FormWrapper'>
			<h1>GPA Calculator</h1>
			<h2 style={{color: 'red'}}>{errormsg}</h2>
			<div className='GPAFormInputsWrapper'>
				<label className='GPAInputWrapper'>
					Last 
					<input
						type='number'
						min='1'
						className='GPAFormInput'
						value={formData.numberOfCourses}
						onChange={event => setFormData({
							...formData,
							numberOfCourses: event.target.value
						})} />
					courses will be taken into account
					<h4>No input here means all courses</h4>
				</label>
				<label className='GPAInputWrapper'>
				Choose GPA Scales 
				<select onChange={event => setFormData({
							...formData,
							gradeScale: event.target.value
						})}>
				<option value='12.0'>12-Point</option>
				<option value='4.0'>4.0 Scale</option>
				</select>
				</label>
				<label className='GPAFileWrapper'>
				<input type="file" onChange={(e) => handleFileInput(e)} />
				</label>
				<input className='GPASubmitButton' type='submit' value='Submit' onClick={() => {setGPA(formData.numberOfCourses)}}/>
			</div>
		
		<div>
			{ sharedData.GPA && <><h3>Accumulated GPA of these courses is:</h3><p>{sharedData.GPA}</p></> }
		</div>
		{GPAgraph.semesterGPA && GPAgraph.option && !errormsg && <SimpleBarChart
				data={GPAgraph.semesterGPA}
				options={GPAgraph.option}>
		</SimpleBarChart>}
	</div>
	);
}

export default GPACalculator;

