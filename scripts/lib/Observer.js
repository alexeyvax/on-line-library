/**
 * Класс наблюдатель
 *
 * @param id уникальный номер подписчика
 * @param subject экземпляр класса EventEmitter
 *
 * @method onChange сообщает всем подписчикам оо изменениях
 */

class Observer
{
	constructor( id, subject, name )
	{
		this.id = id;
		this.subject = subject;
		
		this.subject.addListener( name, ( data ) => this.onChange( data ) );
	}

	onChange( data )
	{
		console.log( `${this.id} notified of change:`, data );
	}
}

export {
	Observer as default,
}
