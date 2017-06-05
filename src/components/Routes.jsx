import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import observable from '../lib/emitter';
import App from './App.jsx';
import InternalPageBook from './internal/InternalPageBook.jsx';
import PageNotFound from './pageNotFound/PageNotFound.jsx';

const Routes = props => {
	let { listBooks } = props;
	/** Update data list of books */
	observable.addListener('updateListBooks', updateListBook => {
		listBooks = updateListBook;
	});
	
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
					<Route path='*' component={PageNotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default Routes;
