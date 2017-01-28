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
let list = listBook;
let searchIsEmpty = false;

/**
 * Класс App с которого начинается приложение
 */

class App extends React.Component
{
	componentDidMount()
	{
		/**
		 * Добавление книги в библиотеку
		 */
		observable.addListener( 'addBook', ( item ) =>
		{
			const newBook = list.push( item );
			
			this.setState({ list: newBook });
		});
		
		new Observer( 1, observable, 'addBook' );

		/**
		 * Поиск книги по автору и названию,
		 * а так же сортировка по языку
		 */
		observable.addListener( 'searchBook', ( author, name, lang ) =>
		{
			list = listBook;

			const searchAuthor = author.trim().toLowerCase();
			const searchName = name.trim().toLowerCase();
			
			if ( searchAuthor.length > 0
				&& searchName.length > 0 )
			{
				searchIsEmpty = false;
				
				list = list.filter(( item ) =>
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

				if ( list.length <= 0 )
				{
					searchIsEmpty = true;
				}
			}
			else if ( searchAuthor.length > 0
				&& !searchName.length > 0 )
			{
				searchIsEmpty = false;
				
				list = list.filter(( item ) =>
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

				if ( list.length <= 0 )
				{
					searchIsEmpty = true;
				}
			}
			else if ( !searchAuthor.length > 0
				&& searchName.length > 0 )
			{
				searchIsEmpty = false;
				
				list = list.filter(( item ) =>
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

				if ( list.length <= 0 )
				{
					searchIsEmpty = true;
				}
			}	
			else
			{
				if ( lang !== 'any' )
				{
					list = list.filter(( item ) =>
					{
						return item.lang === lang;
					});
				}
			}
			
			this.setState({ list: list });
		});

		new Observer( 2, observable, 'searchBook' );
		
		/**
		 * Удаление книги
		 */
		observable.addListener( 'removeBook', ( newListlistBook ) =>
		{
			list = newListlistBook;
			
			this.setState({ list: list });
		});
		
		new Observer( 3, observable, 'removeBook' );
		
		/**
		 * Изменение информации о книге
		 */
		observable.addListener( 'changeBook', ( newListlistBook ) =>
		{
			list = newListlistBook;
			
			this.setState({ list: list });
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
				<List ref="list" data={list} searchIsEmpty={searchIsEmpty}/>
				<Main data={list} searchIsEmpty={searchIsEmpty}/>
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
