import React from 'react';
import Controls from './controls/Controls.jsx';
import RadioButtonsGroup from '../header/RadioButtonsGroup.jsx';
import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import { observable } from '../App.jsx'

/**
 * Класс Item формирует и создаёт книгу
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
	
	change( event )
	{
		this.setState({
			content: 'change'
		});
	}
	
	disable( event )
	{
		this.setState({
			content: 'normal'
		});
	}
	
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
				<a name={name}></a>
				<strong>Автор:</strong>
				{this.changeElements[0]}
				<strong>Название:</strong>
				{this.changeElements[1]}
				<img src={imageSrc} />
				<strong>Язык книги:</strong>
				/*{this.changeElements[2]}*/
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

export {
	Item as default,
}
