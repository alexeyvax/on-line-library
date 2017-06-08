const fs = require('fs');
const Path = require('path');

module.exports.change = function(req, res) {
	const filepath = Path.join(__dirname, '../../backend/listBooks.json');
	const data = JSON.parse(fs.readFileSync(filepath));
	const body = req.body;
	let indexElement;
	
	const needle = data.find((item, index) => {
		if (String(item.id) === String(req.params.id)) {
			item.author = body['author'];
			item.name = body['name'];
			item.description = body['description'];
			item.lang = body['lang'];
			indexElement = index;
			return item;
		}
	});
	
	if (needle) {
		fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
	}
	
	res.send([indexElement, needle]);
};
