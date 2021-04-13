import React, { useState } from 'react';
import { StackedBarChart } from "@carbon/charts-react";
import './FinancialCalculator.css';

const chartOptions = {
	title: "Outstanding loans per month",
	axes: {
		left: {
			mapsTo: "value",
			stacked: true
		},
		bottom: {
			mapsTo: "key",
			scaleType: "labels"
		}
	},
	height: "400px"
};

const FinancialCalculator = () => {
	const [formData, setFormData] = useState({
		nominalInterest: null,
		outstandingLoan: null,
		loanPayment: null
	});

	const [cannotPayBack, setCannotPayBack] = useState(null);

	const [displayedPayback, setDisplayedPayback] = useState({
		years: null,
		months: null
	});

	const [chartData, setChartData] = useState([])

	const generateChartData = () => {
		let totalOutstandingLoan = formData.outstandingLoan;
		const effectiveInterest = (Math.pow((1 + ((formData.nominalInterest)/100)/365), 30.42) - 1);
		const chartData = [];
		let currentMonth = 1;
		let interestAccrued = 0;
		while (totalOutstandingLoan - formData.loanPayment > 0) {
			totalOutstandingLoan -= formData.loanPayment;
			const displayedOutstandingLoan = totalOutstandingLoan;
			totalOutstandingLoan += displayedOutstandingLoan*(effectiveInterest);
			interestAccrued += displayedOutstandingLoan*(effectiveInterest);
			if (currentMonth % 6 === 0) {
				chartData.push({
					"group": "Outstanding Loan",
					"value": displayedOutstandingLoan,
					"key": `Loan-Month-${currentMonth}`
				})
				chartData.push({
					"group": "Montly Payment",
					"value": formData.loanPayment,
					"key": `Loan-Month-${currentMonth}`
				})
				chartData.push({
					"group": "Interest Accrued",
					"value": interestAccrued,
					"key": `Loan-Month-${currentMonth}`
				})
			}
			currentMonth++;
		}
		chartData.push({
			"group": "Outstanding Loan",
			"value": totalOutstandingLoan,
			"key": `Loan-Month-${currentMonth}`
		})
		chartData.push({
			"group": "Montly Payment",
			"value": formData.loanPayment,
			"key": `Loan-Month-${currentMonth}`
		})
		chartData.push({
			"group": "Interest Accrued",
			"value": interestAccrued,
			"key": `Loan-Month-${currentMonth}`
		})
		return chartData;
	};

	const calculatePayback = (event) => {
		event.preventDefault();
		var effectiveInterest = (Math.pow((1 + ((formData.nominalInterest)/100)/365), 30.42) - 1);
		if ((formData.loanPayment - formData.outstandingLoan*effectiveInterest) <= 0) {
			setDisplayedPayback({...displayedPayback, years: null, months: null});
			setChartData([]);
			setCannotPayBack(true);
		} else {
			setCannotPayBack(null);
			setChartData([]);
			setDisplayedPayback({...displayedPayback, years: null, months: null});
			var totalMonths = Math.ceil( (Math.log(formData.loanPayment) - Math.log(formData.loanPayment - formData.outstandingLoan * effectiveInterest)) 
			/ Math.log(1 + effectiveInterest));
			setDisplayedPayback({...displayedPayback, years: (Math.floor(totalMonths / 12)), months: (totalMonths % 12)});
			setChartData(generateChartData());
		}
	}

	return (
		<div className='FormWrapper'>
			<h1>Financial Calculator</h1>
			<form onSubmit={calculatePayback}>
				<div className='FormInputsWrapper'>
					<label className='InputWrapper'>
						Outstanding Loan
						<input
							type='number'
							step='0.01'
							className='FormInput'
							value={formData.outstandingLoan}
							onChange={event => setFormData({
								...formData,
								outstandingLoan: parseFloat(event.target.value)
							})} />
					</label>
					<label className='InputWrapper'>
						Current Interest Rate
						<input
							type='number'
							step='0.01'
							className='FormInput'
							value={formData.nominalInterest}
							onChange={event => setFormData({
								...formData,
								nominalInterest: parseFloat(event.target.value)
							})} />%
					</label>
					<label className='InputWrapper'>
						Monthly Loan Payment
						<input
							type='number'
							step='0.01'
							className='FormInput'
							value={formData.loanPayment}
							onChange={event => setFormData({
								...formData,
								loanPayment: parseFloat(event.target.value)
							})} />
					</label>
					<input className='SubmitButton' type='submit' value='Submit' />
				</div>
			</form>
			<div>
				{ displayedPayback.years && <><h3>The calculated payback time is:</h3><p>{displayedPayback.years} yrs {displayedPayback.months} mths</p></> }
				{ cannotPayBack && <><h3>The loan can not be paid back with this payment amount</h3></> }
			</div>
			{ chartData.length && <StackedBarChart data={chartData} options={chartOptions} /> }
		</div>
	);
}

export default FinancialCalculator;
