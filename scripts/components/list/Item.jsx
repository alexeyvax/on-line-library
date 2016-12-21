import React from 'react';

/**
 * Класс Item формирует и создаёт название книги
 */

class Item extends React.Component
{
	render()
	{
		const props = this.props.list;
		const name = props.name;
		const id = `#${name}`;

		return (
			<a href={id}>
				{name}
			</a>
		);
	}
};

export {
	Item as default,
}
