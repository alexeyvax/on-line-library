import React from 'react';
import Controls from './controls/Controls.jsx';
import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import { observable } from '../App.jsx'

/**
 * Класс Item формирует и создаёт плитку с книгой и информацией о ней
 */
class Item extends React.Component
{
	constructor( props )
	{
		super( props );
		
		this.state = {
			content: props.content
		};
		
		this.changeElements = [];
	}
	
	shouldComponentUpdate(nextProps, nextState)
	{
		if (this.props.data !== nextProps.data)
		{
			return true;
		}
		if (this.state.content !== nextState.content)
		{
			return true;
		}
		
		return false;
	}
	/**
	 * Сохранение изменений данных о книге
	 * 
	 * @param event
	 */
	save( event )
	{
		const authorInput = this.refs.authorInput,
			nameInput = this.refs.nameInput,
			descriptionInput = this.refs.descriptionInput;
		
		const itemId = this.props.itemId;
		
		const body = {
			'author': authorInput.value,
			'name': nameInput.value,
			'description': descriptionInput.value
		};
		
		ajax(
			'PUT',
			itemId,
			body,
			true,
			( response ) =>
			{
				const newListlistBook = JSON.parse( response );
				
				observable.emit( 'changeBook', newListlistBook );
				
				this.setState({
					content: 'normal'
				});
			}
		);
	}
	/**
	 * Начать изменять данные о книге
	 * 
	 * @param event
	 */
	change( event )
	{
		this.setState({
			content: 'change'
		});
	}
	/**
	 * Отменить изменения
	 * 
	 * @param event
	 */
	disable( event )
	{
		this.setState({
			content: 'normal'
		});
	}
	/**
	 * Удалить плитку с книгой
	 * 
	 * @param event
	 */
	remove( event )
	{
		const itemId = this.props.itemId;
		
		ajax(
			'DELETE',
			itemId,
			null,
			false,
			( response ) =>
			{
				const book = JSON.parse( response );
				
				observable.emit( 'removeBook', book );
			}
		);
	}
	
	/*handleLangChange( lang )
	{
		console.log( lang );
		this.setState({
			lang: lang
		});
	}*/
	
	render()
	{
		const itemId = this.props.itemId;
		const props = this.props.list;
		const author = props.author;
		const name = props.name;
		const imageSrc = props.imageSrc;
		const description = props.description;
		const lang = props.lang;
		const link = props.link;
		
		if ( this.state.content === 'normal' )
		{
			this.changeElements = [
				<p ref="authorP">{author}</p>,
				<p ref="nameP">{name}</p>,
				// <p ref="langP">{lang}</p>,
				<p ref="descriptionP">{description}</p>
			];
		}
		else if ( this.state.content === 'change' )
		{
			this.changeElements = [
				<input type="text" name="author" defaultValue={author} ref="authorInput" />,
				<input type="text" name="name" defaultValue={name} ref="nameInput" />,
				// <RadioButtonsGroup group="changeBook-lang" radios={langList} checked={lang} 
				// 	handleChangeBookLangChange={this.handleLangChange.bind(this)} 
				// />,
				<input type="text" name="description" defaultValue={description} ref="descriptionInput" />
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
					saveElements={this.save.bind( this )} 
					changeElements={this.change.bind( this )} 
					disableElements={this.disable.bind( this )} 
					removeElements={this.remove.bind( this )} 
				/>
			</div>
		);
	}
};

Item.defaultProps = {
	content: 'normal'
};

Item.propTypes = {
	list: React.PropTypes.object,
	itemId: React.PropTypes.number
};

export {
	Item as default,
}
