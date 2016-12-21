import React from 'react';
import Logo from './Logo.jsx';
import Search from './Search.jsx';
import Upload from './Upload.jsx';

/**
 * Класс Header формирует шапку приложения
 */

class Header extends React.Component
{
	render()
	{
		return (
			<header className="header">
				<Logo />
				<Search />
				<Upload />
			</header>
		);
	}
};

export {
	Header as default,
}
