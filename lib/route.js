const fs = require('fs');

function route( app, routeParams )
{
	const bpjson = routeParams.put.bpjson;
	
	app.route( '/:id' )
	.put(
		bpjson,
		( req, res ) =>
		{
			const pathListBooks = routeParams.put.pathListBooks,
				data = JSON.parse( fs.readFileSync( pathListBooks ));

			const response = req.body;
			
			let indexElement;
			let needle = {};
			const changeCandidate = data.some( searchItem );
			/**
			 * Поиск нужного элемента
			 * 
			 * @param item {Object} Итерируемый элемент
			 * @param index {Number} Индекс элемента
			 * @returns {Boolean}
			 */
			function searchItem( item, index )
			{
				if ( String( item.id ) === String( req.params.id ))
				{
					item.author = response['author'];
					item.name = response['name'];
					item.description = response['description'];
					
					indexElement = index;
					needle = item;
					return true;
				}
				else
				{
					return false;
				}
			}
			
			if ( changeCandidate )
			{
				fs.writeFileSync( pathListBooks, JSON.stringify( data, null, 2 ), 'utf8' );
			}
			
			res.send( [indexElement, needle] );
		}
	)
	.delete(
		( req, res ) =>
		{
			const id = req.params.id;
			
			const promise = new Promise(( resolve, reject ) =>
			{
				resolve( {id, routeParams, res} );
			});
			
			promise.then(( {id, routeParams, res} ) =>
			{
				const folder = routeParams.delete.folder;
				
				fs.readdir( folder, ( err, files ) =>
				{
					let needleDir;
					const deleteDir = files.some( searchDir );
					
					function searchDir( item )
					{
						if ( String( item.match( /[^_]+$/ )) === id )
						{
							needleDir = item;
							
							rmdir( folder + '/' + item );
							
							return true;
						}
						else
						{
							return false;
						}
					}
					
					/* without promise and with recursion */
					
					let tryCount = 1;
					
					function rmdir( dir )
					{
						fs.readdir( dir, ( err, files ) =>
						{
							if ( files )
							{
								const len = files.length;
								
								for ( let i = 0; i < len; i++ )
								{
									fs.unlink( dir + '/' + files[i] );
								};
							}
						});
						
						fs.rmdir( dir, () =>
						{
							// console.log( dir + ' was removed!' );
						});
						
						setTimeout(
							() =>
							{
								fs.readdir( folder, ( err, files ) =>
								{
									const checkDir = files.some( searchDir );
									
									if ( checkDir )
									{
										console.log( 'i need removed' );
										
										// call rmdir not more than three times
										if ( tryCount <= 3 )
										{
											rmdir( dir );
											
											tryCount++;
										}
									}
									else
									{
										console.log( dir + ' was removed!' );
									}
								});
							}, 100
						);
					}
				});
				
				return {id, routeParams, res};
			})
			.then(( {id, routeParams, res} ) =>
			{
				const pathListBooks = routeParams.delete.pathListBooks,
					data = JSON.parse( fs.readFileSync( pathListBooks ));
				
				let needle;
				let index;
				const deleteCandidate = data.some( searchItem );
				
				/**
				 * Поиск нужного элемента
				 * 
				 * @param item {Object} Итерируемый элемент
				 * @returns {Boolean}
				 */
				function searchItem( item )
				{
					if ( String( item.id ) === id )
					{
						needle = item;
						return true;
					}
					else
					{
						return false;
					}
				}
				
				if ( deleteCandidate )
				{
					index = data.indexOf( needle );
					data.splice( index, 1 );
					
					fs.writeFileSync( pathListBooks, JSON.stringify( data, null, 2 ), 'utf8' );
				}
				
				return {res, index};
			})
			.then(( {res, index} ) =>
			{
				res.send( [index] );
			})
			.catch(( reason ) =>
			{
				console.log( `Error: ${reason}` );
			});
		}
	);
}

exports.route = route;
