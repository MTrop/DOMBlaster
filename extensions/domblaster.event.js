/****************************************************************************
 * DOMBlaster Event Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 * @license
 ****************************************************************************/ 

if (!DOMBlaster)
	console.error("DOMBlaster must be loaded first!");

DOMBlaster.extensions['event'] = true;

/************* Extensions ***************/

/**
 * Adds an event to the elements in the selection, or fires the event on
 * all of the elements if no provided function.
 * @param eventType (string) the event type ('click', 'keydown', etc.).
 * @param func (function) the handler function to add (if not undefined, fire the event).
 * @param options (object) attachment options.
 */
DOMBlaster.extend('on', function(eventType, func, options) {
	DOMBlaster.addEvent(this, eventType, func, options);
});

/**
 * Removes an event from the elements in the selection.
 * @param eventType (string) the event type ('click', 'keydown', etc.).
 * @param func (function) the handler function to remove (if not undefined, fire the event).
 * @param options (object) attachment options.
 */
DOMBlaster.extend('off', function(eventType, func, options) {
	DOMBlaster.removeEvent(this, eventType, func, options);
});

/**
 * Fires an event to the elements in the selection.
 * @param event (Event) the event type.
 */
DOMBlaster.extend('send', function(event) {
	DOMBlaster.sendEvent(this, event);
});
