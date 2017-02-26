import React from 'react';
import ReactDOM from 'react-dom';
import observable from '../../lib/emitter';
import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import RadioButtonsGroup from './RadioButtonsGroup';

/**
 * Класс Upload формирует форму для загрузки книги
 */

class Upload extends React.PureComponent
{
	static defaultProps = {
		lang: 'any',
		visibility: false,
	};
	
	constructor( props )
	{
		super( props );
		
		this.callUploadInput = this.callUploadInput.bind( this );
		this.handleLangChange = this.handleLangChange.bind( this );
		this.dataSubmit = this.dataSubmit.bind( this );
		
		this.state = {
			lang: props.lang,
			visibility: props.visibility,
		};
	}
	/**
	 * Вызов окна для загрузки новой книги
	 */
	callUploadInput()
	{
		const uploadInput = ReactDOM.findDOMNode( this.refs.uploadInput );
		
		uploadInput.click();
	}
	/**
	 * Загрузка новой книги
	 * 
	 * @param event
	 */
	dataSubmit( event )
	{
		event.preventDefault();
		
		const form = ReactDOM.findDOMNode( this.refs.form ),
			method = form.method,
			action = form.action,
			upload = ReactDOM.findDOMNode( this.refs.uploadInput ),
			author = ReactDOM.findDOMNode( this.refs.author ).value,
			name = ReactDOM.findDOMNode( this.refs.name ).value,
			description = ReactDOM.findDOMNode( this.refs.description ).value,
			lang = this.state.lang;

		if ( upload.value 
			&& author 
			&& name 
			&& description )
		{
			const fileList = upload.files;
			const formData = new FormData();

			for ( let i = 0; i < fileList.length; i++ )
			{
				const file = fileList[i];
				formData.append( 'uploads', file, file.name );
			}
			
			formData.append( 'author', author );
			formData.append( 'name', name );
			formData.append( 'description', description );
			formData.append( 'lang', lang );
			
			ajax(method, action, formData, false, ( response ) =>
			{
				observable.emit( 'addBook', JSON.parse( response ));
				form.reset();
				this.setState({
					lang: 'any',
				});
			});
		}
		else
		{
			alert( 'Заполните все обязательные поля' );
		}
	}
	/**
	 * Изменение языка при загрузке новой книги
	 * 
	 * @param lang {String} - Язык книги
	 */
	handleLangChange( lang )
	{
		this.setState({
			lang: lang
		});
	}
	
	render()
	{
		return (
			<form method="post" action="/upload" encType="multipart/form-data" ref="form">
				<input type="checkbox" id="upload-menu" name="upload-menu" />
				<label htmlFor="upload-menu">Загрузить новую книгу</label>
				<ul className="upload-menu">
					<li>
						<input type="file" name="uploads[]" placeholder="Upload your file" 
							multiple="multiple" ref="uploadInput" 
						/>
						<label>Загрузить новую книгу в формате PDF</label>
						<button type="button" ref="uploadButton" onClick={this.callUploadInput}>
							Выбрать *
						</button>
					</li><li>
						<input type="text" name="author" placeholder="Автор книги *" ref="author" />
						<label>Введите автора книги *</label>
					</li><li>
						<input type="text" name="name" placeholder="Название книги *" ref="name" />
						<label>Введите название книги *</label>
					</li><li>
						<input type="text" name="description" placeholder="Описание книги *" ref="description" />
						<label>Введите описание книги *</label>
					</li><li className="radio-group">
						<span>Выберите язык книги</span>
						<RadioButtonsGroup group="addBook-lang" radios={langList} checked={this.state.lang} 
							handleAddBookLangChange={this.handleLangChange}
						/>
					</li><li>
						<button type="submit" onClick={this.dataSubmit}>Загрузить</button>
					</li>
				</ul>
			</form>
		);
	}
};

export {
	Upload as default,
}
