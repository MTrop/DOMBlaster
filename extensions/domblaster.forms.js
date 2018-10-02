/****************************************************************************
 * DOMBlaster Form Extensions by Matt Tropiano (C) 2018
 * Requires ECMAScript 6
 * Licensed for use under the MIT License
 * @license
 ****************************************************************************/

if (!DOMBlaster)
	console.error("DOMBlaster must be loaded first!");

DOMBlaster.extensions['forms'] = true;

/************* Extensions ***************/

/**
 * Gets/sets the value attribute of the selection.
 * Gets first or fills multiple.
 */
DOMBlaster.extend('value', function(v) {
	if (DOMBlaster.isUndefined(v))
		return this.value;
	else
		this.value = v;
});

/**
 * Scrapes a form (each form in collection) for its values and returns an object of the name-value pairings of the form fields,
 * or an object mapping (name/id for key).
 * The 'id' attribute is used if 'name' is not provided. Unnamed form elements are not scraped.
 * @param callback [optional] if provided, call this function with one argument: the data returned.
 * @return an object of the name/value pairings of the form fields, or the selection group if a callback was provided.
 */
DOMBlaster.extendGroup('formState', function(callback) {
	
	if (callback && 'function' !== typeof(callback))
		throw new Error("Callback function for formData must be a function!");
	
	let out = {};
	let f = 0;
	this.each(function()
	{
		let formData = {};
		let dbForm = DOMBlaster(this);
		let formId = this.getAttribute('id') || ('form' + (f++));

		let FILLFUNC = function()
		{
			let memberName = this.getAttribute('name');
			if (memberName)
			{
				if (!DOMBlaster.matches(this, ':disabled'))
				{
					let t = this.getAttribute('type');
					let v = t === 'checkbox' || t === 'radio' ? DOMBlaster.matches(this, ':checked') : this.value;
				
					if ('object' === typeof(formData[memberName]))
					{
						formData[memberName].push(v);
					}
					else if (formData[memberName])
					{
						let arr = [formData[memberName], v];
						formData[memberName] = arr;
					}
					else
						formData[memberName] = v;
				}
			}
		};

		dbForm.select('input, textarea, select').each(FILLFUNC);
		if (callback)
			callback(formData);
		else
			out[formId] = formData;
	});

	let objkeys = Object.keys(out);
	
	if (callback)
		return this;
	else if (objkeys.length === 1)
		return out[objkeys[0]];
	else if (objkeys.length === 0)
		return null;
	else
		return out;
});

/**
 * Scrapes a form (each form in collection) for its values and returns an object of the name-value pairings of the form fields,
 * or an object mapping (name/id for key).
 * The 'id' attribute is used if 'name' is not provided. Unnamed form elements are not scraped.
 * @param callback [optional] if provided, call this function with one argument: the data returned.
 * @return an object of the name/value pairings of the form fields, or the selection group if a callback was provided.
 */
DOMBlaster.extendGroup('formData', function(callback) {
	
	if (callback && 'function' !== typeof(callback))
		throw new Error("Callback function for formData must be a function!");
	
	let out = {};
	let f = 0;
	this.each(function()
	{
		let formData = {};
		let dbForm = DOMBlaster(this);
		let formId = this.getAttribute('id') || ('form' + (f++));

		let FILLFUNC = function()
		{
			let memberName = this.getAttribute('name');
			if (memberName)
			{
				if (!DOMBlaster.matches(this, ':disabled'))
				{
					let t = this.getAttribute('type');
					if (t === 'checkbox' && !DOMBlaster.matches(this, ':checked'))
						return;
					if (t === 'radio' && !DOMBlaster.matches(this, ':checked'))
						return;
					
					let v = this.value;
				
					if ('object' === typeof(formData[memberName]))
					{
						formData[memberName].push(v);
					}
					else if (formData[memberName])
					{
						let arr = [formData[memberName], v];
						formData[memberName] = arr;
					}
					else
						formData[memberName] = v;
				}
			}
		};

		dbForm.select('input, textarea, select').each(FILLFUNC);
		if (callback)
			callback(formData);
		else
			out[formId] = formData;
	});

	let objkeys = Object.keys(out);
	
	if (callback)
		return this;
	else if (objkeys.length === 1)
		return out[objkeys[0]];
	else if (objkeys.length === 0)
		return null;
	else
		return out;
});
