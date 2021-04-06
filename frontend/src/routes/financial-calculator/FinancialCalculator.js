import React, { useState } from 'react';
import './FinancialCalculator.css';

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

	const calculatePayback = (event) => {
		event.preventDefault();
		var effectiveInterest = (Math.pow((1 + ((formData.nominalInterest)/100)/365), 30.42) - 1);
		if ((formData.loanPayment - formData.outstandingLoan*effectiveInterest) <= 0) {
			setDisplayedPayback({...displayedPayback, years: null, months: null});
			setCannotPayBack(true);
		} else {
			setCannotPayBack(null);
			var totalMonths = Math.ceil( (Math.log(formData.loanPayment) - Math.log(formData.loanPayment - formData.outstandingLoan * effectiveInterest)) 
			/ Math.log(1 + effectiveInterest));
			setDisplayedPayback({...displayedPayback, years: (Math.floor(totalMonths / 12)), months: (totalMonths % 12)});
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
		</div>
	);
}

export default FinancialCalculator;
