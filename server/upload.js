'use strict';

const libToTranslite = require('./toTranslite');
/** Число, которое преобразует десятичную дробь в целое число */
const CONVERT_NUMBER = 100;

const fs = require('fs'),
	formidable = require('formidable'),
	path = require('path'),
	PDFImage = require('pdf-image').PDFImage;

/**
 * Загрузка новой книги
 * 
 * @param req
 * @param res
 * @param _dirname
 */
function upload(req, res, _dirname) {
	const form = new formidable.IncomingForm(),
		item = Object.create(null),
		uploadDir = `${_dirname}/books`;
	form.multiples = true;
	form.uploadDir = uploadDir;
	
	form.on('error', err => console.error('An error has occured: \n' + err));
	form.on('field', (field, value) => item[field] = value);
	
	form.on('file', (field, file) => {
		const clearName = file.name.replace(/\s+/g, '_'), // замена пробелов на _
			arrName = clearName.split('.'), // превращение имени в массив по точке
			trimName = [arrName[0], arrName[arrName.length -1]].join('.'), // соединяю 1 и последний элементы
			name = libToTranslite.toTranslite(trimName), // перевод в транслит
			uniqueNumber = Math.round(Math.random() * CONVERT_NUMBER) + Date.now(),
			dirName = name.replace(/\.[^.]+$/, '') + '_' + uniqueNumber, // имя созданной директории
			dir = `books/${dirName}`, // путь к созданной директории
			wayPdf = `${dir}/${name}`; // путь к загруженной pdf
		
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir); // создание директории
		}
		
		// сохранение файла в нужной директории
		fs.rename(file.path, path.join(`${form.uploadDir}/${dirName}`, name));
	
		const pdfImage = new PDFImage(wayPdf); // создание картинки
		const imageName = name.replace(/\.[^.]+$/, '-0.png'); // формирование имени картинки
		
		pdfImage.convertPage(0).then(imagePath => {
			const listBooks = `${_dirname}/backend/listBooks.json`, // путь к файлу с данными
				data = JSON.parse(fs.readFileSync(listBooks)), // распарсенные данные
				newNameImg = 'image.png'; // переименовывание картинки
				
			fs.rename(
				`${_dirname}/books/${dirName}/${imageName}`,
				path.join(`${form.uploadDir}/${dirName}`, newNameImg)
			);
			
			item['imageSrc'] = `/${dir}/${newNameImg}`;
			item['link'] = `/${wayPdf}`;
			item['id'] = uniqueNumber;
			
			data.push(item);
			fs.writeFileSync(listBooks, JSON.stringify(data, null, 2), 'utf8');
			res.send(JSON.stringify(item));
			fs.existsSync(newNameImg);
		});
	});
	form.parse(req);
}

exports.upload = upload;
