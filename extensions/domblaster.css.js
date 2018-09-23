/****************************************************************************
 * DOMBlaster CSS Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 ****************************************************************************/

if (!DOMBlaster)
	console.error("DOMBlaster must be loaded first!");
 
/**
 * Adds a CSS class (or classes) to each element.
 * @param cnames (string) the single class to add.
 * 		(Array) the list of classes to add.
 */
DOMBlaster.extend('addClass', function(cnames)
{
	let classes = DOMBlaster.makeClassMap(this.className);

	if (DOMBlaster.isArray(cnames))
	{
		for (let i = 0; i < cnames.length; i++)
			if (!classes[cnames[i]])
				classes[cnames[i]] = true;
	}
	else if (!classes[cnames])
		classes[cnames] = true;

	this.className = DOMBlaster.mergeClassMap(classes);
});

/**
 * Removes a CSS class (or classes) from each element.
 * @param cnames (string) the single class to remove.
 * 		(Array) the list of classes to remove.
 */
DOMBlaster.extend('removeClass', function(cnames)
{
	let classes = DOMBlaster.makeClassMap(this.className);

	if (DOMBlaster.isArray(cnames))
	{
		for (let i = 0; i < cnames.length; i++)
			if (classes[cnames[i]])
				delete classes[cnames[i]];
	}
	else if (classes[cnames])
		delete classes[cnames];

	this.className = DOMBlaster.mergeClassMap(classes);
});

/**
 * Toggles the presence of a CSS class on each element.
 * If it exists, it is removed. If it is absent, it is added.
 * @param cnames (string) the single class to toggle.
 * 		(Array) the list of classes to toggle.
 */
DOMBlaster.extend('toggleClass', function(cnames)
{
	let classes = DOMBlaster.makeClassMap(this.className);

	if (DOMBlaster.isArray(cnames))
	{
		for (let i = 0; i < cnames.length; i++)
		{
			if (classes[cnames[i]])
				delete classes[cnames[i]];
			else
				classes[cnames[i]] = true;
		}
	}
	else if (classes[cnames])
		delete classes[cnames];
	else
		classes[cnames] = true;

	this.className = DOMBlaster.mergeClassMap(classes);
});

/**
 * Replaces the presence of a CSS class with another on each element.
 * If it exists, it is removed and the new CSS class is added. If it is absent, nothing happens.
 * @param cnames (string) the single class to replace.
 * 		(Array) the list of classes to replace.
 * @param newclass (string) the new class, if replaced.
 */
DOMBlaster.extend('replaceClass', function(cnames, newclass)
{
	let classes = DOMBlaster.makeClassMap(this.className);

	if (DOMBlaster.isArray(cnames))
	{
		for (let i = 0; i < cnames.length; i++)
		{
			if (classes[cnames[i]])
			{
				delete classes[cnames[i]];
				classes[newclass] = true;
			}
		}
	}
	else if (classes[cnames])
	{
		delete classes[cnames];
		classes[newclass] = true;
	}

	this.className = DOMBlaster.mergeClassMap(classes);
});

/**
 * Checks if this element contains a specific CSS class.
 * @param cname (string) the single class to check.
 * @return true if so, false if not.
 */
DOMBlaster.extend('hasClass', function(cname)
{
	let classes = this.className.trim().length > 0 ? this.className.split(/\s+/) : [];
	return classes.indexOf(cname) >= 0;
});

/**
 * @return an array of classes that the first element contains.
 */
DOMBlaster.extend('getClasses', function()
{
	return this.className.trim().length > 0 ? this.className.split(/\s+/) : [];
});

/**
 * Sets or gets a CSS style or value.
 * @param property
 *		if (string): property to use:
 *			if value is undefined, return value.
 *			else, set CSS property to value. No return.
 *		if (Array): treat as list of properties - return an object mapping of property to value.
 *		if (Object): treat as map of {property: value} and sets all of them. No return.
 * @return (varies)
 */
DOMBlaster.extend('style', function(property, value)
{
	// if array.
	if (DOMBlaster.isArray(property))
	{
		let out = {};
		DOMBlaster.each(property, (value)=>{
			out[value] = this.style[value];
		});
		return out;
	}
	// if map.
	else if (DOMBlaster.isObject(property))
	{
		DOMBlaster.each(property, (value, key)=>{
			this.style[key] = value;
		});
	}
	// if no value, get property.
	else if (DOMBlaster.isUndefined(value) && !DOMBlaster.isUndefined(property))
	{
		let out = this.style[property];
		return DOMBlaster.isUndefined(out) ? null : out;
	}
	else
		this.style[property] = value;
});

/**
 * Gets a COMPUTED CSS style value.
 * @param property
 *		if (string): property to retrieve - return a value.
 *		if (Array): treat as list of properties - return an object mapping of property to value.
 * @return (varies)
 */
DOMBlaster.extend('styleComputed', function(property)
{
	let computed = getComputedStyle(this);
	// if map.
	if (DOMBlaster.isArray(property))
	{
		let out = {};
		DOMBlaster.each(property, (value)=>{
			let val = computed[value];
			out[value] = (typeof val) === 'undefined' ? null : val;
		});
		return out;
	}
	else
	{
		let val = computed[property];
		return (typeof val) === 'undefined' ? null : val;
	}
});
