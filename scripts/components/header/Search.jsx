import React from 'react';
import ReactDOM from 'react-dom';
import observable from '../../lib/emitter'
import langList from '../../lib/langList';
import RadioButtonsGroup from './RadioButtonsGroup.jsx';

/**
 * Класс Search поиск книг
 */

class Search extends React.PureComponent
{
	static defaultProps = {
		lang: 'any'
	};
	
	constructor( props )
	{
		super( props );
		
		this.handleChange = this.handleChange.bind( this );
		this.chooseLang = this.chooseLang.bind( this );
		
		this.state = {
			lang: props.lang
		};
	}
	/**
	 * Запуск поиска по введённым параметрам
	 */
	handleChange()
	{
		const author = ReactDOM.findDOMNode( this.refs.searchAuthor ),
			name = ReactDOM.findDOMNode( this.refs.searchName ),
			authorValue = author.value,
			nameValue = name.value;
			
		observable.emit( 'searchBook', authorValue, nameValue, this.state.lang );
	}
	/**
	 * Запуск сортировки книг по языку
	 * 
	 * @param lang {String} - Язык книги
	 */
	chooseLang( lang )
	{
		const author = ReactDOM.findDOMNode( this.refs.searchAuthor ),
			name = ReactDOM.findDOMNode( this.refs.searchName ),
			authorValue = author.value,
			nameValue = name.value;
		
		this.setState({
			lang: lang
		});
		
		observable.emit( 'searchBook', authorValue, nameValue, lang );
	}

	render()
	{
		return (
			<div className="search">
				<input type="checkbox" id="search" name="search" />
				<label htmlFor="search">Поиск книги</label>
				<ul className="search-menu">
					<li>
						<input type="text" onChange={this.handleChange}
							placeholder="Поиск книги по автору" ref="searchAuthor"/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li>
						<input type="text" onChange={this.handleChange}
							placeholder="Поиск книги по названию" ref="searchName"/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li className="radio-group">
						<span>Поиск книги по языку</span>
						<RadioButtonsGroup group="search-lang" radios={langList} checked={this.state.lang}
							handleSearchLangChange={this.chooseLang}
						/>
					</li>
				</ul>
			</div>
		);
	}
};

export {
	Search as default,
}
