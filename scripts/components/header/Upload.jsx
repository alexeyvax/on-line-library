import React from 'react';
import observable from '../../lib/emitter';
import langList from '../../lib/langList';
import ajax from '../../lib/ajax';
import RadioButtonsGroup from './RadioButtonsGroup';

/**
 * Класс Upload формирует форму для загрузки книги
 */
class Upload extends React.PureComponent {
	static defaultProps = {
		lang: 'any',
		visibility: false,
	};
	
	state = {
		lang: this.props.lang,
		visibility: this.props.visibility,
	};
	
	/**
	 * Вызов окна для загрузки новой книги
	 */
	callUploadInput = () => this.refs.upload.click();
	
	/**
	 * Изменение языка при загрузке новой книги
	 * 
	 * @param lang {String} - Язык книги
	 */
	handleLangChange = lang => this.setState({ lang: lang });
	
	/**
	 * Загрузка новой книги
	 * 
	 * @param event
	 */
	dataSubmit = event => {
		event.preventDefault();
		const { form, upload, author, name, description } = this.refs;
		const method = form.method;
		const action = form.action;
		const lang = this.state.lang;
		
		if (upload.value
			&& author.value
			&& name.value
			&& description.value) {
			const fileList = upload.files;
			const formData = new FormData();
			let typeBookIsTrue = true;
			
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList[i];
				const getTypeFileOnString = -4;
				
				if (file.name.substr(getTypeFileOnString) === '.pdf') {
					formData.append('uploads', file, file.name);
				} else {
					typeBookIsTrue = false;
				}
			}
			
			formData.append('author', author.value);
			formData.append('name', name.value);
			formData.append('description', description.value);
			formData.append('lang', lang);
			
			if (typeBookIsTrue) {
				ajax(method, action, formData, false, response => {
					observable.emit('addBook', JSON.parse(response));
					form.reset();
					this.setState({ lang: 'any' });
				});
			} else {
				alert('Загрузите пожалуйста книгу в формате .pdf');
			}
		} else {
			alert('Заполните все обязательные поля');
		}
	}
	
	render() {
		return (
			<form
				method="post"
				action="/upload"
				encType="multipart/form-data"
				ref="form"
			>
				<input
					type="checkbox"
					id="upload-menu"
					name="upload-menu"
				/>
				<label htmlFor="upload-menu">Загрузить новую книгу</label>
				<ul className="upload-menu">
					<li>
						<input
							type="file"
							name="uploads[]"
							placeholder="Upload your file"
							multiple="multiple" ref="upload"
						/>
						<label>Загрузить новую книгу в формате PDF</label>
						<button
							type="button"
							onClick={this.callUploadInput}
						>
							Выбрать *
						</button>
					</li><li>
						<input
							type="text"
							name="author"
							placeholder="Автор книги *"
							ref="author"
						/>
						<label>Введите автора книги *</label>
					</li><li>
						<input
							type="text"
							name="name"
							placeholder="Название книги *"
							ref="name"
						/>
						<label>Введите название книги *</label>
					</li><li>
						<input
							type="text"
							name="description"
							placeholder="Описание книги *"
							ref="description"
						/>
						<label>Введите описание книги *</label>
					</li><li className="radio-group">
						<span>Выберите язык книги</span>
						<RadioButtonsGroup
							group="addBook-lang"
							radios={langList}
							checked={this.state.lang}
							handleAddBookLangChange={this.handleLangChange}
						/>
					</li><li>
						<button
							type="submit"
							onClick={this.dataSubmit}
						>
							Загрузить
						</button>
					</li>
				</ul>
			</form>
		);
	}
}

export default Upload;
