import React from 'react';
import Item from './Item';

/**
 * Main section with a list of books
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
				? <li className="empty">No books yet</li>
				: <li className="empty">No matches found</li>;
		}
		
		return <ul className="list-books">{bookTemplate}</ul>;
	}
}

export default Main;
