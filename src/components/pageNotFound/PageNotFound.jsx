import React from 'react';

const PageNotFound = ({ location }) => {
	// console.log(location);
	return (
		<div>
			<h1>Page not found!</h1>
			<p>bad path: {location.pathname}</p>
			<a href="/">Back to main page</a>
			{/*<button onClick={}>Back to main page</button>*/}
		</div>
	);
};

export default PageNotFound;
