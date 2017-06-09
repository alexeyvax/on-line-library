const express = require('express');
const bodyParser = require('body-parser');
const bpjson = bodyParser.json();
const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'index' });
const config = {
	path: {
		public: `${__dirname}/public`,
		backend: `${__dirname}/backend`,
		images: `${__dirname}/images`,
		books: `${__dirname}/books`,
		views: `${__dirname}/views`,
	},
};
const port = 3004;

const mainPageController = require('./server/controllers/mainPageController');
const notFoundPageController = require('./server/controllers/notFoundPageController');
const uploadDataController = require('./server/controllers/uploadDataController');
const changeDataController = require('./server/controllers/changeDataController');
const removeDataController = require('./server/controllers/removeDataController');

app.use('/public', express.static(config.path.public));
app.use('/backend', express.static(config.path.backend));
app.use('/images', express.static(config.path.images));
app.use('/books', express.static(config.path.books));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});
app.use('/upload', bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

app.set('views', config.path.views);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get(['/', '/books/:id'], mainPageController.getMainPage);
app.get('*', notFoundPageController.getNotFoundPage);
app.post('/api/upload', uploadDataController.upload);
app.route('/api/books/:id')
	.put(bpjson, changeDataController.change)
	.delete(removeDataController.remove);

/* eslint-disable no-console */
app.listen(port, () => console.log('Server started: http://localhost:3004/'));
/* eslint-enable no-console */
