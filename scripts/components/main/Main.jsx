import React from 'react';
import Item from './Item';

/**
 * Класс Main формирует основной раздел со списком книг
 */

class Main extends React.Component
{
	constructor( props )
	{
		super( props );
	}
	
	render()
	{
		const list = this.props.data;
		const searchIsEmpty = this.props.searchIsEmpty;
		let bookTemplate;

		if ( list.length )
		{
			bookTemplate = list.map(
				( item, index ) =>
				{
					return (
						<li id={item.id} className="book" key={index}>
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

Main.propTypes = {
	data: React.PropTypes.array.isRequired
};

export {
	Main as default,
}
