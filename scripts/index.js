import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const data = window.__PRELOADED_STATE__.replace(/&quot;/g, '"'); // Использовать при handlebars
const listBooks = JSON.parse( data.replace(/^["']|["']$/g, '')); // обрезаю кавычки в начале и в конце

ReactDOM.render(
	<App listBooks={listBooks} />,
	document.getElementById( 'app' )
);
