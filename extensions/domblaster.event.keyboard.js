/****************************************************************************
 * DOMBlaster Keyboard Event Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 * @license
 ****************************************************************************/ 

(function($D){

	if (!$D)
	{
		console.error("DOMBlaster must be loaded first!");
		return;
	}

	if (!$D.extensions.event)
	{
		console.error("DOMBlaster Event Extensions must be loaded first!");
		return;
	}
		
	$D.extensions['eventkeyboard'] = true;

	/************* Extensions ***************/

	/**
	 * Adds a 'keyup' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('keyup', function(func, options) {
		$D.addEvent(this, 'keyup', func, options);
	});

	/**
	 * Adds a 'keydown' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('keydown', function(func, options) {
		$D.addEvent(this, 'keydown', func, options);
	});

	/**
	 * Adds a 'keypress' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('keypress', function(func, options) {
		$D.addEvent(this, 'keypress', func, options);
	});

})(DOMBlaster);
