import React from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../lib/ajax';

/**
 * Класс Controls кнопки управления
 */

class Controls extends React.PureComponent
{
	static defaultProps = {
		visibility: true
	};
	
	constructor( props )
	{
		super( props );
		
		this.change = this.change.bind( this );
		this.remove = this.remove.bind( this );
		this.disable = this.disable.bind( this );
		this.save = this.save.bind( this );
		
		this.state = {
			visibility: props.visibility
		};
	}
	/**
	 * Сохранение изменений
	 * 
	 * @param event
	 */
	save( event )
	{
		this.setState({
			visibility: true
		});
		
		this.props.saveElements( event );
	}
	/**
	 * Изменение информации о книге
	 * 
	 * @param event
	 */
	change( event )
	{
		this.setState({
			visibility: false
		});
		
		this.props.changeElements( event );
	}
	/**
	 * Отмена изменений
	 * 
	 * @param event
	 */
	disable( event )
	{
		this.setState({
			visibility: true
		});
		
		this.props.disableElements( event );
	}
	/**
	 * Удаление книги
	 * 
	 * @param event
	 */
	remove( event )
	{
		this.props.removeElements( event );
	}
	
	render()
	{
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
};

export {
	Controls as default,
}
