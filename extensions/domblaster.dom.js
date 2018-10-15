/****************************************************************************
 * DOMBlaster DOM Structure Extensions by Matt Tropiano (C) 2018
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

	$D.extensions['dom'] = true;

	/************* Globals ***************/
	
	/**
	 * Creates a new element.
	 * @param name (string) the tag name.
	 * @param attribs (Object) object mapping of attributes.
	 * @param children 
	 *		(Element) element/node to add.
	*		(Array) array of elements/nodes to append in order.
	* @return the new element (via document.createElement).
	*/
	$D.element = function(name, attribs, children) {
		let out = document.createElement(name);
		if (attribs) for (let a in attribs) if (attribs.hasOwnProperty(a))
		{
			let attrObj = document.createAttribute(a);
			attrObj.value = attribs[a];
			out.setAttributeNode(attrObj);
		}
		if (children)
		{
			if ($D.isArray(children)) 
			{
				for (let i = 0; i < children.length; i++)
					out.appendChild(children[i]);
			}
			else
				out.appendChild(children);
		}
		return out;
	};

	/**
	 * Creates a new text node for an element.
	 * @param data (string) the text to add.
	 * @return the new text node (via document.createTextNode).
	 */
	$D.text = function(data)
	{
		return document.createTextNode(data);
	};


	/************* Extensions ***************/

	/**
	 * Clears the descendants of an element.
	 */
	$D.extend('clear', function() {
		while (this.firstChild)
			this.removeChild(this.firstChild);
	});

	/**
	 * Appends children to each element (best used with one).
	 * @param children 
	 *		(Element) the element to append.
	*		(Array) the array of children to append in order.
	*/
	$D.extend('append', function(children) {
		if ($D.isArray(children)) 
		{
			for (let i = 0; i < children.length; i++)
				this.appendChild(children[i]);
		}
		else if (children instanceof Document) 
		{
			for (let i = 0; i < children.children.length; i++)
				this.appendChild(children.children[i]);
		}
		else
			this.appendChild(children);
	});

	/**
	 * Clears the descendants of an element and appends new children (best used with one).
	 * @param children 
	 *		(Element) the element to append.
	*		(Array) the array of children to append in order.
	*/
	$D.extend('refill', function(children) {
		let dbThis = $D(this);
		dbThis.clear();
		dbThis.append(children);
	});

	/**
	 * Get an element's child (best used with one).
	 * @return the element's child as a new group.
	 */
	$D.extend('child', function(index) {
		return $D(this.children[index]);
	});

	/**
	 * Get an element's immediate children (best used with one).
	 * @return the element's children as a new group.
	 */
	$D.extend('children', function() {
		return $D(this.children);
	});

	/**
	 * Get an element's parent (best used with one).
	 * @return the element's parent as a new group.
	 */
	$D.extend('parent', function() {
		return $D(this.parentElement);
	});

	/**
	 * Sets the innerHTML on each element.
	 * @param html the HTML to set. if not defined, this returns the innerHTML string.
	 */
	$D.extend('html', function(html) {
		if ($D.isUndefined(html))
			return this.innerHTML;
		else
			this.innerHTML = html;
	});

	const ENTITIES = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'/': '&#x2F;',
		'`': '&#x60;',
		'=': '&#x3D;'
	};
	
	const HTML_SPECIAL = /&|\<|\>|\"|\'|\/|`|=/g;
	
	/**
	 * Sets the inner text on each element (special HTML characters are turned into entities).
	 * @param text the text to set. if not defined, this returns the innerText string.
	 */
	$D.extend('text', function(text) {
		if ($D.isUndefined(text))
			return this.innerText;
		else
			this.innerHTML = text.replace(HTML_SPECIAL, function(m){return ENTITIES[m]});
	});

})(DOMBlaster);
