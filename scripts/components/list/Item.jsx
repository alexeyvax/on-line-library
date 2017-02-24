import React from 'react';

/**
 * Класс Item формирует и создаёт название книги
 */

class Item extends React.Component
{
	constructor( props )
	{
		super( props );
	}
	
	shouldComponentUpdate( nextProps, nextState )
	{
		if (this.props.list !== nextProps.list)
		{
			return true;
		}
		
		return false;
	}
	
	render()
	{
		const props = this.props.list;
		const name = props.name;
		// const id = `#${name}`;
		const id = `#${props.id}`;

		return (
			<a href={id}>
				{name}
			</a>
		);
	}
};

Item.propTypes = {
	list: React.PropTypes.object
};

export {
	Item as default,
}
