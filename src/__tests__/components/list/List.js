import React from 'react';
import { mount } from 'enzyme';

import List from '../../../components/list/List.jsx';
import data from '../../../../mocks/listBooks';
import { searchIsEmpty, reverseButtonContent } from '../../../../mocks/variables';

describe('List', () => {
	const classNameComponent = 'list-names-books';
	const output = mount(
		<List
			data={data}
			searchIsEmpty={searchIsEmpty}
		/>
	);
	
	it('renders correctly List', () => {
		expect(output.hasClass(classNameComponent)).toBeTruthy();
		const props = output.props();
		expect(props.data).toBe(data);
		expect(props.data.length).toEqual(1);
		expect(props.searchIsEmpty).toBe(true);
		// const book = output.find('.book');
		// expect(book.text()).toBe('test name');
		const reverseButton = output.find('.reverse-button');
		expect(reverseButton.text()).toBe(reverseButtonContent);
	});
});
