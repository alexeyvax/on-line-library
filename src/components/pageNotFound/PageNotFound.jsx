import React from 'react';
import PropTypes from 'prop-types';

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

PageNotFound.propTypes = {
	location: PropTypes.object.isRequired,
};

export default PageNotFound;
