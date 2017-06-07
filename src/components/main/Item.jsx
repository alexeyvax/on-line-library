import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls.jsx';
// import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
// import langList from '../../lib/langList';
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
		content: this.props.content,
	};
	
	/** Save changes about book */
	save = () => {
		const { authorInput, nameInput, descriptionInput } = this.refs;
		const body = {
			'author': authorInput.value,
			'name': nameInput.value,
			'description': descriptionInput.value,
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
	
	/*handleLangChange(lang) {
		console.log(lang);
		this.setState({
			lang: lang
		});
	}*/
	
	render() {
		const { id, author, name, imageSrc, description, lang, link } = this.props.list;
		let changeElements = [];
		
		if (this.state.content === 'normal') {
			changeElements = [
				<p ref="authorP">{author}</p>,
				<p ref="nameP">{name}</p>,
				// <p ref="langP">{lang}</p>,
				<p ref="descriptionP">{description}</p>,
			];
		} else if (this.state.content === 'change') {
			changeElements = [
				<input type="text" name="author" defaultValue={author} ref="authorInput" />,
				<input type="text" name="name" defaultValue={name} ref="nameInput" />,
				// <RadioButtonsGroup group="changeBook-lang" radios={langList} checked={lang}
				// 	handleChangeBookLangChange={this.handleLangChange.bind(this)}
				// />,
				<input type="text" name="description" defaultValue={description} ref="descriptionInput" />,
			];
		}
		
		return (
			<div className="container">
				<img src={imageSrc} />
				<strong>Автор:</strong>
				{changeElements[0]}
				<br />
				<strong>Название:</strong>
				{changeElements[1]}
				<br />
				<strong>Язык книги:</strong>
				<p>{lang}</p>
				<br />
				{/*{this.changeElements[2]}*/}
				<strong>Описание:</strong>
				{changeElements[2]}
				<a className="download" href={link} download>Скачать</a>
				<Controls
					saveElement={this.save}
					changeElement={this.change}
					disableElement={this.disable}
					removeElement={this.remove}
				/>
				<Link to={`/books/${id}`}>Перейти к книге</Link>
				{/*<Link to={`/${name}-${id}`}>Перейти к книге</Link>*/}
			</div>
		);
	}
}

export default Item;
