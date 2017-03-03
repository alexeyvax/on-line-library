import React from 'react';
import Item from './Item';

/**
 * Класс List формирует и создаёт список из названий книг
 */

class List extends React.Component
{
	static propTypes = {
		data: React.PropTypes.array.isRequired,
		searchIsEmpty: React.PropTypes.bool.isRequired
	};
	
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
		const list = this.props.data;
		const searchIsEmpty = this.props.searchIsEmpty;
		let bookTemplate;
		let countBook;
		
		if ( list.length )
		{
			bookTemplate = list.map(
				( item ) =>
				{
					return (
						<li className="book" key={item.id}>
							<Item list={item} />
						</li>
					);
				}
			);
			
			countBook = <li className="countBook">
							<strong>
								Всего книг: {list.length}
							</strong>
						</li>;
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
			<ul className="list-names-books">
				{countBook}
				{bookTemplate}
			</ul>
		);
	}
}

export {
	List as default
};
