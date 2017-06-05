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
		buttonUploadIsDisabled: false,
	};
	// TODO при загрузке книги дисейблить кнопку "загрузить"
	state = {
		lang: this.props.lang,
		visibility: this.props.visibility,
		buttonUploadIsDisabled: this.props.buttonUploadIsDisabled,
	};
	
	/**
	 * Вызов окна для загрузки новой книги
	 */
	callUploadInput = () => this.refs.upload.click();
	/**
	 * Изменение языка при загрузке новой книги
	 */
	handleLangChange = lang => this.setState({ lang: lang });
	/**
	 * Загрузка новой книги
	 */
	dataSubmit = event => {
		event.preventDefault();
		const { lang } = this.state;
		const { form, upload, author, name, description } = this.refs;
		const { method, action } = form;
		
		if (upload.value
			&& author.value
			&& name.value
			&& description.value) {
			const fileList = upload.files;
			const formData = new FormData();
			let typeBookIsPdf = true;
			
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList[i];
				const getTypeFileOnString = -4;
				
				(file.name.substr(getTypeFileOnString) === '.pdf')
					? formData.append('uploads', file, file.name)
					: typeBookIsPdf = false;
			}
			
			formData.append('author', author.value);
			formData.append('name', name.value);
			formData.append('description', description.value);
			formData.append('lang', lang);
			
			if (typeBookIsPdf) {
				try {
					this.setState({ buttonUploadIsDisabled: true });
					ajax(method, action, formData, false, response => {
						observable.emit('addBook', JSON.parse(response));
						form.reset();
						this.setState({
							lang: 'any',
							buttonUploadIsDisabled: false,
						});
					});
				} catch (err) {
					console.log(err, 'alalala');
				}
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
				action="/api/uploa"
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
							disabled={this.state.buttonUploadIsDisabled}
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
