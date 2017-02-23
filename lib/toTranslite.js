/**
 * Модуль для перевода строк в транслит,
 * с учётом регистра строки
 * 
 * @module
 */

const alphabet = {
	'а': 'a',
	'б': 'b',
	'в': 'v',
	'г': 'g',
	'д': 'd',
	'е': 'e',
	'ё': 'yo',
	'ж': 'zh',
	'з': 'z',
	'и': 'i',
	'й': 'j',
	'к': 'k',
	'л': 'l',
	'м': 'm',
	'н': 'n',
	'о': 'o',
	'п': 'p',
	'р': 'r',
	'с': 's',
	'т': 't',
	'у': 'u',
	'ф': 'f',
	'х': 'h',
	'ц': 'c',
	'ч': 'ch',
	'ш': 'sh',
	'щ': 'shh',
	'ъ': '"',
	'ы': 'y',
	'ь': '`',
	'э': 'e',
	'ю': 'yu',
	'я': 'ya',
}; // алфавит транслита

/**
 * Перевод строки в транслит
 * 
 * @param {String} str Строка для перевода
 * @returns {String} Переведённая строка
 */
function toTranslite(str)
{
	let newStr = '';
	const strToArr = str.split('');
	
	for (let i = 0, len = strToArr.length; i < len; i++)
	{
		if ( !strToArr[i].match(/[^а-яё]/i) )
		{
			// Учитывать регистр
			if ( strToArr[i] === strToArr[i].toUpperCase() )
			{
				const toUpper = alphabet[strToArr[i].toLowerCase()];
				
				newStr += toUpper.toUpperCase();
			}
			else
			{
				newStr += alphabet[strToArr[i]];
			}
		}
		else
		{
			newStr += strToArr[i];
		}	
	}
	
	return newStr;
}

exports.toTranslite = toTranslite;
