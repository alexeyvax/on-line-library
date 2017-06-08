import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls.jsx';
import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
import langList from '../../constants/langList';
import ajax from '../../lib/ajax';
import observable from '../../lib/emitter';
import {
	CONTENT_BOOK_DEFAULT,
	CONTENT_BOOK_EDIT,
	EDIT_BOOK,
	REMOVE_BOOK,
} from '../../constants';

/**
 * Block with book with info about it
 */
class Item extends React.PureComponent {
	static defaultProps = {
		content: CONTENT_BOOK_DEFAULT,
	};

	static propTypes = {
		data: React.PropTypes.object,
		itemId: React.PropTypes.number,
	};
	
	state = {
		lang: this.props.data.lang,
		content: this.props.content,
	};
	
	/** Save changes about book */
	save = () => {
		const { authorInput, nameInput, descriptionInput } = this.refs;
		const body = {
			author: authorInput.value,
			name: nameInput.value,
			description: descriptionInput.value,
			lang: this.state.lang,
		};
		
		ajax(
			'PUT',
			`/api/books/${this.props.itemId}`,
			body,
			true,
			response => {
				const newListlistBook = JSON.parse(response);
				observable.emit(EDIT_BOOK, newListlistBook);
				this.setState({ content: CONTENT_BOOK_DEFAULT });
			}
		);
	}
	/** Start to change info about book */
	change = () => this.setState({ content: CONTENT_BOOK_EDIT });
	/** Cancel changes */
	disable = () => this.setState({ content: CONTENT_BOOK_DEFAULT });
	/** Remove blok with book */
	remove = () => {
		ajax(
			'DELETE',
			`/api/books/${this.props.itemId}`,
			null,
			false,
			response => {
				const book = JSON.parse(response);
				observable.emit(REMOVE_BOOK, book);
			}
		);
	}
	/** Change language */
	handleLangChange = lang => this.setState({ lang: lang });
	
	render() {
		const { id, author, name, imageSrc, description, lang, link } = this.props.data;
		let editElements = {};
		
		if (this.state.content === CONTENT_BOOK_DEFAULT) {
			editElements = {
				author: <p className="author">{author}</p>,
				name: <p className="name">{name}</p>,
				lang: <p className="lang">{lang}</p>,
				description: <p className="description">{description}</p>,
			};
		} else if (this.state.content === CONTENT_BOOK_EDIT) {
			editElements = {
				author: <input
					type="text"
					name="author"
					defaultValue={author}
					ref="authorInput" />,
				name: <input
					type="text"
					name="name"
					defaultValue={name}
					ref="nameInput" />,
				lang: <RadioButtonsGroup
					group="changeBook-lang"
					radios={langList}
					checked={this.state.lang}
					handleEditBookLangChange={this.handleLangChange}/>,
				description: <textarea
					name="description"
					defaultValue={description}
					ref="descriptionInput"></textarea>,
			};
		}
		
		return (
			<div className="container">
				<img src={imageSrc} />
				<strong>Author:</strong>
				{editElements.author}
				<br />
				<strong>Title:</strong>
				{editElements.name}
				<br />
				<strong>Language:</strong>
				{editElements.lang}
				<br />
				<strong>Description:</strong>
				{editElements.description}
				<a className="download" href={link} download>Download</a>
				<Controls
					saveElement={this.save}
					changeElement={this.change}
					disableElement={this.disable}
					removeElement={this.remove}
				/>
				<Link to={`/books/${id}`} className="go-to-book">Go to book</Link>
				{/*<Link to={`/${name}-${id}`}>Перейти к книге</Link>*/}
			</div>
		);
	}
}

export default Item;
