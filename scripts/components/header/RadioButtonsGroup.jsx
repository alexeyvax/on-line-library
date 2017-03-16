import React, { PropTypes } from 'react';

/**
 * Класс RadioButtonsGroup создание радио кнопок
 *
 * @params props свойства
 */

class RadioButtonsGroup extends React.PureComponent
{
	static propTypes = {
		group: PropTypes.string.isRequired,
		radios: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		}).isRequired).isRequired,
		checked: PropTypes.string.isRequired
	};
	
	constructor( props )
	{
		super( props );
		this.handleLangChange = this.handleLangChange.bind( this );
	}
	/**
	 * Определение для чего происходит смена языка
	 * 
	 * @param event
	 */
	handleLangChange( event )
	{
		if ( this.props.handleAddBookLangChange )
		{
			this.props.handleAddBookLangChange( event.target.value );
		}
		
		if ( this.props.handleChangeBookLangChange )
		{
			this.props.handleChangeBookLangChange( event.target.value );
		}

		if ( this.props.handleSearchLangChange )
		{
			this.props.handleSearchLangChange( event.target.value );
		}
	}

	render()
	{
		const radioList = this.props.radios;
		
		if ( radioList.length )
		{
			return (
				<ul className="radio-set" onChange={this.handleLangChange}>
					{radioList.map(( radio, index ) =>
					{
						const id = `${this.props.group}-${radio.value}`;
						
						return (
							<li key={index}>
								<input type="radio"
									id={id}
									name={this.props.group}
									value={radio.value}
									onChange={() => {}}
									checked={this.props.checked === radio.value}
								/>
								<label htmlFor={id}>{radio.value}</label>
							</li>
						);
					})}
				</ul>
			);
		}
		else
		{
			return null;
		}
		
		// Для инпута, чтобы не было предупреждений вместо defaultChecked добавлены checked и onChange
		// checked={this.props.checked === radio.value}
		// defaultChecked={this.props.checked === radio.value}
	}
}

export {
	RadioButtonsGroup as default
};
