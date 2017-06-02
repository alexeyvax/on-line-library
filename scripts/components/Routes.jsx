import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import App from './App.jsx';
import InternalPageBook from './internal/InternalPageBook.jsx';
import PageNotFound from './pageNotFound/PageNotFound.jsx';

const Routes = props => {
	const { listBooks } = props;
	
	return(
		<Router>
			<div>
				<Switch>
					<Route
						exact={true}
						path='/'
						render={() => <App listBooks={listBooks} />}
					/>
					<Route
						path='/books/:book?'
						render={props => {
							return (
								<InternalPageBook
									listBooks={listBooks}
									{...props}
								/>
							);
						}
					} />
					<Redirect path='/books' to='/' />
					<Route component={PageNotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default Routes;
