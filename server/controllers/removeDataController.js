const fs = require('fs');
const Path = require('path');

module.exports.remove = function(req, res) {
	const id = req.params.id;
	const TIME_REMOVE = 300;
	const promise = new Promise(resolve => resolve({ id, res }));
	
	promise.then(({id, res}) => {
		const folder = Path.join(__dirname, '../../books');
		
		fs.readdir(folder, (err, files) => {
			const removeFile = files.find(item => String(item.match(/[^_]+$/)) === id);
			rmdir(folder + '/' + removeFile);
			
			/* without promise and with recursion */
			let tryCount = 1;
			
			function rmdir(dir) {
				fs.readdir(dir, (err, files) => {
					if (files) {
						const len = files.length;
						for (let i = 0; i < len; i++) {
							fs.unlink(dir + '/' + files[i]);
						}
					}
				});
				
				fs.rmdir(dir, () => console.log(dir + ' was removed!'));
				setTimeout(() => {
					fs.readdir(folder, (err, files) => {
						const checkDir = files.find(item => String(item.match(/[^_]+$/)) === id);
						
						if (checkDir) {
							console.warn('I need to remove');
							// call rmdir not more than three times
							if (tryCount <= 3) {
								rmdir(dir);
								tryCount++;
							}
						} else {
							console.warn(dir + ' was removed!');
						}
					});
				}, TIME_REMOVE );
			}
		});
		return { id, res };
	})
	.then(({id, res}) => {
		const filepath = Path.join(__dirname, '../../backend/listBooks.json');
		const data = JSON.parse(fs.readFileSync(filepath));
		let index;
		const needle = data.find(item => String(item.id) === id);
		
		if (needle) {
			index = data.indexOf(needle);
			data.splice(index, 1);
			fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
		}
		return { res, index };
	})
	.then(({ res, index }) => res.send([index]))
	.catch(reason => console.error(`Error: ${reason}`));
};
