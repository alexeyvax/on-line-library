import React from 'react';
import ReactDOM from 'react-dom';
import ajax from '../../../lib/ajax';

/**
 * Класс Controls кнопки управления
 */

class Controls extends React.Component
{
	constructor( props )
	{
		super( props );
		
		this.state = {
			visibility: props.visibility
		};
	}
	
	save( event )
	{
		this.setState({
			visibility: true
		});
		
		this.props.saveElements( event );
	}
	
	change( event )
	{
		this.setState({
			visibility: false
		});
		
		this.props.changeElements( event );
	}
	
	disable( event )
	{
		this.setState({
			visibility: true
		});
		
		this.props.disableElements( event );
	}
	
	remove( event )
	{
		this.props.removeElements( event );
	}
	
	render()
	{
		return (
			<div className="controls">
				<button type="button" className="buttonChange" onClick={this.change.bind( this )}>
					Редактировать
				</button>
				<button type="button" className="buttonRemove" onClick={this.remove.bind( this )}>
					Удалить
				</button>
				<button type="button" className="buttonClose" disabled={this.state.visibility} 
					onClick={this.disable.bind( this )}
				>
					Отменить
				</button>
				<button type="button" className="buttonSave" disabled={this.state.visibility} 
					onClick={this.save.bind( this )}
				>
					Сохранить
				</button>
			</div>
		);
	}
};

Controls.defaultProps = {
	visibility: true
};

export {
	Controls as default,
}
