import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls.jsx';
import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import observable from '../../lib/emitter';

/**
 * Block with book with info about it
 */
class Item extends React.PureComponent {
	static defaultProps = {
		content: 'normal',
	};

	static propTypes = {
		list: React.PropTypes.object,
		itemId: React.PropTypes.number,
	};
	
	state = {
		lang: this.props.list.lang,
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
				observable.emit('changeBook', newListlistBook);
				this.setState({ content: 'normal' });
			}
		);
	}
	/** Start to change info about book */
	change = () => this.setState({ content: 'change' });
	/** Cancel changes */
	disable = () => this.setState({ content: 'normal' });
	/** Remove blok with book */
	remove = () => {
		ajax(
			'DELETE',
			`/api/books/${this.props.itemId}`,
			null,
			false,
			response => {
				const book = JSON.parse(response);
				observable.emit('removeBook', book);
			}
		);
	}
	/** Change language */
	handleLangChange = lang => this.setState({ lang: lang });
	
	render() {
		const { id, author, name, imageSrc, description, lang, link } = this.props.list;
		let changeElements = {};
		
		if (this.state.content === 'normal') {
			changeElements = {
				author: <p ref="authorP">{author}</p>,
				name: <p ref="nameP">{name}</p>,
				lang: <p ref="langP">{lang}</p>,
				description: <p ref="descriptionP">{description}</p>,
			};
		} else if (this.state.content === 'change') {
			changeElements = {
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
					handleChangeBookLangChange={this.handleLangChange}/>,
				description: <input
					type="text"
					name="description"
					defaultValue={description}
					ref="descriptionInput"/>,
			};
		}
		
		return (
			<div className="container">
				<img src={imageSrc} />
				<strong>Author:</strong>
				{changeElements.author}
				<br />
				<strong>Title:</strong>
				{changeElements.name}
				<br />
				<strong>Lang of book:</strong>
				<p>{lang}</p>
				<br />
				{changeElements.lang}
				<strong>Description:</strong>
				{changeElements.description}
				<a className="download" href={link} download>Download</a>
				<Controls
					saveElement={this.save}
					changeElement={this.change}
					disableElement={this.disable}
					removeElement={this.remove}
				/>
				<Link to={`/books/${id}`}>Go to book</Link>
				{/*<Link to={`/${name}-${id}`}>Перейти к книге</Link>*/}
			</div>
		);
	}
}

export default Item;
