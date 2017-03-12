import React, { PropTypes } from 'react';

/**
 * Класс Item формирует и создаёт название книги
 */
class Item extends React.Component
{
	static propTypes = {
		list: PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.number.isRequired
		}).isRequired
	};
	
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
		const id = `#${props.id}`;

		return (
			<a href={id}>
				{name}
			</a>
		);
	}
}

export {
	Item as default
};
