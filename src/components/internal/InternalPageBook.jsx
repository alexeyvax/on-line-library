import React from 'react';

/**
 * Internal page with the selected book
 */
const InternalPageBook = (...props) => {
	const { listBooks, match, history } = props[0];
	const book = listBooks.find(item => item.id === Number(match.params.book));
	const { id, imageSrc, author, name, lang, description, link } = book;
	
	const goToBack = () => {
		(history.length >= 1 && history.length <= 2)
			? history.push(`/#${id}`)
			: history.goBack();
	};
	
	return (
		<section className="internal-page">
			{/*<a href={`/#${id}`}>Вернуться назад</a>*/}
			<button onClick={goToBack}>Вернуться назад</button>
			<img src={imageSrc} />
			<strong>Автор:</strong>
			<p>{author}</p>
			<br />
			<strong>Название:</strong>
			<p>{name}</p>
			<br />
			<strong>Язык книги:</strong>
			<p>{lang}</p>
			<br />
			<strong>Описание:</strong>
			<p>{description}</p>
			<a className="download" href={link} download>Скачать</a>
		</section>
	);
};

export default InternalPageBook;
