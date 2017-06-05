import React, { PropTypes } from 'react';

/**
 * Класс RadioButtonsGroup создание радио кнопок
 */
class RadioButtonsGroup extends React.Component {
	static propTypes = {
		group: PropTypes.string.isRequired,
		radios: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		}).isRequired).isRequired,
		checked: PropTypes.string.isRequired,
	};
	
	/**
	 * Определение для чего происходит смена языка
	 */
	handleLangChange = event => {
		if (this.props.handleAddBookLangChange) {
			this.props.handleAddBookLangChange(event.target.value);
		}
		
		if (this.props.handleChangeBookLangChange) {
			this.props.handleChangeBookLangChange(event.target.value);
		}
		
		if (this.props.handleSearchLangChange) {
			this.props.handleSearchLangChange(event.target.value);
		}
	}
	
	render() {
		const { radios, group, checked } = this.props;
		if (radios.length) {
			return (
				<ul className="radio-set" onChange={this.handleLangChange}>
					{radios.map((radio, index) => {
						const id = `${group}-${radio.value}`;
						return (
							<li key={index}>
								<input type="radio"
									id={id}
									name={group}
									value={radio.value}
									onChange={() => {}}
									checked={checked === radio.value}
								/>
								<label htmlFor={id}>{radio.value}</label>
							</li>
						);
					})}
				</ul>
			);
		}
		return null;
	}
}

export default RadioButtonsGroup;
