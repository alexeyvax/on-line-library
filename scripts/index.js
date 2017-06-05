import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes.jsx';
const data = window.__PRELOADED_STATE__.replace(/&quot;/g, '"') || []; // Использовать при handlebars
const listBooks = JSON.parse(data.replace(/^["']|["']$/g, '')) || []; // обрезаю кавычки в начале и в конце

// const home = <App listBooks={listBooks} />;

/*const home = (props) => {
	console.log( props );
	return <h1>Home</h1>;
};

const Links = () => {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to={{pathname: '/test'}}>Test</Link>
			<Link replace to='/about'>About</Link>
		</nav>
	);
};*/

/*const Home = () => (<h1>Home</h1>);
const Menu = () => (
	<div>
		<Redirect from='/menu' to='/menu/one' />
		<Link to='/menu/one'>one</Link>
		<Link to='/menu/two'>two</Link>
		<Link to='/menu/three'>three</Link>
		<Route 
			path='/menu/:section' 
			render={({match}) => (<h2>{match.params.section}</h2>)}
		/>
	</div>
);*/

/*const Links = () => {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<Link to='/contacts'>Contacts</Link>
		</nav>
	);
};*/

// /*const App = (props) => (
// 	<Router>
// 		<div>
// 			<Link to='/'>Home</Link>
// 			<Link to='/menu'>Menu</Link>
// 			<Route exact path='/' component={Home} />
// 			<Route path='/menu' component={Menu} />
// 			{/*<Route 
// 				path='/menu' 
// 				render={() => (
// 					<Redirect to='/menu/one' />
// 				)} 
// 			/>*/}
			
// 			{/*<Route path='/:page?/:subpage?' render={({match}) => (
// 					<h1>
// 						Page: {match.params.page || 'Home'}
// 						<br />
// 						Subpage: {match.params.subpage}
// 					</h1>
// 				)}
// 			/>*/}
// 			{/*<Links />*/}
// 			{/*<Switch>
// 				<Route exact path='/' render={() => <h1>Home</h1>} />
// 				<Route path='/about' render={() => <h1>about</h1>} />
// 				<Route path='/contacts' render={() => <h1>Contacts</h1>} />
// 				<Route path='/:itemsId' render={({match}) => (
// 						<h1>Item: {match.params.itemsId}</h1>
// 					)} />
// 			</Switch>*/}
// 			{/*<Route path='/test' children={({match}) => match && <h1>Test</h1>} />*/}
// 		</div>
// 	</Router>
// );

// ReactDOM.render(
// 	<App />,
// 	// <App listBooks={listBooks} />,
// 	// {/*<Router>
// 	// 	<div>
// 	// 		{/*<Links />
// 	// 		<Route exact path='/' render={() => <h1>Home</h1>} />
// 	// 		<Route path='/test' render={() => <h1>Test</h1>} />
// 	// 		<Route path='/about' render={() => <h1>about</h1>} />*/}
// 	// 		{/*<Route path='/test' children={({match}) => match && <h1>Test</h1>} />*/}
// 	// 	</div>
// 	// </Router>,*/}
// 	document.getElementById( '' )
// );*/

ReactDOM.render(
	<Routes listBooks={listBooks} />,
	document.getElementById('app'),
);
