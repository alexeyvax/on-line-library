import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes.jsx';
const data = window.__PRELOADED_STATE__.replace(/&quot;/g, '"') || []; // use with handlebars
const listBooks = JSON.parse(data.replace(/^["']|["']$/g, '')) || []; // cut quotes

ReactDOM.render(
	<Routes listBooks={listBooks} />,
	document.getElementById('app'),
);
