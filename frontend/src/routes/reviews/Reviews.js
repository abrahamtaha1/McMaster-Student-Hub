import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './Reviews.css';

const columns = [
    { field: 'timeStamp', headerName: 'Time Stamp', width: 200 },
    { field: 'propertyAddress', headerName: 'Property Address', width: 200 },
    { field: 'monthlyRent', headerName: 'Monthy Rent', width: 200 },
    { field: 'landlordScore', headerName: 'Landlord Score', width: 200 },
    { field: 'numberOfRoomates', headerName: 'Number Of Roomates', width: 200 },
    { field: 'overallPropertyRating', headerName: 'Overall Property Rating', width: 200 },
];

const Reviews = () => {
    const [tableData, setTableData] = useState([])

    const [filterData, setFilterData] = useState({
		maxPrice: null,
		minScore: null,
		minRating: null,
        maxRoomates: null
	});

    const [formData, setFormData] = useState({
        maxPrice: null,
        minLandlordScore: null,
        minRating: null,
        maxRoomates: null
    });

    const makeRequest = async () => {
        const requestOptions = {
			method: 'POST',
			Accept: 'application/json',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		};

		const resValues = await (await fetch('http://localhost:3001/reviews', requestOptions)).json();
        const rows = resValues
        console.log(rows)
        setTableData(rows.map((row, index) => ({
            id: index,
            timeStamp: row[0],
            propertyAddress: row[1],
            monthlyRent: row[2],
            landlordScore: row[3],
            numberOfRoomates: row[4],
            overallPropertyRating: row[5]
        })))
    }

	return (
		<div>
			<h1>Property Reviews</h1>
            <form>
				<p>
					<a href="https://docs.google.com/forms/d/e/1FAIpQLScZHp0KeYd8uIO4NhzDP1lTy6Hbrw1LBklOr0HsXNMuRiA4aw/viewform?usp=sf_link">Click Here </a>
					to submit your own property review.
				</p>
				<div className='FormInputsWrapper'>
					<label className='InputWrapper'>
						Maximum rent price
						<input
							type='number'
                            min={0}
							step='0.01'
							className='FormInput'
							value={formData.maxPrice}
							onChange={event => setFormData({
								...formData,
								maxPrice: parseFloat(event.target.value)
							})} />
					</label>
                    <label className='InputWrapper'>
						Minimum landlord score
						<input
							type='number'
							step='0.01'
                            min={0}
                            max={5}
							className='FormInput'
							value={formData.minLandlordScore}
							onChange={event => setFormData({
								...formData,
								minLandlordScore: parseFloat(event.target.value)
							})} />
					</label>
                    <label className='InputWrapper'>
						Minimum rating
						<input
							type='number'
							step='0.01'
                            min={0}
                            max={5}
							className='FormInput'
							value={formData.minRating}
							onChange={event => setFormData({
								...formData,
								minRating: parseFloat(event.target.value)
							})} />
					</label>
                    <label className='InputWrapper'>
						Maximum number of roommates
						<input
							type='number'
							step='0.01'
                            min={0}
                            max={10}
							className='FormInput'
							value={formData.maxRoomates}
							onChange={event => setFormData({
								...formData,
								maxRoomates: parseFloat(event.target.value)
							})} />
					</label>
				</div>
			</form>
            <button  className='SubmitButton'  onClick={() => { makeRequest() }}>Get property metrics</button>
            <div style={{ height: 400, width: '100%' }}>
                { tableData.length !== 0 && <DataGrid rows={tableData} columns={columns} pageSize={5} checkboxSelection /> }
            </div>
		</div>
	);
}

export default Reviews;
