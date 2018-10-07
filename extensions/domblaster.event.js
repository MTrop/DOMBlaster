/****************************************************************************
 * DOMBlaster Event Extensions by Matt Tropiano (C) 2018
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

	$D.extensions['event'] = true;

	/************* Global ***************/

	/**
	 * Adds an event to an element.
	 * @param elem (Element) the element to add the event to.
	 * @param name (string) the event name to attach to.
	 * @param func (function) the function to call (`this` becomes the element and the event is passed to it as the 1st argument).
	 * @param options (Object) the options to pass to addEventListener/attachEvent (depending on implementation).
	 */
	$D.addEvent = (function(){
		if (Element.prototype.addEventListener) {
			return function(elem, name, func, options) {
				if (!$D.isNull(func))
					elem.addEventListener(name, func, options);
			};
		} else if (Element.prototype.attachEvent) {
			return function(elem, name, func, options) {
				if (!$D.isNull(func))
					elem.attachEvent('on' + name, func, options);
			};
		} else {
			return function(elem, name, func) {
				if (!$D.isNull(func))
					elem['on'+name] = func;
			};
		}
	})();

	/**
	 * Removes an event from an element.
	 * @param elem (Element) the element to remove the event from.
	 * @param name (string) the event name to attach to.
	 * @param func (function) the function to call (`this` becomes the element and the event is passed to it as the 1st argument).
	 * @param options (Object) the options to pass to removeEventListener/detachEvent (depending on implementation).
	 */
	$D.removeEvent = (function(){
		if (Element.prototype.removeEventListener) {
			return function(elem, name, func, options) {
				elem.removeEventListener(name, func, options);
			};
		} else if (Element.prototype.detachEvent) {
			return function(elem, name, func, options) {
				elem.detachEvent('on' + name, func, options);
			};
		} else {
			return function(elem, name, func) {
				elem['on'+name] = null;
			};
		}
	})();

	/**
	 * Sends/dispatches an event to an element.
	 * @param elem (Element) the element to dispatch the event on.
	 * @param event (Event) the event to dispatch.
	 */
	$D.sendEvent = (function(){
		if (Element.prototype.dispatchEvent) {
			return function(elem, event) {
				elem.dispatchEvent(event);
			};
		} else if (Element.prototype.fireEvent) {
			return function(elem, event) {
				elem.fireEvent(event);
			};
		}
	})();

	/************* Extensions ***************/

	/**
	 * Adds an event to the elements in the selection, or fires the event on
	 * all of the elements if no provided function.
	 * @param eventType (string) the event type ('click', 'keydown', etc.).
	 * @param func (function) the handler function to add (if not undefined, fire the event).
	 * @param options (object) event attachment options.
	 */
	$D.extend('on', function(eventType, func, options) {
		$D.addEvent(this, eventType, func, options);
	});

	/**
	 * Removes an event from the elements in the selection.
	 * @param eventType (string) the event type ('click', 'keydown', etc.).
	 * @param func (function) the handler function to remove (if not undefined, fire the event).
	 * @param options (object) event attachment options.
	 */
	$D.extend('off', function(eventType, func, options) {
		$D.removeEvent(this, eventType, func, options);
	});

	/**
	 * Fires an event to the elements in the selection.
	 * @param event (Event) the event type.
	 */
	$D.extend('send', function(event) {
		$D.sendEvent(this, event);
	});

})(DOMBlaster);
