import React from 'react';
import { mount } from 'enzyme';

import RadioButtonsGroup from '../../../components/header/RadioButtonsGroup.jsx';
import langList from '../../../../mocks/langList';
import { DEFAULT_LANG, TEST_GROUP } from '../../../../mocks/variables';

describe('RadioButtonsGroup', () => {
	const classNameComponent = 'radio-set';
	const firstElementValue = 'eng';
	const lastElementValue = 'any';
	const handleLangChange = jest.fn();
	const output = mount(
		<RadioButtonsGroup
			group={TEST_GROUP}
			radios={langList}
			checked={DEFAULT_LANG}
			handleAddBookLangChange={handleLangChange}
		/>
	);
	
	it('renders correctly RadioButtonsGroup', () => {
		expect(output.hasClass(classNameComponent)).toBeTruthy();
	});
	
	it('RadioButtonsGroup requires handleLangChange prop', () => {
		expect(output.props().handleAddBookLangChange).toBeDefined();
	});
	
	it('Last input renders correctly and requires default checked', () => {
		const lastElement = output.find('input').last();
		expect(lastElement).toBeDefined();
		expect(lastElement.props().value).toEqual(lastElementValue);
		expect(lastElement.props().checked).toEqual(true);
	});

	// it('Last input requires default checked', () => {
	// 	const firstElement = output.find('input[type="radio"]').first();
	// 	// console.log(firstElement);
	// 	expect(firstElement).toBeDefined();
	// 	expect(firstElement.props().value).toEqual(firstElementValue);
	// 	firstElement.simulate('change', { target: { checked: true } });
	// 	// console.log(firstElement.node.checked);
	// 	// console.log(firstElement.node.value);
	// 	// expect(firstElement.get(0).checked).toEqual(true);
	// });
});
