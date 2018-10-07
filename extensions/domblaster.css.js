/****************************************************************************
 * DOMBlaster CSS Extensions by Matt Tropiano (C) 2018
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

	$D.extensions['css'] = true;

	/**
	 * Adds a CSS class (or classes) to each element.
	 * @param cnames (string) the single class to add.
	 * 		(Array) the list of classes to add.
	 */
	$D.extend('addClass', function(cnames)
	{
		let classes = $D.makeClassMap(this.className);

		if ($D.isArray(cnames))
		{
			for (let i = 0; i < cnames.length; i++)
				if (!classes[cnames[i]])
					classes[cnames[i]] = true;
		}
		else if (!classes[cnames])
			classes[cnames] = true;

		this.className = $D.mergeClassMap(classes);
	});

	/**
	 * Removes a CSS class (or classes) from each element.
	 * @param cnames (string) the single class to remove.
	 * 		(Array) the list of classes to remove.
	 */
	$D.extend('removeClass', function(cnames)
	{
		let classes = $D.makeClassMap(this.className);

		if ($D.isArray(cnames))
		{
			for (let i = 0; i < cnames.length; i++)
				if (classes[cnames[i]])
					delete classes[cnames[i]];
		}
		else if (classes[cnames])
			delete classes[cnames];

		this.className = $D.mergeClassMap(classes);
	});

	/**
	 * Toggles the presence of a CSS class on each element.
	 * If it exists, it is removed. If it is absent, it is added.
	 * @param cnames (string) the single class to toggle.
	 * 		(Array) the list of classes to toggle.
	 */
	$D.extend('toggleClass', function(cnames)
	{
		let classes = $D.makeClassMap(this.className);

		if ($D.isArray(cnames))
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

		this.className = $D.mergeClassMap(classes);
	});

	/**
	 * Replaces the presence of a CSS class with another on each element.
	 * If it exists, it is removed and the new CSS class is added. If it is absent, nothing happens.
	 * @param cnames (string) the single class to replace.
	 * 		(Array) the list of classes to replace.
	 * @param newclass (string) the new class, if replaced.
	 */
	$D.extend('replaceClass', function(cnames, newclass)
	{
		let classes = $D.makeClassMap(this.className);

		if ($D.isArray(cnames))
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

		this.className = $D.mergeClassMap(classes);
	});

	/**
	 * Checks if this element contains a specific CSS class.
	 * @param cname (string) the single class to check.
	 * @return true if so, false if not.
	 */
	$D.extend('hasClass', function(cname)
	{
		let classes = this.className.trim().length > 0 ? this.className.split(/\s+/) : [];
		return classes.indexOf(cname) >= 0;
	});

	/**
	 * @return an array of classes that the first element contains.
	 */
	$D.extend('getClasses', function()
	{
		return this.className.trim().length > 0 ? this.className.split(/\s+/) : [];
	});

	/**
	 * Sets or gets CSS styles or values.
	 * @param property
	 *		if (string): property to use:
	*			if value is undefined, return value.
	*			else, set CSS property to value. No return (chaining).
	*		if (Array): treat as list of properties - return an object mapping of property to value.
	*		if (Object): treat as map of {property: value} and sets all of them. Undefined/null values remove the style. No return (chaining).
	* @return (varies)
	*/
	$D.extend('style', function(property, value)
	{
		// if array.
		if ($D.isArray(property))
		{
			let out = {};
			$D.each(property, (value)=>{
				out[value] = this.style[value];
			});
			return out;
		}
		// if map.
		else if ($D.isObject(property))
		{
			$D.each(property, (value, key)=>{
				if ($D.isUndefined(value) || $D.isNull(value))

				this.style[key] = value;
			});
		}
		// if no value, get property.
		else if ($D.isUndefined(value) && !$D.isUndefined(property))
		{
			let out = this.style[property];
			return $D.isUndefined(out) ? null : out;
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
	$D.extend('styleComputed', function(property)
	{
		let computed = getComputedStyle(this);
		// if map.
		if ($D.isArray(property))
		{
			let out = {};
			$D.each(property, (value)=>{
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

})(DOMBlaster);
