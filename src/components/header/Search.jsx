import React from 'react';
import observable from '../../lib/emitter';
import langList from '../../lib/langList';
import RadioButtonsGroup from './RadioButtonsGroup.jsx';

/**
 * Класс Search поиск книг
 */
class Search extends React.PureComponent {
	static defaultProps = {
		lang: 'any',
	};
	
	state = {
		lang: this.props.lang,
	};
	
	/**
	 * Запуск поиска по введённым параметрам
	 */
	handleChange = () => {
		const { searchAuthor, searchName } = this.refs;
		
		observable.emit(
			'searchBook',
			searchAuthor.value,
			searchName.value,
			this.state.lang,
		);
	}
	/**
	 * Запуск сортировки книг по языку
	 */
	chooseLang = lang => {
		const { searchAuthor, searchName } = this.refs;
		
		this.setState({ lang: lang });
		observable.emit(
			'searchBook',
			searchAuthor.value,
			searchName.value,
			lang,
		);
	}
	
	render() {
		return (
			<div className="search">
				<input type="checkbox" id="search" name="search" />
				<label htmlFor="search">Поиск книги</label>
				<ul className="search-menu">
					<li>
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Поиск книги по автору"
							ref="searchAuthor"
						/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li>
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Поиск книги по названию"
							ref="searchName"
						/>
						<label htmlFor="search-menu">Поиск книги</label>
					</li><li className="radio-group">
						<span>Поиск книги по языку</span>
						<RadioButtonsGroup
							group="search-lang"
							radios={langList}
							checked={this.state.lang}
							handleSearchLangChange={this.chooseLang}
						/>
					</li>
				</ul>
			</div>
		);
	}
}

export default Search;
