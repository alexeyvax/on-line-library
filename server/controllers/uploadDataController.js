const fs = require('fs');
const formidable = require('formidable');
const Path = require('path');
const PDFImage = require('pdf-image').PDFImage;
const libToTranslite = require('../toTranslite');

module.exports.upload = function(req, res) {
	/** Число, которое преобразует десятичную дробь в целое число */
<<<<<<< HEAD
	const CONVERT_NUMBER = 100; // to constant
=======
	const CONVERT_NUMBER = 100; // constant
>>>>>>> 589a424853b31486c6ab2b424f9c543124f35f40
	const form = new formidable.IncomingForm();
	const currentUploadedData = Object.create(null);
	const pathToDirname = Path.join(__dirname, '../../');
	
	form.multiples = true;
	form.uploadDir = `${pathToDirname}/books`;
	
	form.on('error', err => console.error('An error has occured: \n' + err));
	form.on('field', (field, value) => currentUploadedData[field] = value);
	form.on('file', (field, file) => {
		const changeSpacesForBottonUnderscore = file.name.replace(/\s+/g, '_');
		const nameToArray = changeSpacesForBottonUnderscore.split('.');
		const shortenNameWithFirstAndLastElements = [
			nameToArray[0], nameToArray[nameToArray.length -1]].join('.');
		const translationNameToTranslit = libToTranslite.toTranslite(
			shortenNameWithFirstAndLastElements);
		const createUniqueNumber = Math.round(Math.random() * CONVERT_NUMBER) + Date.now();
		const nameForCreatedDir = translationNameToTranslit.replace(/\.[^.]+$/, '') + '_' + createUniqueNumber;
		const wayToCreatedDir = `books/${nameForCreatedDir}`;
		const wayToUploadPdf = `${wayToCreatedDir}/${translationNameToTranslit}`;
		
		if (!fs.existsSync(wayToCreatedDir)) {
			fs.mkdirSync(wayToCreatedDir); // создание директории
		}
		
		// сохранение файла в нужной директории
		fs.rename(file.path, Path.join(`${form.uploadDir}/${nameForCreatedDir}`, translationNameToTranslit));
		
		const createImage = new PDFImage(wayToUploadPdf);
		const formatingImageName = translationNameToTranslit.replace(/\.[^.]+$/, '-0.png');
		
		createImage.convertPage(0).then(imagePath => {
			const listBooks = `${pathToDirname}/backend/listBooks.json`;
			const data = JSON.parse(fs.readFileSync(listBooks));
			const newNameForImage = 'image.png';
			
			fs.rename(
				`${pathToDirname}/books/${nameForCreatedDir}/${formatingImageName}`,
				Path.join(`${form.uploadDir}/${nameForCreatedDir}`, newNameForImage)
			);
			
			currentUploadedData['imageSrc'] = `/${wayToCreatedDir}/${newNameForImage}`;
			currentUploadedData['link'] = `/${wayToUploadPdf}`;
			currentUploadedData['id'] = createUniqueNumber;
			
			data.push(currentUploadedData);
			fs.writeFileSync(listBooks, JSON.stringify(data, null, 2), 'utf8');
			res.send(JSON.stringify(currentUploadedData));
			fs.existsSync(newNameForImage);
		});
	});
	form.parse(req);
};
