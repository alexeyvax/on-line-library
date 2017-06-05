import React from 'react';

/**
 * Класс Controls кнопки управления
 */
class Controls extends React.PureComponent {
	static defaultProps = {
		visibility: true,
	};
	
	state = {
		visibility: this.props.visibility,
	};

	save = event => {
		this.setState({ visibility: true });
		this.props.saveElement(event);
	}
	change = event => {
		this.setState({ visibility: false });
		this.props.changeElement(event);
	}
	disable = event => {
		this.setState({ visibility: true });
		this.props.disableElement(event);
	}
	remove = event => this.props.removeElement(event);
	
	render() {
		return (
			<div className="controls">
				<button type="button" className="buttonChange" onClick={this.change}>
					Изменить
				</button>
				<button type="button" className="buttonRemove" onClick={this.remove}>
					Удалить
				</button>
				<button type="button" className="buttonClose" disabled={this.state.visibility}
					onClick={this.disable}
				>
					Отменить
				</button>
				<button type="button" className="buttonSave" disabled={this.state.visibility}
					onClick={this.save}
				>
					Сохранить
				</button>
			</div>
		);
	}
}

export default Controls;
