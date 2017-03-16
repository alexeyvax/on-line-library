const libUpload = require( './server/upload' );
const libRoute = require( './server/route' );

const express = require( 'express' ),
	fs = require( 'fs' ),
	bodyParser = require( 'body-parser' ),
	app = express(),
	handlebars = require( 'express-handlebars' ).create({ defaultLayout: 'index' }),
	path = require( 'path' );

const config = {
	path: {
		root: __dirname,
		public: `${__dirname}/public`,
		backend: `${__dirname}/backend`,
		images: `${__dirname}/images`,
		scripts: `${__dirname}/scripts`,
		books: `${__dirname}/books`,
		styles: `${__dirname}/styles`,
		view: `${__dirname}/view`
	}
};

app.use( '/public', express.static( config.path.public ));
app.use( '/backend', express.static( config.path.backend ));
app.use( '/images', express.static( config.path.images ));
app.use( '/books', express.static( config.path.books ));
app.use( '/view', express.static( config.path.view ));

app.use(
	( req, res, next ) =>
	{
		res.header( 'Access-Control-Allow-Origin', '*' );
		res.header(
			'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
		);
		res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
		next();
	}
);

app.use( '/upload', bodyParser.urlencoded({
	extended: true
}));

app.disable( 'x-powered-by' );

const bpjson = bodyParser.json();

app.set( 'views', path.join( __dirname, '/views' ));
app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );

app.get(
	'/',
	( req, res ) =>
	{
		const encoding = 'utf8',
			filepath = `${config.path.backend}/listBooks.json`,
			file = fs.readFileSync( filepath, encoding ),
			fileToString = JSON.stringify( file );
		
		res.render( 'home', {
			file: fileToString
		});
	}
);

app.post( '/upload', ( req, res ) =>
{
	libUpload.upload( req, res, __dirname, config.path.backend );
});

/** routes */
const pathListBooks = `${config.path.backend}/listBooks.json`;
const folder = config.path.books;
const routeParams = {
	'get': {
		pathListBooks: pathListBooks
	},
	'put': {
		pathListBooks: pathListBooks,
		bpjson: bpjson
	},
	'delete': {
		pathListBooks: pathListBooks,
		folder: folder
	}
};

libRoute.route( app, routeParams );

const port = 3004;

app.listen(
	port,
	() =>
	{
		console.log( 'Server started: http://localhost:3004/' );
	}
);
