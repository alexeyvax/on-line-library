/**
 * Класс закреплённого элемента
 */
const CLASS_STICKY = 'sticky';

/**
 * Прикрепляет заданный элемент
 */
class Sticky
{
	constructor()
	{
		let initialized = false;
		this.stickyElement = document.querySelector( 'ul.list-names-books' );
		
		this.pinned = false;
		
		this.updateElementTopOffset();
		this.updatePinningState( window.pageYOffset );
		
		if ( !initialized )
		{
			window.addEventListener( 'scroll', () => this.windowScrollHandler() );
			window.addEventListener( 'resize', () => this.windowResizeHandler() );
			initialized = true;
		}
	}
	
	pin()
	{
		this.stickyElement.classList.add( CLASS_STICKY );
		this.pinned = true;
	}
	
	unPin()
	{
		this.stickyElement.classList.remove( CLASS_STICKY );
		this.pinned = false;
	}
	
	isPinned()
	{
		return this.pinned;
	}
	
	updatePinningState( scrollY )
	{
		if ( ( this.elementTopOffset < scrollY )
			&& !this.isPinned() )
		{
			this.pin();
		}
		else if ( ( this.elementTopOffset >= scrollY )
			&& this.isPinned() )
		{
			this.unPin();
		}
	}
	
	updateElementTopOffset()
	{
		this.elementTopOffset = this.stickyElement.getBoundingClientRect().top
			+ window.pageYOffset;
	}
	
	windowScrollHandler()
	{
		this.updatePinningState( window.pageYOffset );
	}
	
	windowResizeHandler()
	{
		this.updateElementTopOffset();
		this.updatePinningState( window.pageYOffset );
	}
}

export {
	Sticky as default,
}
