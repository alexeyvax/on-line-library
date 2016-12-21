import React from 'react';
import Foo from './Foo.jsx';

class ParentFoo extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<Foo />
		);
	}
}

export default ParentFoo;
