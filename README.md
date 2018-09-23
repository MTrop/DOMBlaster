# DOMBlaster

Copyright (c) 2018 Matt Tropiano. All rights reserved.

## Notice

This README's Documentation is totally incomplete. Sorry.

## Introduction

DOMBlaster is a minimal, jQuery-like library for browser JavaScript for DOM querying and manipulation.

A simple query can look like:

	$D('body');
	
Which returns a *DOMBlasterGroup* result of the document query.

The `$D` symbol is the shorthand symbol to DOMBlaster created when `domblaster.js` is included. This
is completely equivalent to the previous block of code:

	DOMBlaster('body');

If `$D` got replaced and you wish to restore it, you can restore the previous value of `$D` at the time of
DOMBlaster's inclusion with:

	DOMBlaster.noConflict();


## Documentation

### Main Calls

#### DOMBlaster.noConflict ( )

Restores the previous assigning of `$D` on the global context.


### Utility

#### DOMBlaster.isUndefined ( object )

#### DOMBlaster.isNull ( object )

#### DOMBlaster.isType ( object )

#### DOMBlaster.isNumber ( object )

#### DOMBlaster.isString ( object )

#### DOMBlaster.isArray ( object )

#### DOMBlaster.isFunction ( object )

#### DOMBlaster.isObject ( object )

#### DOMBlaster.isBlank ( object )

#### DOMBlaster.each ( object, function )

#### DOMBlaster.merge ( object, object )

#### DOMBlaster.makeClassMap ( className )

#### DOMBlaster.mergeClassMap ( object )

#### DOMBlaster.nanoTime ( )


## Licensing

This program and the accompanying materials are made available under the terms of the MIT License.
