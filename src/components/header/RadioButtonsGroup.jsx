import React from 'react';
import PropTypes from 'prop-types';

/**
 * RadioButtonsGroup create group radio buttons
 */
const RadioButtonsGroup = props => {
	/** Definition of what the language changes for */
	const handleLangChange = event => {
		if (props.handleAddBookLangChange) {
			props.handleAddBookLangChange(event.target.value);
		}
		
		if (props.handleEditBookLangChange) {
			props.handleEditBookLangChange(event.target.value);
		}
		
		if (props.handleSearchLangChange) {
			props.handleSearchLangChange(event.target.value);
		}
	};
	
	const { radios, group, checked } = props;
	if (radios.length) {
		return (
			<ul className="radio-set" onChange={handleLangChange}>
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
};

RadioButtonsGroup.propTypes = {
	group: PropTypes.string.isRequired,
	radios: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	}).isRequired).isRequired,
	checked: PropTypes.string.isRequired,
};

export default RadioButtonsGroup;
