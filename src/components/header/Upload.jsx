import React from 'react';
import observable from '../../lib/emitter';
import langList from '../../constants/langList';
import ajax from '../../lib/ajax';
import RadioButtonsGroup from './RadioButtonsGroup';
import { ADD_BOOK, PDF_EXTANTION, DEFAULT_LANG } from '../../constants';

/**
 * Upload book
 */
class Upload extends React.PureComponent {
	static defaultProps = {
		lang: DEFAULT_LANG,
		visibility: false,
		buttonUploadIsDisabled: false,
	};
	// TODO при загрузке книги дисейблить кнопку "загрузить"
	state = {
		lang: this.props.lang,
		visibility: this.props.visibility,
		buttonUploadIsDisabled: this.props.buttonUploadIsDisabled,
	};
	
	/** Call the window to upload a new book */
	callUploadInput = () => this.refs.upload.click();
	/** Change language */
	handleLangChange = lang => this.setState({ lang: lang });
	/** Upload new book */
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
				
				(file.name.substr(getTypeFileOnString) === PDF_EXTANTION)
					? formData.append('uploads', file, file.name)
					: typeBookIsPdf = false;
			}
			
			formData.append('author', author.value);
			formData.append('name', name.value);
			formData.append('description', description.value);
			formData.append('lang', lang);
			
			if (typeBookIsPdf) {
				this.setState({ buttonUploadIsDisabled: true });
				ajax(method, action, formData, false, response => {
					observable.emit(ADD_BOOK, JSON.parse(response));
					form.reset();
					this.setState({
						lang: DEFAULT_LANG,
						buttonUploadIsDisabled: false,
					});
				});
			} else {
				alert('Please download the book in the format .pdf');
			}
		} else {
			alert('Please fill in all required fields');
		}
	}
	
	render() {
		return (
			<form
				method="post"
				action="/api/upload"
				encType="multipart/form-data"
				ref="form"
			>
				<input
					type="checkbox"
					id="upload-menu"
					name="upload-menu"
				/>
				<label htmlFor="upload-menu">Upload new book</label>
				<ul className="upload-menu">
					<li>
						<input
							type="file"
							name="uploads[]"
							placeholder="Upload your file"
							multiple="multiple" ref="upload"
						/>
						<label>Upload new book in format PDF</label>
						<button
							type="button"
							onClick={this.callUploadInput}
						>
							Select *
						</button>
					</li><li>
						<input
							type="text"
							name="author"
							placeholder="Author` *"
							ref="author"
						/>
						<label>Enter the author of the book *</label>
					</li><li>
						<input
							type="text"
							name="name"
							placeholder="Title *"
							ref="name"
						/>
						<label>Enter the title of the book *</label>
					</li><li>
						<input
							type="text"
							name="description"
							placeholder="Description *"
							ref="description"
						/>
						<label>Enter description of the book *</label>
					</li><li className="radio-group">
						<span>Select to lang of the book</span>
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
							Upload
						</button>
					</li>
				</ul>
			</form>
		);
	}
}

export default Upload;
