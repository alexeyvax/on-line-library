import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from '../App.jsx'
import langList from '../../lib/langList';
import RadioButtonsGroup from './RadioButtonsGroup.jsx';

/**
 * Класс Search поиск книг
 */

class Search extends React.Component
{
	constructor( props )
	{
		super( props );
		this.state = { lang: props.lang };
	}

	handleChange()
	{
		const author = ReactDOM.findDOMNode( this.refs.searchAuthor ),
			name = ReactDOM.findDOMNode( this.refs.searchName ),
			authorValue = author.value,
			nameValue = name.value;
			
		observable.emit( 'searchBook', authorValue, nameValue, this.state.lang );
	}

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
						<input type="text" onChange={this.handleChange.bind(this)}
							placeholder="Поиск книги по автору" ref="searchAuthor"/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li>
						<input type="text" onChange={this.handleChange.bind(this)}
							placeholder="Поиск книги по названию" ref="searchName"/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li className="radio-group">
						<span>Поиск книги по языку</span>
						<RadioButtonsGroup group="search-lang" radios={langList} checked={this.state.lang}
							handleSearchLangChange={this.chooseLang.bind(this)}
						/>
					</li>
				</ul>
			</div>
		);
	}
};

Search.defaultProps = { lang: 'any' };

export {
	Search as default,
}
