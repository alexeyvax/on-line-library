import React from 'react';
import observable from '../../lib/emitter';
import langList from '../../constants/langList';
import RadioButtonsGroup from './RadioButtonsGroup.jsx';
import { SEARCH_BOOK, DEFAULT_LANG } from '../../constants';

/**
 * Search books
 */
class Search extends React.PureComponent {
	static defaultProps = {
		lang: DEFAULT_LANG,
	};
	
	state = {
		lang: this.props.lang,
	};
	
	/** Start search by entered parameters */
	handleChange = () => {
		const { searchAuthor, searchName } = this.refs;
		
		observable.emit(
			SEARCH_BOOK,
			searchAuthor.value,
			searchName.value,
			this.state.lang,
		);
	}
	/** Start sorting by language */
	chooseLang = lang => {
		const { searchAuthor, searchName } = this.refs;
		
		this.setState({ lang: lang });
		observable.emit(
			SEARCH_BOOK,
			searchAuthor.value,
			searchName.value,
			lang,
		);
	}
	
	render() {
		return (
			<div className="search">
				<input type="checkbox" id="search" name="search" />
				<label htmlFor="search">Search book</label>
				<ul className="search-menu">
					<li>
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Search for books by author"
							ref="searchAuthor"
						/>
						<label htmlFor="search-menu">Search book</label>
					</li><li>
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Search for books by title"
							ref="searchName"
						/>
						<label htmlFor="search-menu">Search book</label>
					</li><li className="radio-group">
						<span>Search for books by lang</span>
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
