import React from 'react';
import Item from './Item';

/**
 * Класс Main формирует основной раздел со списком книг
 */
class Main extends React.PureComponent {
	static propTypes = {
		data: React.PropTypes.array.isRequired,
		searchIsEmpty: React.PropTypes.bool.isRequired,
	};
	
	render() {
		const list = this.props.data;
		const searchIsEmpty = this.props.searchIsEmpty;
		let bookTemplate;
		console.log('Main');
		if (list.length) {
			bookTemplate = list.map(item => {
				return (
					<li id={item.id} className="book" key={item.id}>
						<Item list={item} itemId={item.id} />
					</li>
				);}
			);
		} else {
			bookTemplate = (searchIsEmpty)
				? <li className="empty">Пока ещё нет книг</li>
				: <li className="empty">Совпадений не найдено</li>;
		}
		
		return (
			<ul className="list-books">
				{bookTemplate}
			</ul>
		);
	}
}

export default Main;
