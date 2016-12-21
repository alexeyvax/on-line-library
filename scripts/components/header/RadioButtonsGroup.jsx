import React from 'react';

/**
 * Класс RadioButtonsGroup создание радио кнопок
 *
 * @params props свойства
 */

class RadioButtonsGroup extends React.Component
{
	constructor( props )
	{
		super( props );
	}

	handleLangChange( event )
	{
		if ( this.props.handleAddBookLangChange )
		{
			this.props.handleAddBookLangChange( event.target.value );
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
				<ul className="radio-set" onChange={this.handleLangChange.bind(this)}>
					{radioList.map(( radio, index ) =>
					{
						return (
							<li key={index}>
								<input type="radio"
									id={`${this.props.group}-${radio.value}`}
									name={this.props.group}
									value={radio.value}
									onChange={() => {}}
									checked={this.props.checked === radio.value}
								/>
								<label htmlFor={`${this.props.group}-${radio.value}`}>{radio.value}</label>
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
};

export {
	RadioButtonsGroup as default,
}
