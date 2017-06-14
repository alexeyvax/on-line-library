import React from 'react';
import PropTypes from 'prop-types';
import observable from '../lib/emitter';
import Header from './header/Header.jsx';
import List from './list/List.jsx';
import Main from './main/Main.jsx';
import { withRouter } from 'react-router';
import {
	ADD_BOOK,
	REMOVE_BOOK,
	EDIT_BOOK,
	SEARCH_BOOK,
	UPDATE_LIST_BOOKS,
	DEFAULT_LANG,
	REVERSE_LIST_BOOKS,
} from '../constants';

/**
 * App the main class in application
 */
class App extends React.PureComponent {
	static propTypes = {
		listBooks: PropTypes.array.isRequired,
	};
	
	state = {
		list: this.props.listBooks,
		search: this.props.listBooks,
		searchIsEmpty: true,
	};
	
	render() {
		const { list, searchIsEmpty } = this.state;
		
		return (
			<section>
				<Header />
				<List data={list} searchIsEmpty={searchIsEmpty} />
				<Main data={list} searchIsEmpty={searchIsEmpty} />
			</section>
		);
	}
	
	componentDidMount() {
		/** Add book in library */
		observable.addListener(ADD_BOOK, item => {
			this.setState(prevState => ({
				list: [...prevState.list, item],
				search: [...prevState.search, item],
			}));
			observable.emit(UPDATE_LIST_BOOKS, this.state.list);
		});
		
		/** Search book by author and title, and sorting by language */
		observable.addListener(SEARCH_BOOK, (author, name, lang) => {
			/** List for search book (mutating) */
			let filterList = this.state.search.slice();
			/** To lover case author and name book */
			const searchAuthor = author.trim().toLowerCase();
			const searchName = name.trim().toLowerCase();
			
			const authorLength = searchAuthor.length;
			const nameLength = searchName.length;
			let searchIsEmpty = true;
			
			switch (true) {
				/** If the author's name and book title are filled */
				case authorLength > 0 && nameLength > 0:
					filterList = filterList.filter(item => {
						if (item.author.toLowerCase().match(searchAuthor)
							&& item.name.toLowerCase().match(searchName)) {
							if (lang !== DEFAULT_LANG) {
								return item.lang === lang;
							}
							return item;
						}
					});
					searchIsEmpty = (filterList.length <= 0);
					
					break;
				/** If only the author`s name is filled */
				case authorLength > 0 && !nameLength > 0:
					filterList = filterList.filter(item => {
						if (item.author.toLowerCase().match(searchAuthor)) {
							if (lang !== DEFAULT_LANG) {
								return item.lang === lang;
							}
							return item;
						}
					});
					searchIsEmpty = (filterList.length <= 0);
					
					break;
				/** If only the title of book is filled */
				case !authorLength > 0 && nameLength > 0:
					filterList = filterList.filter(item => {
						if (item.name.toLowerCase().match(searchName)) {
							if (lang !== DEFAULT_LANG) {
								return item.lang === lang;
							}
							return item;
						}
					});
					searchIsEmpty = (filterList.length <= 0);
					
					break;
				/** Sorted by book language and not filled either author name or book title */
				default:
					if (lang !== DEFAULT_LANG) {
						filterList = filterList.filter(item => {
							return item.lang === lang;
						});
					}
					searchIsEmpty = (filterList.length <= 0);
			}
			this.setState({
				list: filterList,
				searchIsEmpty: searchIsEmpty,
			});
		});
		
		/** Remove book */
		observable.addListener(REMOVE_BOOK, ([index]) => {
			this.setState(prevState => ({
				list: [...prevState.list.filter((_, i) => i !== index)],
				search: [...prevState.search.filter((_, i) => i !== index)],
			}));
			observable.emit(UPDATE_LIST_BOOKS, this.state.list);
		});
		
		/** Edit info for book */
		observable.addListener(EDIT_BOOK, ([index, needle]) => {
			this.setState(prevState => ({
				list: [
					...prevState.list.slice(0, index),
					needle, ...prevState.list.slice(index + 1),
				],
				search: [
					...prevState.search.slice(0, index),
					needle, ...prevState.search.slice(index + 1),
				],
			}));
			observable.emit(UPDATE_LIST_BOOKS, this.state.list);
		});
		
		/** Reverse list of books */
		observable.addListener(REVERSE_LIST_BOOKS, reverseListBooks => {
			this.setState({ list: reverseListBooks });
		});
	}
	
	componentWillUnmount() {
		observable.removeListener(ADD_BOOK);
		observable.removeListener(SEARCH_BOOK);
		observable.removeListener(REMOVE_BOOK);
		observable.removeListener(EDIT_BOOK);
		observable.removeListener(UPDATE_LIST_BOOKS);
		observable.removeListener(REVERSE_LIST_BOOKS);
	}
}

export default withRouter(App);
