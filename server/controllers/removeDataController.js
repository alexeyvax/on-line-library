const fs = require('fs');
const Path = require('path');

module.exports.remove = function(req, res) {
	const id = req.params.id;
	const folder = Path.join(__dirname, '../../books');
	
	new Promise((resolve, rej) => {
		fs.readdir(folder, (err, files) => {
			if (err) {
				return rej(`dir ${folder} is not read`);
			}
			resolve(files.find(item => String(item.match(/[^_]+$/)) === id));
		});
	})
	.then(removeFile => {
		return new Promise((resolve, rej) => {
			const pathToRemovedDir = `${folder}/${removeFile}`;
			fs.readdir(pathToRemovedDir, (err, files) => {
				if (err) {
					return rej(`dir ${pathToRemovedDir} is not read`);
				}
				if (files) {
					const len = files.length;
					for (let i = 0; i < len; i++) {
						fs.unlink(pathToRemovedDir + '/' + files[i]);
					}
				}
				resolve(pathToRemovedDir);
			});
		});
	})
	.then(pathToRemovedDir => {
		return new Promise((resolve, rej) => {
			fs.rmdir(pathToRemovedDir, err => {
				if (err) {
					return rej(`dir ${pathToRemovedDir} is not read`);
				}
				console.log(pathToRemovedDir + ' was removed!');
				resolve();
			});
		});
	})
	.then(() => {
		const filepath = Path.join(__dirname, '../../backend/listBooks.json');
		const data = JSON.parse(fs.readFileSync(filepath));
		let indexElement;
		const needle = data.find((item, index) => {
			if (String(item.id) === id) {
				indexElement = index;
				return item;
			}
		});
		if (needle) {
			data.splice(indexElement, 1);
			fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
		}
		res.send([indexElement]);
	})
	.catch(rej => {
		console.error(`error message: ${rej}`);
		res.status(500).send(`dir is not read`);
	});
};
