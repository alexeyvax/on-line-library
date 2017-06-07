import React from 'react';
import observable from '../lib/emitter';
import Header from './header/Header.jsx';
import List from './list/List.jsx';
import Main from './main/Main.jsx';
import { withRouter } from 'react-router';

/**
 * App the main class in application
 */
class App extends React.PureComponent {
	static propTypes = {
		listBooks: React.PropTypes.array.isRequired,
	};
	// TODO разобраться с 2 одинаковыми переменными в state
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
				<List
					ref="list"
					data={list}
					searchIsEmpty={searchIsEmpty}
				/>
				<Main
					data={list}
					searchIsEmpty={searchIsEmpty}
				/>
			</section>
		);
	}
	
	componentDidMount() {
		/** Add book in library */
		observable.addListener('addBook', item => {
			this.setState(prevState => ({
				list: [...prevState.list, item],
				search: [...prevState.list, item],
			}));
			observable.emit('updateListBooks', this.state.list);
		});
		
		/** Search book by author and title, and sorting by language */
		observable.addListener('searchBook', (author, name, lang) => {
			/** List for search book (mutating) */
			let filterList = this.state.search;
			/** To lover case author and name book */
			const searchAuthor = author.trim().toLowerCase();
			const searchName = name.trim().toLowerCase();
			
			const authorLength = searchAuthor.length;
			const nameLength = searchName.length;
			let searchIsEmpty = true;
			
			switch (true) {
				/** If the author's name and book title are filled */
				case authorLength > 0 && nameLength > 0:
					searchIsEmpty = true;
					
					filterList = filterList.filter(item => {
						if (item.author.toLowerCase().match(searchAuthor)
							&& item.name.toLowerCase().match(searchName)) {
							if (lang !== 'any') {
								return item.lang === lang;
							}
							return item;
						}
					});
					
					if (filterList.length <= 0) {
						searchIsEmpty = false;
					}
					
					break;
				/** If only the author`s name is filled */
				case authorLength > 0 && !nameLength > 0:
					searchIsEmpty = true;
					
					filterList = filterList.filter(item => {
						if (item.author.toLowerCase().match(searchAuthor)) {
							if (lang !== 'any') {
								return item.lang === lang;
							}
							return item;
						}
					});
					
					if (filterList.length <= 0) {
						searchIsEmpty = false;
					}
					
					break;
				/** If only the title of book is filled */
				case !authorLength > 0 && nameLength > 0:
					searchIsEmpty = true;
					
					filterList = filterList.filter(item => {
						if (item.name.toLowerCase().match(searchName)) {
							if (lang !== 'any') {
								return item.lang === lang;
							}
							return item;
						}
					});
					
					if (filterList.length <= 0) {
						searchIsEmpty = false;
					}
					
					break;
				/** Sorted by book language and not filled either author name or book title */
				default:
					if (lang !== 'any') {
						filterList = filterList.filter(item => {
							return item.lang === lang;
						});
					}
			}
			this.setState({
				list: filterList,
				searchIsEmpty: searchIsEmpty,
			});
		});
		
		/** Remove book */
		observable.addListener('removeBook', ([index]) => {
			this.setState(prevState => ({
				list: [...prevState.list.filter((_, i) => i !== index)],
				search: [...prevState.list.filter((_, i) => i !== index)],
			}));
			observable.emit('updateListBooks', this.state.list);
		});
		
		/** Edit info for book */
		observable.addListener('changeBook', ([index, needle]) => {
			this.setState(prevState => ({
				list: [
					...prevState.list.slice(0, index),
					needle, ...prevState.list.slice(index + 1),
				],
				search: [
					...prevState.list.slice(0, index),
					needle, ...prevState.list.slice(index + 1),
				],
			}));
			observable.emit('updateListBooks', this.state.list);
		});
	}
	
	componentWillUnmount() {
		observable.removeListener('addBook');
		observable.removeListener('searchBook');
		observable.removeListener('removeBook');
		observable.removeListener('changeBook');
		observable.removeListener('updateListBooks');
	}
}

export default withRouter(App);
