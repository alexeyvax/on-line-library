import React from 'react';
import { mount } from 'enzyme';

import Item from '../../../components/list/Item.jsx';
import data from '../../../../mocks/listBooks';

describe('Item', () => {
	const item = data[0];
	const output = mount(
		<Item data={item} />
	);
	
	it('renders correctly Item', () => {
		const props = output.props();
		expect(props.data).toBe(item);
		const book = output.find('a');
		expect(book.text()).toBe('test name');
	});
});
