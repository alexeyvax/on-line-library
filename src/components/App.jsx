import React from 'react';
import observable from '../lib/emitter';
import Header from './header/Header.jsx';
import List from './list/List.jsx';
import Main from './main/Main.jsx';
import { withRouter } from 'react-router';

/**
 * Класс App с которого начинается приложение
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
		/**
		 * Добавление книги в библиотеку
		 */
		observable.addListener('addBook', item => {
			this.setState(prevState => ({
				list: [...prevState.list, item],
				search: [...prevState.list, item],
			}));
			observable.emit('updateListBooks', this.state.list);
		});
		
		/**
		 * Поиск книги по автору и названию, а так же сортировка по языку
		 */
		observable.addListener('searchBook', (author, name, lang) => {
			/** Список по которому проходит поиск(мутирующий) */
			let filterList = this.state.search;
			/** Приведение в нижний регистр */
			const searchAuthor = author.trim().toLowerCase();
			const searchName = name.trim().toLowerCase();
			
			const authorLength = searchAuthor.length;
			const nameLength = searchName.length;
			let searchIsEmpty = true;
			
			switch (true) {
				/** Если заполнено имя автора и название книги */
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
				/** Если только заполнено имя автора */
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
				/** Если только заполнено название книги */
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
				/** Сортировка по языку книги 
				 * и не заполнены ни имя автора ни название книги */
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
		
		/**
		 * Удаление книги
		 */
		observable.addListener('removeBook', ([index]) => {
			this.setState(prevState => ({
				list: [...prevState.list.filter((_, i) => i !== index)],
				search: [...prevState.list.filter((_, i) => i !== index)],
			}));
			observable.emit('updateListBooks', this.state.list);
		});
		
		/**
		 * Изменение информации о книге
		 */
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
	}
}

export default withRouter(App);
