import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './Reviews.css';

const columns = [
    { field: 'timeStamp', headerName: 'Time Stamp', width: 200 },
    { field: 'propertyAddress', headerName: 'Property Address', width: 200 },
    { field: 'monthyRent', headerName: 'Monthy Rent', width: 200 },
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

    const makeRequest = async () => {
        const res = await (await fetch('http://localhost:3001/reviews')).json();
        const resValues = res.values;
        resValues.shift()
        const rows = resValues
        setTableData(rows.map((row, index) => ({
            id: index,
            timeStamp: row[0],
            propertyAddress: row[1],
            montlyRent: row[2],
            landlordScore: row[3],
            numberOfRoomates: row[4],
            overallPropertyRating: row[5]
        })))
    }

	return (
		<div>
			<h1>Property Reviews</h1>
            <button onClick={() => { makeRequest() }}>Make a test request</button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={tableData} columns={columns} pageSize={5} checkboxSelection />
            </div>
		</div>
	);
}

export default Reviews;
