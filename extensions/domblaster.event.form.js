/****************************************************************************
 * DOMBlaster Form Event Extensions by Matt Tropiano (C) 2018
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
		
	$D.extensions['eventform'] = true;

	/************* Extensions ***************/

	/**
	 * Adds a 'blur' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('blur', function(func, options) {
		$D.addEvent(this, 'blur', func, options);
	});

	/**
	 * Adds a 'focus' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('focus', function(func, options) {
		$D.addEvent(this, 'focus', func, options);
	});

	/**
	 * Adds a 'focusin' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('focusin', function(func, options) {
		$D.addEvent(this, 'focusin', func, options);
	});

	/**
	 * Adds a 'focusout' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('focusout', function(func, options) {
		$D.addEvent(this, 'focusout', func, options);
	});

	/**
	 * Adds a 'change' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('change', function(func, options) {
		$D.addEvent(this, 'change', func, options);
	});

	/**
	 * Adds a 'select' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('select', function(func, options) {
		$D.addEvent(this, 'select', func, options);
	});

	/**
	 * Adds a 'submit' event to the elements in the selection.
	 * @param func (function) the function to attach.
	 * @param options (object) event attachment options.
	 */
	$D.extend('submit', function(func, options) {
		$D.addEvent(this, 'submit', func, options);
	});

})(DOMBlaster);
