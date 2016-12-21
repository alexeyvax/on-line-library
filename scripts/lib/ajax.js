/**
 * Отправляет ajax запрос на сервер с данными
 *
 * @param method метод загрузки
 * @param url адрес на который будет произведена запрос
 * @param body дополнительные данные отправленные на сервер
 * @param bodyIsJson формат дополнительных данных json?
 * @param success коллбек функция при успехе запроса
 */

function ajax( method, url, body, bodyIsJson, success )
{
	const request = new XMLHttpRequest();
	
	request.addEventListener( 'load', send );
	request.open( method, url );
	
	if ( bodyIsJson )
	{
		request.setRequestHeader( 'Content-type', 'application/json; charset=utf-8' );
		request.send( body ? JSON.stringify( body ) : undefined );
	}
	else
	{
		request.send( body ? body : undefined );
	}
	
	function send()
	{
		if ( request.readyState === XMLHttpRequest.DONE
			&& request.status === 200 )
		{
			success( request.responseText );
			
			// console.log( 'прочитано', request.responseText );
		}
		else
		{
			console.log( 'Не прочитано' );
		}
	}
}

export {
	ajax as default,
}
