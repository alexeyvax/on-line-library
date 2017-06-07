/** Success code */
const CODE_200 = 200;

/**
 * Sending ajax with data on server
 *
 * @param method Sending mehod
 * @param url Adress url
 * @param body Additional data for sending
 * @param isBodyJson Additional data format is json?
 * @param success Callback function on success
 */
function ajax(method, url, body, isBodyJson, success) {
	const request = new XMLHttpRequest();
	request.addEventListener('load', send);
	request.open(method, url);
	
	if (isBodyJson) {
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		request.send(body ? JSON.stringify(body) : undefined);
	} else {
		request.send(body ? body : undefined);
	}
	
	function send() {
		if (request.readyState === XMLHttpRequest.DONE
			&& request.status === CODE_200) {
			success(request.responseText);
		} else {
			console.error('Do not read');
			// throw new Error('Do not read!!!!!');
		}
	}
}

export default ajax;
