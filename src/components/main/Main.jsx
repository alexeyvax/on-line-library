import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

/**
 * Main section with a list of books
 */
class Main extends React.PureComponent {
	static propTypes = {
		data: PropTypes.array.isRequired,
		searchIsEmpty: PropTypes.bool.isRequired,
	};
	
	render() {
		const { data, searchIsEmpty } = this.props;
		let bookTemplate;
		
		if (data.length) {
			bookTemplate = data.map(item => {
				return (
					<li id={item.id} className="book" key={item.id}>
						<Item data={item} itemId={item.id} />
					</li>
				);}
			);
		} else {
			bookTemplate = (searchIsEmpty)
				? <li className="empty">No matches found</li>
				: <li className="empty">No books yet</li>;
		}
		
		return <ul className="list-books">{bookTemplate}</ul>;
	}
}

export default Main;
