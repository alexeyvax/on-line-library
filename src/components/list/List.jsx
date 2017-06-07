import React from 'react';
import Item from './Item';

/**
 * Section with list of titles of books
 */
class List extends React.PureComponent {
	static propTypes = {
		data: React.PropTypes.array.isRequired,
		searchIsEmpty: React.PropTypes.bool.isRequired,
	};
	
	render() {
		const { data, searchIsEmpty } = this.props;
		let bookTemplate;
		let countBook;
		console.log('List');
		if (data.length) {
			bookTemplate = data.map(item => {
				return (
					<li className="book" key={item.id}>
						<Item data={item} />
					</li>
				);}
			);
			countBook = <li className="countBook">
							<strong>Всего книг: {data.length}</strong>
						</li>;
		} else {
			bookTemplate = (searchIsEmpty)
				? <li className="empty">Пока ещё нет книг</li>
				: <li className="empty">Совпадений не найдено</li>;
		}
		return (
			<ul className="list-names-books">
				{countBook}
				{bookTemplate}
			</ul>
		);
	}
}

export default List;
