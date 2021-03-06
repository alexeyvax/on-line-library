/**
 * Translate string to translit with consider register letters
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
};

function toTranslite(str) {
	let newStr = '';
	const strToArr = str.split('');
	
	for (let i = 0, len = strToArr.length; i < len; i++) {
		if (!strToArr[i].match(/[^а-яё]/i)) {
			// consider register letters
			if (strToArr[i] === strToArr[i].toUpperCase()) {
				const toUpper = alphabet[strToArr[i].toLowerCase()];
				newStr += toUpper.toUpperCase();
			} else {
				newStr += alphabet[strToArr[i]];
			}
		} else {
			newStr += strToArr[i];
		}
	}
	return newStr;
}

exports.toTranslite = toTranslite;
