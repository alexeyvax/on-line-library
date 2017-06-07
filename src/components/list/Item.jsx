import React, { PropTypes } from 'react';

/**
 * Block with name of book
 */
const Item = props => {
	const { name, id } = props.data;
	
	return <a href={`#${id}`}>{name}</a>;
};

Item.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}).isRequired,
};

export default Item;
