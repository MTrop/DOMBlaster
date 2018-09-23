/****************************************************************************
 * DOMBlaster by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 ****************************************************************************/

(function(_CTX)
{ 
	/***** Test Browser Capabilities *****/
	
	if (!_CTX.document.querySelectorAll)
	{
		console.error("Missing required function: document.querySelectorAll.");
		return;
	}
	if (!_CTX.document.querySelector)
	{
		console.error("Missing required function: document.querySelector.");
		return;
	}

	/***** END Test Browser Capabilities *****/

	let CURRENTDOM = _CTX.$D;
	
	let Util = {
		'isUndefined': function(obj) {
			return (typeof obj) === 'undefined';
		},
		'isNull': function(obj) {
			return obj === null;
		},
		'isType': function(obj, type) {
			return Object.prototype.toString.call(obj) === '[object '+type+']';
		},
		'isNumber': function(obj) {
			return Util.isType(obj, 'Number');
		},
		'isString': function(obj) {
			return Util.isType(obj, 'String');
		},
		'isArray': function(obj) {
			return Util.isType(obj, 'Array');
		},
		'isFunction': function(obj) {
			return Util.isType(obj, 'Function');
		},
		'isObject': function(obj) {
			return Util.isType(obj, 'Object');
		},
		'isBlank': function(obj) {
			return 
				(typeof obj) === 'undefined' || 
				obj === null || 
				obj === 0 || 
				(Util.isArray(obj) && obj.length === 0) || 
				(Util.isNumber(obj) && isNaN(obj)) || 
				(Util.isString(obj) && obj.trim().length === 0);
		},
		'each': function(list, func) {
			for (let x in list) if (list.hasOwnProperty(x))
				if (func(list[x], x, list.length))
					break;
		},
		'merge': function(base, add) {
			let out = {};
			if (!base) base = {};
			if (!add) add = {};
			Util.each(base, (value, key) => {
				if (Util.isUndefined(add[key]))
					out[key] = value;
				else
					out[key] = add[key];
			});
			Util.each(add, (value, key) => {
				if (Util.isUndefined(base[key]))
					out[key] = value;
			});
			return out;
		},
		'makeClassMap': function(className) {
			if (Util.isBlank(className))
				return {};
			let out = {};
			if (className.trim().length > 0) {
				let ss = className.split(/\s+/);
				for (let s in ss)
					out[ss[s]] = true;
			}
			return out;
		},
		'mergeClassMap': function(map) {
			let out = [];
			for (let x in map) if (map.hasOwnProperty(x))
				out.push(x);
			return out.join(' ');
		},
	};
	
	// Nano time.
	Util.nanoTime = (function(){
		// Webkit Browser
		if (performance)
		{
			return function() 
			{
				// ms to ns (us res)
				return parseInt(performance.now() * 1e6, 10);
			};	
		}
		else
		{
			return function()
			{
				// ms to ns (ms res)
				return Date.now() * 1e6;
			};
		}
	})();
	
	/*** Main Object ***/
	
	let _DOMBlasterGroup = function(elementList)
	{
		this.selection = elementList;
	};

	let DOMBlasterSelect = function(selector, one)
	{
		let doc = _CTX.document;
		let nt = Util.nanoTime();
		let dbgOut = null;

		if (Util.isUndefined(selector) || Util.isNull(selector))
			dbgOut = new _DOMBlasterGroup([]);
		// single element
		else if (selector instanceof Element)
			dbgOut = new _DOMBlasterGroup([selector]);
		// array of elements
		else if (Util.isArray(selector))
			dbgOut = new _DOMBlasterGroup(selector);
		else if (selector instanceof HTMLCollection)
			dbgOut = new _DOMBlasterGroup(selector);
		// CSS selector string
		else if (Util.isString(selector))
		{
			// if blank.
			if (!selector.trim().length)
				dbgOut = new _DOMBlasterGroup([]);
			else
				dbgOut = new _DOMBlasterGroup(one ? doc.querySelector(selector) : doc.querySelectorAll(selector));
		}
		
		dbgOut.time = Util.nanoTime() - nt;
		return dbgOut;
	};

	let DOMBlasterEXT = function(name, func)
	{
		_DOMBlasterGroup.prototype[name] = function() {
			let args = arguments;
			let retval;
			Util.each(this.selection, function(elem){
				retval = func.apply(elem, args);
				if ((typeof retval) !== 'undefined')
					return true; // break each
			});
			return (typeof retval) === 'undefined' ? this : retval;
		};
	};
	
	/*** Public API ***/

	/**
	 * Create a new DOMBlaster query.
	 * @param selector 
	 *		(string) CSS selector string.
	 *		(Element) wraps an element in a group.
	 * @param one (boolean) OPTIONAL: if true, only select first result.
	 * @return (_DOMBlasterGroup) query result.
	 */
	_CTX.DOMBlaster = new function() {
		return DOMBlasterSelect;
	};

	/**
	 * Access to common utilities.
	 */
	Util.each(Util, (func, name) => {
		_CTX.DOMBlaster[name] = func;
	});

	/**
	 * Selects an element in a Document.
	 * @param doc (Document) the document to select inside.
	 * @param selector (string) the CSS selector string.
	 * @param one (string) the CSS selector string.
	 * @return the corresponding element or null if not found.
	 */
	_CTX.DOMBlaster.selectIn = function(doc, selector, one)
	{
		let nt = Util.nanoTime();
		// if blank.
		if (!selector.trim().length)
			dbgOut = new _DOMBlasterGroup([]);
		else
			dbgOut = new _DOMBlasterGroup(one ? doc.querySelector(selector) : doc.querySelectorAll(selector));
		dbgOut.time = Util.nanoTime() - nt;
		return dbgOut;
	};

	/**
	 * Gets an element by id.
	 * @param s (string) the id.
	 * @return the corresponding element or null if not found.
	 */
	_CTX.DOMBlaster.id = function(s)
	{
		return new _DOMBlasterGroup(_CTX.document.getElementById(s));
	};

	/**
	 * Gets an element by name.
	 * @param n (string) the name.
	 * @return the corresponding element or null if not found.
	 */
	_CTX.DOMBlaster.name = function(n)
	{
		return new _DOMBlasterGroup(_CTX.document.getElementByName(n));
	};

	/**
	 * Gets elements by tag name.
	 * @param t (string) the tag name.
	 * @return an array of matching elements.
	 */
	_CTX.DOMBlaster.tag = function(t)
	{
		return new _DOMBlasterGroup(_CTX.document.getElementsByTagName(t));
	};

	/**
	 * Gets elements by class name.
	 * @param c (string) the class name.
	 * @return an array of matching elements.
	 */
	_CTX.DOMBlaster.className = function(c)
	{
		return new _DOMBlasterGroup(_CTX.document.getElementsByClassName(s));
	};
	
	/**
	 * Extend DOMBlaster.
	 * If the function to use as an extension does not return anything, the call will return
	 * the element group for chaining.
	 * @param name (string) function name.
	 * @param func (Function) a function that is passed in the element to action on as THIS. Arguments are kept.
	 */
	_CTX.DOMBlaster.extend = DOMBlasterEXT;

	/**
	 * Extend DOMBlaster using a group of functions.
	 * If each function to use as an extension does not return anything, the call will return
	 * the element group for chaining.
	 * @param funcObject (Object) function name to function mapping: 
	 *		{name: (Function(TOOLKIT)) a function that is passed in the TOOLKIT, must return a function to attach.}.
	 */
	_CTX.DOMBlaster.extendAll = function(funcObject) {
		Util.each(funcObject, (func, name) => {
			DOMBlasterEXT(name, func);
		});
	};

	/**
	 * Restore the previous assigning of $D on the context.
	 */
	_CTX.DOMBlaster.noConflict = function() {
		_CTX.$D = CURRENTDOM;
	};

	/******** Built in group functions. ********/
	
	_DOMBlasterGroup.prototype['get'] = function(index) {
		return DOMBlaster(this.selection[index]);
	};
	
})(this);
var $D = $D || DOMBlaster;
