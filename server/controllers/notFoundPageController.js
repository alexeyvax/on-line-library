module.exports.getNotFoundPage = function(req, res) {
	res.send(
		`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<link rel="stylesheet" href="public/style.css"/>
			<title>timer tracker</title>
		</head>
		<body>
			<h1>Page not found!</h1>
			<h2>404</h2>
		</body>
		</html>`
	);
};
