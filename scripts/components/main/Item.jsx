import React from 'react';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls.jsx';
// import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
// import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import observable from '../../lib/emitter';

/**
 * Класс Item формирует и создаёт плитку с книгой и информацией о ней
 */
class Item extends React.Component {
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
	
	// TODO постараться убрать конструктор
	constructor(props) {
		super(props);
		
		this.changeElements = [];
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.data !== nextProps.data) {
			return true;
		}
		if (this.state.content !== nextState.content) {
			return true;
		}
		return false;
	}
	
	/**
	 * Сохранение изменений данных о книге
	 */
	save = () => {
		const { authorInput, nameInput, descriptionInput } = this.refs;
		const body = {
			'author': authorInput.value,
			'name': nameInput.value,
			'description': descriptionInput.value,
		};
		
		ajax(
			'PUT',
			`books/${this.props.itemId}`,
			body,
			true,
			response => {
				const newListlistBook = JSON.parse(response);
				observable.emit('changeBook', newListlistBook);
				this.setState({ content: 'normal' });
			}
		);
	}
	/**
	 * Начать изменять данные о книге
	 */
	change = () => this.setState({ content: 'change' });
	/**
	 * Отменить изменения
	 */
	disable = () => this.setState({ content: 'normal' });
	/**
	 * Удалить плитку с книгой
	 */
	remove = () => {
		console.log(this.props.itemId);
		ajax(
			'DELETE',
			`books/${this.props.itemId}`,
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
		// TODO разобраться с этой переменной
		const props = this.props.list;
		const { id, author, name, imageSrc, description, lang, link } = props;
		
		if (this.state.content === 'normal') {
			this.changeElements = [
				<p ref="authorP">{author}</p>,
				<p ref="nameP">{name}</p>,
				// <p ref="langP">{lang}</p>,
				<p ref="descriptionP">{description}</p>,
			];
		} else if (this.state.content === 'change') {
			this.changeElements = [
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
				{this.changeElements[0]}
				<br />
				<strong>Название:</strong>
				{this.changeElements[1]}
				<br />
				<strong>Язык книги:</strong>
				<p>{lang}</p>
				<br />
				{/*{this.changeElements[2]}*/}
				<strong>Описание:</strong>
				{this.changeElements[2]}
				<a className="download" href={link} download>Скачать</a>
				<Controls
					saveElements={this.save}
					changeElements={this.change}
					disableElements={this.disable}
					removeElements={this.remove}
				/>
				<Link to={`/books/${id}`}>Перейти к книге</Link>
				{/*<Link to={`/${name}-${id}`}>Перейти к книге</Link>*/}
			</div>
		);
	}
}

export default Item;
