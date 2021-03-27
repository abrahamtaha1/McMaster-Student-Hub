import React, { useState } from 'react';
import './FinancialCalculator.css';

const FinancialCalculator = () => {
	const [formData, setFormData] = useState({
		currentInterest: null,
		outstandingLoanCost: null
	});

	const [displayedPayback, setDisplayedPayback] = useState(null);

	const calculatePayback = (event) => {
		event.preventDefault();
		setDisplayedPayback(formData.currentInterest + formData.outstandingLoanCost); // TODO: Change this.
	}

	return (
		<div className='FormWrapper'>
			<h1>Financial Calculator</h1>
			<form onSubmit={calculatePayback}>
				<div className='FormInputsWrapper'>
					<label className='InputWrapper'>
						Current Interest
						<input
							type='number'
							className='FormInput'
							value={formData.currentInterest}
							onChange={event => setFormData({
								...formData,
								currentInterest: event.target.value
							})} />
					</label>
					<label className='InputWrapper'>
						Outstanding Loan Cost
						<input
							type='number'
							className='FormInput'
							value={formData.outstandingLoanCost}
							onChange={event => setFormData({
								...formData,
								outstandingLoanCost: event.target.value
							})} />
					</label>
					<input className='SubmitButton' type='submit' value='Submit' />
				</div>
			</form>
			<div>
				{ displayedPayback && <><h3>The calculated payback is:</h3><p>{displayedPayback}</p></> }
			</div>
		</div>
	);
}

export default FinancialCalculator;
