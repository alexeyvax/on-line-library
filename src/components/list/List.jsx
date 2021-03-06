import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import observable from '../../lib/emitter';
import { REVERSE_LIST_BOOKS } from '../../constants';

/**
 * Section with list of titles of books
 */
class List extends React.PureComponent {
	static propTypes = {
		data: PropTypes.array.isRequired,
		searchIsEmpty: PropTypes.bool.isRequired,
	};
	
	reverseListBooks = () => {
		observable.emit(REVERSE_LIST_BOOKS, this.props.data.slice().reverse());
	}
	
	render() {
		const { data, searchIsEmpty } = this.props;
		let bookTemplate;
		let countBook;
		let reverseButton;
		
		if (data.length) {
			bookTemplate = data.map(item => {
				return (
					<li className="book" key={item.id}>
						<Item data={item} />
					</li>
				);}
			);
			countBook = <li className="countBook">
							<strong>Total books: {data.length}</strong>
						</li>;
			reverseButton = <li className="reverse-button">
								<button onClick={this.reverseListBooks}>
									Reverse list books
								</button>
							</li>;
		} else {
			bookTemplate = (searchIsEmpty)
				? <li className="empty">No matches found</li>
				: <li className="empty">No books yet</li>;
		}
		return (
			<ul className="list-names-books">
				{reverseButton ? reverseButton : null}
				{countBook ? countBook : null}
				{bookTemplate}
			</ul>
		);
	}
}

export default List;
