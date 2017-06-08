const fs = require('fs');
const Path = require('path');

module.exports.getMainPage = function(req, res) {
	const encoding = 'utf8';
	const filepath = Path.join(__dirname, '../../backend/listBooks.json');
	const file = fs.readFileSync(filepath, encoding);
	const fileToString = JSON.stringify(file);
	res.render('home', { file: fileToString });
};
