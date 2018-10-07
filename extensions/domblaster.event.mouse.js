/****************************************************************************
 * DOMBlaster Mouse Event Extensions by Matt Tropiano (C) 2018
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

	if (!$D.extensions['event'])
	{
		console.error("DOMBlaster Event Extensions must be loaded first!");
		return;
	}
		
	$D.extensions['eventmouse'] = true;

	/************* Extensions ***************/

	/**
	 * Adds a 'click' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('click', function(func, options) {
		$D.addEvent(this, 'click', func, options);
	});

	/**
	 * Adds a 'dblclick'(double-click) event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('dblclick', function(func, options) {
		$D.addEvent(this, 'dblclick', func, options);
	});

	/**
	 * Adds a 'contextmenu' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('contextmenu', function(func, options) {
		$D.addEvent(this, 'contextmenu', func, options);
	});

	/**
	 * Adds a 'mouseenter' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mouseenter', function(func, options) {
		$D.addEvent(this, 'mouseenter', func, options);
	});

	/**
	 * Adds a 'mouseleave' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mouseleave', function(func, options) {
		$D.addEvent(this, 'mouseleave', func, options);
	});

	/**
	 * Adds a 'mouseup' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mouseup', function(func, options) {
		$D.addEvent(this, 'mouseup', func, options);
	});

	/**
	 * Adds a 'mousedown' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mousedown', function(func, options) {
		$D.addEvent(this, 'mousedown', func, options);
	});

	/**
	 * Adds a 'mouseover' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mouseover', function(func, options) {
		$D.addEvent(this, 'mouseover', func, options);
	});

	/**
	 * Adds a 'mouseout' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('mouseout', function(func, options) {
		$D.addEvent(this, 'mouseout', func, options);
	});

})(DOMBlaster);
