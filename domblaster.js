/****************************************************************************
 * DOMBlaster by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 * @license
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
	
	// Matches() polyfill.
	let elemMatches = (
		Element.prototype.matches ||
		Element.prototype.matchesSelector || 
		Element.prototype.msMatchesSelector || 
		Element.prototype.webkitMatchesSelector
	);
	
	Util.matches = function(elem, selector){
		return elemMatches.call(elem, selector);
	};

	// event() polyfill.
	Util.addEvent = (function(){
		if (Element.prototype.addEventListener) {
			return function(elem, name, func, options) {
				if (!Util.isNull(func))
					elem.addEventListener(name, func, options);
			};
		} else if (Element.prototype.attachEvent) {
			return function(elem, name, func, options) {
				if (!Util.isNull(func))
					elem.attachEvent('on' + name, func, options);
			};
		} else {
			return function(elem, name, func) {
				if (!Util.isNull(func))
					elem['on'+name] = func;
			};
		}
	})();

	// removeEvent() polyfill.
	Util.removeEvent = (function(){
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

	// dispatchEvent() polyfill.
	Util.dispatchEvent = (function(){
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
	
	/*** Main Object ***/
	
	let DOMBlasterGroup = function(elementList)
	{
		// convert Array-like to array - certain collections have iterator problems
		this.selection = Array.from(elementList);
	};

	let DOMBlasterSelect = function(selector, one)
	{
		let doc = _CTX.document;
		if (Util.isUndefined(selector) || Util.isNull(selector))
			return new DOMBlasterGroup([]);
		// single element
		else if (selector instanceof Element)
			return new DOMBlasterGroup([selector]);
		// list of elements
		else if (selector instanceof NodeList)
			return new DOMBlasterGroup(selector);
		else if (selector instanceof HTMLCollection)
			return new DOMBlasterGroup(selector);
		// array of elements
		else if (Util.isArray(selector))
			return new DOMBlasterGroup(selector);
		// CSS selector string
		else if (Util.isString(selector))
		{
			// if blank.
			if (!selector.trim().length)
				return new DOMBlasterGroup([]);
			else
			{
				if (one)
				{
					let e = doc.querySelector(selector);
					return new DOMBlasterGroup(e ? [e] : []);
				}
				else
					return new DOMBlasterGroup(doc.querySelectorAll(selector));
			}
		}
		return null;
	};

	let DOMBlasterEXT = function(name, func)
	{
		DOMBlasterGroup.prototype[name] = function() {
			let retval;
			let args = arguments;
			for (let i = 0; i < this.selection.length && (typeof retval) === 'undefined'; i++)
				retval = func.apply(this.selection[i], args);
			return (typeof retval) === 'undefined' ? this : retval;
		};
	};

	let DOMBlasterProtoEXT = function(name, func)
	{
		DOMBlasterGroup.prototype[name] = function() {
			return func.apply(this, arguments);
		};
	};
	
	/*** Public API ***/

	/**
	 * Create a new DOMBlaster query.
	 * @param selector 
	 *		(string) CSS selector string.
	 *		(Element) wraps an element in a group.
	 * @param one (boolean) OPTIONAL: if true, only select first result.
	 * @return (DOMBlasterGroup) query result.
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
	 * Gets an element by id.
	 * @param id (string) the id.
	 * @return the corresponding element or null if not found.
	 */
	_CTX.DOMBlaster.id = function(id)
	{
		return new DOMBlasterGroup([_CTX.document.getElementById(id)]);
	};

	/**
	 * Gets an element by name.
	 * @param n (string) the name.
	 * @return the corresponding element or null if not found.
	 */
	_CTX.DOMBlaster.name = function(n)
	{
		return new DOMBlasterGroup(_CTX.document.getElementByName(n));
	};

	/**
	 * Gets elements by tag name.
	 * @param t (string) the tag name.
	 * @return an array of matching elements.
	 */
	_CTX.DOMBlaster.tag = function(t)
	{
		return new DOMBlasterGroup(_CTX.document.getElementsByTagName(t));
	};

	/**
	 * Gets elements by class name.
	 * @param c (string) the class name.
	 * @return an array of matching elements.
	 */
	_CTX.DOMBlaster.className = function(c)
	{
		return new DOMBlasterGroup(_CTX.document.getElementsByClassName(c));
	};
	
	/**
	 * Extends DOMBlaster's selection group prototype.
	 * @param name (string) function name.
	 * @param func (Function) the function to call. The selection group is passed as 'this'. Arguments are kept.
	 */
	_CTX.DOMBlaster.extendGroup = DOMBlasterProtoEXT;

	/**
	 * Extends DOMBlaster's selection applier.
	 * If the function to use as an extension does not return anything, the call will return
	 * the element group for chaining.
	 * @param name (string) function name.
	 * @param func (Function) a function that is passed in the element to action on as 'this'. Arguments are kept.
	 */
	_CTX.DOMBlaster.extend = DOMBlasterEXT;

	/**
	 * Restores the previous assigning of $D on the context.
	 */
	_CTX.DOMBlaster.noConflict = function() {
		_CTX.$D = CURRENTDOM;
	};

	/** Mapping of extensions present (for querying by other major extensions). */
	_CTX.DOMBlaster.extensions = {};

	
	/******** Built in group functions. ********/
	
	/**
	 * Calls a function for each object in the selection group.
	 * @param func (Function) a function to call per object in the group. The 'this' field is set to the object.
	 */
	DOMBlasterEXT('each', function(func) {
		func.apply(this);
	});

	/**
	 * Selects inside an element's descendants.
	 * @return (HTMLDocument) the element's contents as a document object.
	 */
	DOMBlasterEXT('select', function(selector, one) {
		if (one)
		{
			let e = this.querySelector(selector);
			return new DOMBlasterGroup(e ? [e] : []);
		}
		else
			return new DOMBlasterGroup(this.querySelectorAll(selector));
	});

	/**
	 * Gets an element from the selection group wrapped in a new selection group.
	 * @param index (Number) the index into the group.
	 * @return (DOMBlasterGroup) a single element wrapped in a selection group.
	 */
	DOMBlasterProtoEXT('get', function(index) {
		return new DOMBlasterGroup(this.selection[index]);
	});

	/**
	 * Calls a function for each object in the selection group and gathers the returns into an array.
	 * @param func (Function) a function to call per object in the group. The 'this' field is set to the object.
	 * @return (Array) an accumulation of all of the returned values per object.
	 */
	DOMBlasterProtoEXT('gather', function(func) {
		let out = [];
		for (let i = 0; i < this.selection.length; i++)
			out.push(func.apply(this.selection[i]));
		return out;
	});
	
	/**
	 * Checks if all elements in the collection match a CSS selector.
	 * @param selector (string) the selector.
	 * @return (boolean) true if so, false if not.
	 */
	DOMBlasterProtoEXT('matches', function(selector) {
		let out = true;
		for (let i = 0; i < this.selection.length && out; i++)
			out = out && Util.matches(this.selection[i], selector);
		return out;
	});

})(this);
var $D = $D || DOMBlaster;
