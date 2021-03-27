import React, { useState } from 'react';

const Reviews = () => {
    const [results, setResults] = useState({
        data: []
    });
    const makeRequest = async () => {
        const res = await (await fetch('http://localhost:3001/reviews')).json();
        setResults({
            ...results,
            data: [...results.data, res.data]
        })
    }

	return (
		<div>
			<h1>Property Reviews</h1>
            <button onClick={() => { makeRequest() }}>Make a test request</button>
            { results?.data.map((data, index) => <h1 key={index}>{ data }</h1>) }
		</div>
	);
}

export default Reviews;
