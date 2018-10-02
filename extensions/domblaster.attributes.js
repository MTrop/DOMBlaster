/****************************************************************************
 * DOMBlaster DOMM Attributes Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 * @license
 ****************************************************************************/

if (!DOMBlaster)
	console.error("DOMBlaster must be loaded first!");

DOMBlaster.extensions['attributes'] = true;

/************* Extensions ***************/

/**
 * Gets/sets an element's attributes.
 * @param attribute 
 *		if (string): attribute to use:
 *			if value is undefined, return value.
 *			else, set attribute to value. No return (chaining).
 *		if (Array): treat as list of attribute names - return an object mapping of attribute to value.
 *		if (Object): treat as map of {attribute: value} and sets all of them. Undefined/null values remove the attribute. No return (chaining).
 * @return (varies)
 */
DOMBlaster.extend('attrib', function(attribute, value) {

	// if array.
	if (DOMBlaster.isArray(attribute))
	{
		let out = {};
		DOMBlaster.each(attribute, (value)=>{
			out[value] = this.getAttribute(value);
		});
		return out;
	}
	// if map.
	else if (DOMBlaster.isObject(attribute))
	{
		DOMBlaster.each(attribute, (value, key)=>{
			if (DOMBlaster.isUndefined(value) || DOMBlaster.isNull(value))
				this.removeAttribute(key);
			else
				this.setAttribute(key, value);
		});
	}
	// if no value, get attribute.
	else if (DOMBlaster.isUndefined(value) && !DOMBlaster.isUndefined(attribute))
	{
		let out = this.getAttribute(attribute);
		return DOMBlaster.isUndefined(out) ? null : out;
	}
	else
		this.setAttribute(attribute, value);
	
});

/**
 * Gets/sets an element's id.
 * @param value (varies) the id to set, or if not defined, returns it's current value.
 * @return (varies)
 */
DOMBlaster.extend('id', function(value) {
	if (DOMBlaster.isUndefined(value))
		return this.getAttribute('id');
	else
		this.setAttribute('id', value);
});

/**
 * Gets/sets an element's name.
 * @param value (varies) the name to set, or if not defined, returns it's current value.
 * @return (varies)
 */
DOMBlaster.extend('name', function(value) {
	if (DOMBlaster.isUndefined(value))
		return this.getAttribute('name');
	else
		this.setAttribute('name', value);
});

/**
 * Gets/sets an element's ARIA attribute.
 * @param attribute (string) the ARIA attribute name.
 * @param value (varies) the value to set, or if not defined, returns the attribute's current value.
 * @return (varies)
 */
DOMBlaster.extend('aria', function(attribute, value) {
	let ariaAttrib = 'aria-' + attribute;
	if (DOMBlaster.isUndefined(value))
		return this.getAttribute(ariaAttrib);
	else
		this.setAttribute(ariaAttrib, value);
});
