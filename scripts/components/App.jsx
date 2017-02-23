import React from 'react';
import ReactDOM from 'react-dom';
import Observer from '../lib/Observer';
import EventEmitter from 'evemitter-alexeyvax';
import Header from './header/Header.jsx';
import List from './list/List.jsx';
import Main from './main/Main.jsx';

const observable = new EventEmitter();
const data = window.__PRELOADED_STATE__.replace(/&quot;/g, '"'); // Использовать при handlebars
const listBook = JSON.parse( data.replace(/^["']|["']$/g, '') ); // обрезаю кавычки в начале и в конце

/**
 * Класс App с которого начинается приложение
 */
class App extends React.PureComponent
{
	constructor( props )
	{
		super( props );
		this.state = {
			list: listBook,
			search: listBook
		};
		
		/** Присутствуют ли значения для поиска? */
		this.searchIsEmpty = false;
	}
	
	componentDidMount()
	{
		/**
		 * Добавление книги в библиотеку
		 * 
		 * @param {Object} - Новая созданная книга
		 */
		observable.addListener( 'addBook', ( item ) =>
		{
			this.setState( prevState => ({
				list: [...prevState.list, item],
				search: [...prevState.list, item]
			}));
		});
		
		new Observer( 1, observable, 'addBook' );

		/**
		 * Поиск книги по автору и названию,
		 * а так же сортировка по языку
		 * 
		 * @param author {String} - Строка с автором книги
		 * @param name {String} - Строка с названием книги
		 * @param lang {String} - Строка с языком книги
		 */
		observable.addListener( 'searchBook', ( author, name, lang ) =>
		{
			/** Список по которому проходит поиск(мутирующий) */
			let filterList = this.state.search;
			/** Приведение в нижний регистр */
			const searchAuthor = author.trim().toLowerCase();
			const searchName = name.trim().toLowerCase();
			
			const authorLength = searchAuthor.length;
			const nameLength = searchName.length;
			
			switch( true )
			{
				/** Если заполнено имя автора и название книги */
				case authorLength > 0 && nameLength > 0:
					this.searchIsEmpty = false;
					
					filterList = filterList.filter(( item ) =>
					{
						if ( item.author.toLowerCase().match( searchAuthor )
							&& item.name.toLowerCase().match( searchName ))
						{
							if ( lang !== 'any' )
							{
								return item.lang === lang;
							}

							return item;
						}
					});
					
					if ( filterList.length <= 0 )
					{
						this.searchIsEmpty = true;
					}
					
					break;
				/** Если только заполнено имя автора */
				case authorLength > 0 && !nameLength > 0:
					this.searchIsEmpty = false;
					
					filterList = filterList.filter(( item ) =>
					{
						if ( item.author.toLowerCase().match( searchAuthor ))
						{
							if ( lang !== 'any' )
							{
								return item.lang === lang;
							}

							return item;
						}
					});
					
					if ( filterList.length <= 0 )
					{
						this.searchIsEmpty = true;
					}
					
					break;
				/** Если только заполнено название книги */
				case !authorLength > 0 && nameLength > 0:
					this.searchIsEmpty = false;
					
					filterList = filterList.filter(( item ) =>
					{
						if ( item.name.toLowerCase().match( searchName ))
						{
							if ( lang !== 'any' )
							{
								return item.lang === lang;
							}

							return item;
						}
					});
					
					if ( filterList.length <= 0 )
					{
						this.searchIsEmpty = true;
					}
					
					break;
				/** Сортировка по языку книги 
				 * и не заполнены ни имя автора ни название книги */
				default:
					if ( lang !== 'any' )
					{
						filterList = filterList.filter(( item ) =>
						{
							return item.lang === lang;
						});
					}
			}
			
			this.setState({ list: filterList });
		});
		
		new Observer( 2, observable, 'searchBook' );
		
		/**
		 * Удаление книги
		 * 
		 * @param index {Number} - индекс удаляемой книги
		 */
		observable.addListener( 'removeBook', ( [index] ) =>
		{
			this.setState( prevState => ({
				list: [...prevState.list.filter((_, i) => i !== index)],
				search: [...prevState.list.filter((_, i) => i !== index)]
			}));
		});
		
		new Observer( 3, observable, 'removeBook' );
		
		/**
		 * Изменение информации о книге
		 * 
		 * @param index {Number} - индекс изменяемой книги
		 * @param needle {Object} - обновлённая книга
		 */
		observable.addListener( 'changeBook', ( [index, needle] ) =>
		{
			this.setState( prevState => ({
					list: [...prevState.list.slice( 0, index ), needle, ...prevState.list.slice( index + 1 )],
					search: [...prevState.list.slice( 0, index ), needle, ...prevState.list.slice( index + 1 )]
				})
			);
		});
		
		new Observer( 4, observable, 'changeBook' );
	}

	componentWillUnmount()
	{
		observable.removeListener( 'addBook' );
		observable.removeListener( 'searchBook' );
		observable.removeListener( 'removeBook' );
		observable.removeListener( 'changeBook' );
	}
	
	render()
	{
		return (
			<section>
				<Header />
				<List ref="list" data={this.state.list} searchIsEmpty={this.searchIsEmpty}/>
				<Main data={this.state.list} searchIsEmpty={this.searchIsEmpty}/>
			</section>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById( 'app' )
);

export {
	App as default,
	observable,
}
