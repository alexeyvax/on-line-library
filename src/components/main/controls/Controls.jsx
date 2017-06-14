import React from 'react';
import PropTypes from 'prop-types';

/**
 * Book control buttons
 */
class Controls extends React.PureComponent {
	static defaultProps = {
		isEditData: false,
	};
	
	static propTypes = {
		saveElement: PropTypes.func.isRequired,
		changeElement: PropTypes.func.isRequired,
		disableElement: PropTypes.func.isRequired,
		removeElement: PropTypes.func.isRequired,
		isEditData: PropTypes.bool.isRequired,
	};
	
	state = {
		isEditData: this.props.isEditData,
	};

	save = event => {
		this.setState({ isEditData: false });
		this.props.saveElement(event);
	}
	change = event => {
		this.setState({ isEditData: true });
		this.props.changeElement(event);
	}
	disable = event => {
		this.setState({ isEditData: false });
		this.props.disableElement(event);
	}
	remove = event => this.props.removeElement(event);
	
	render() {
		return (
			<div className="controls">
				<button
					type="button"
					className="buttonChange"
					disabled={this.state.isEditData}
					onClick={this.change}
				>
					Edit
				</button>
				<button
					type="button"
					className="buttonRemove"
					disabled={this.state.isEditData}
					onClick={this.remove}
				>
					Remove
				</button>
				<button
					type="button"
					className="buttonClose"
					disabled={!this.state.isEditData}
					onClick={this.disable}
				>
					Cancel
				</button>
				<button
					type="button"
					className="buttonSave"
					disabled={!this.state.isEditData}
					onClick={this.save}
				>
					Save
				</button>
			</div>
		);
	}
}

export default Controls;
