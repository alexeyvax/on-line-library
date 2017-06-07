import React from 'react';
import Search from './Search.jsx';
import Upload from './Upload.jsx';

/**
 * Header application
 */
class Header extends React.PureComponent {
	render() {
		return (
			<header className="header">
				<h1>On-line library</h1>
				<Search />
				<Upload />
			</header>
		);
	}
}

export default Header;
