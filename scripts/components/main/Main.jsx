import React from 'react';
import Item from './Item';

/**
 * Класс Main формирует основной раздел со списком книг
 */

class Main extends React.Component
{
	static propTypes = {
		data: React.PropTypes.array.isRequired,
		searchIsEmpty: React.PropTypes.bool.isRequired
	};
	
	constructor( props )
	{
		super( props );
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		if (this.props.data !== nextProps.data)
		{
			return true;
		}
		
		return false;
	}
	
	render()
	{
		console.log( 'main' );
		const list = this.props.data;
		const searchIsEmpty = this.props.searchIsEmpty;
		let bookTemplate;
		
		if ( list.length )
		{
			bookTemplate = list.map(
				( item, index ) =>
				{
					return (
						<li id={item.id} className="book" key={item.id}>
							<Item list={item} itemId={item.id} />
						</li>
					)
				}
			);
		}
		else
		{
			if ( !searchIsEmpty )
			{
				bookTemplate = <li className="empty">Пока ещё нет книг</li>;
			}	
			else
			{
				bookTemplate = <li className="empty">Совпадений не найдено</li>;
			}	
		}

		return (
			<ul className="list-books">
				{bookTemplate}
			</ul>
		);
	}
};

export {
	Main as default,
}
