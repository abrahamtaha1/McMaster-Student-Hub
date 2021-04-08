import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import './App.css';
import FinancialCalculator from './routes/financial-calculator/FinancialCalculator';
import GPACalculator from './routes/gpa-calculator/GPACalculator';
import LandingPage from './routes/landing-page/LandingPage';
import Prerequisites from './routes/prerequisites/Prerequisites';
import Reviews from './routes/reviews/Reviews';

const App = () => {
	const [sharedData, setSharedData] = useState({
		transcript: null,
		GPA: null
	});

	return (
		<Router>
			<nav>
				<ul>
					<Link to='/'>
						<li>Landing Page</li>
					</Link>
					<Link to='/gpa-calculator'>
						<li>GPA Calculator</li>
					</Link>
					<Link to='/prerequisites'>
						<li>Grad Prerequisites Checker</li>
					</Link>
					<Link to='/financial-calculator'>
						<li>Financial Calculator</li>
					</Link>
					<Link to='/property-reviews'>
						<li>Property Reviews</li>
					</Link>
				</ul>
			</nav>
			<Switch>
				<Route path='/' exact>
					<LandingPage sharedData={sharedData} setSharedData={setSharedData} />
				</Route>
				<Route path='/gpa-calculator'>
					<GPACalculator sharedData={sharedData} setSharedData={setSharedData}/>
				</Route>
				<Route path='/prerequisites'>
					<Prerequisites sharedData={sharedData} setSharedData={setSharedData} />
				</Route>
				<Route path='/financial-calculator'>
					<FinancialCalculator />
				</Route>
				<Route path='/property-reviews'>
					<Reviews />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
