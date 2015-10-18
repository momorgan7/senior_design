/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*! 
 * Seadragon Ajax 0.8.9 (custom build from source on 2013-01-23 17:05:40.978) 
 * CREATE Lab fork: https://github.com/CMU-CREATE-Lab/seadragon-ajax 
 * http://gallery.expression.microsoft.com/SeadragonAjax 
 * This code is distributed under the license agreement at: 
 * http://go.microsoft.com/fwlink/?LinkId=164943 
 */
 
(function (window, document, Math, undefined) {

// Seadragon.Core.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

if (!window.Seadragon) {
    window.Seadragon = {};
}

// this line overwrites any previous window.Seadragon value in IE before this file
// executes! since this is a global variable, IE does a forward-reference check
// and deletes any global variables which are declared through var. so for now,
// every piece of code that references Seadragon will just have to implicitly
// refer to window.Seadragon and not this global variable Seadragon.
// UPDATE: re-adding this since we're now wrapping all the code in a function.
var Seadragon = window.Seadragon;

// Seadragon.Config.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonConfig = Seadragon.Config;

(function() {
    
    // DUPLICATION CHECK -- necessary to prevent overwriting user changes
    if (SeadragonConfig) {
        return;
    }

    SeadragonConfig = Seadragon.Config = {
        
        debugMode: false,
        
        animationTime: 1.5,
        
        blendTime: 0.5,
        
        alwaysBlend: false,
        
        autoHideControls: true,
        
        constrainDuringPan: true,
        
        immediateRender: false,
        
        logarithmicZoom: true,
        
        wrapHorizontal: false,
        
        wrapVertical: false,
        
        wrapOverlays: false,
        
        transformOverlays: false,
        
        // for backwards compatibility, keeping this around and defaulting to null.
        // if it ever has a non-null value, that means it was explicitly set.
        minZoomDimension: null,
        
        minZoomImageRatio: 0.8,
        
        maxZoomPixelRatio: 2,
        
        visibilityRatio: 0.8,
        
        springStiffness: 5.0,
        
        imageLoaderLimit: 2, 
        
        clickTimeThreshold: 200,
        
        clickDistThreshold: 5,
        
        zoomPerClick: 2.0,
        
        zoomPerScroll: Math.pow(2, 1/3),
        
        zoomPerSecond: 2.0,
        
        proxyUrl: null,
        
        imagePath: "img/"
        
    };

})();

// Seadragon.Strings.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonStrings = Seadragon.Strings;

(function() {

    if (SeadragonStrings) {
        return;     // don't overwrite any strings that may have been added or changed
    }

    SeadragonStrings = Seadragon.Strings = {
        
        Errors: {
            Failure: "Sorry, but Seadragon Ajax can't run on your browser!\n" +
                    "Please try using IE 8 or Firefox 3.\n",
            Dzc: "Sorry, we don't support Deep Zoom Collections!",
            Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Empty: "You asked us to open nothing, so we did just that.",
            ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
            Security: "It looks like a security restriction stopped us from " +
                    "loading this Deep Zoom Image.",
            Status: "This space unintentionally left blank ({0} {1}).",
            Unknown: "Whoops, something inexplicably went wrong. Sorry!"
        },
        
        Messages: {
            Loading: "Loading..."
        },
        
        Tooltips: {
            FullPage: "Toggle full page",
            Home: "Go home",
            ZoomIn: "Zoom in (you can also use your mouse's scroll wheel)",
            ZoomOut: "Zoom out (you can also use your mouse's scroll wheel)"
        }
        
    };

    SeadragonStrings.getString = function(prop) {
        var props = prop.split('.');
        var string = SeadragonStrings;
        
        // get property, which may contain dots, meaning subproperty
        for (var i = 0; i < props.length; i++) {
            string = string[props[i]] || {};    // in case not a subproperty
        }
        
        // in case the string didn't exist
        if (typeof(string) != "string") {
            string = "";
        }
        
        // regular expression and lambda technique from:
        // http://frogsbrain.wordpress.com/2007/04/28/javascript-stringformat-method/#comment-236
        var args = arguments;
        return string.replace(/\{\d+\}/g, function(capture) {
            var i = parseInt(capture.match(/\d+/)) + 1;
            return i < args.length ? args[i] : "";
        });
    };

    SeadragonStrings.setString = function(prop, value) {
        var props = prop.split('.');
        var container = SeadragonStrings;
        
        // get property's container, up to but not after last dot
        for (var i = 0; i < props.length - 1; i++) {
            if (!container[props[i]]) {
                container[props[i]] = {};
            }
            container = container[props[i]];
        }
        
        container[props[i]] = value;
    };

})();

// Seadragon.Debug.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonDebug = function() {
    
    // Methods
    
    this.log = function(msg, important) {
        var console = window.console || {};
        var debug = SeadragonConfig.debugMode;
        
        if (debug && console.log) {
            console.log(msg);
        } else if (debug && important) {
            alert(msg);
        }
    };
    
    this.error = function(msg, e) {
        var console = window.console || {};
        var debug = SeadragonConfig.debugMode;
        
        if (debug && console.error) {
            console.error(msg);
        } else if (debug) {
            alert(msg);
        }
        
        if (debug) {
            // since we're debugging, fail fast by crashing
            throw e || new Error(msg);
        }
    };
    
    this.fail = function(msg) {
        alert(SeadragonStrings.getString("Errors.Failure"));
        throw new Error(msg);
    };
    
};

// Seadragon.Debug is a static class, so make it singleton instance
SeadragonDebug = Seadragon.Debug = new SeadragonDebug();

// Seadragon.Profiler.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonProfiler = Seadragon.Profiler = function() {
    
    // Fields
    
    var self = this;
    
    var midUpdate = false;
    var numUpdates = 0;
    
    var lastBeginTime = null;
    var lastEndTime = null;
    
    var minUpdateTime = Infinity;
    var avgUpdateTime = 0;
    var maxUpdateTime = 0;
    
    var minIdleTime = Infinity;
    var avgIdleTime = 0;
    var maxIdleTime = 0;
    
    // Methods -- UPDATE TIME ACCESSORS
    
    this.getAvgUpdateTime = function() {
        return avgUpdateTime;
    };
    
    this.getMinUpdateTime = function() {
        return minUpdateTime;
    };
    
    this.getMaxUpdateTime = function() {
        return maxUpdateTime;
    };
    
    // Methods -- IDLING TIME ACCESSORS
    
    this.getAvgIdleTime = function() {
        return avgIdleTime;
    };
    
    this.getMinIdleTime = function() {
        return minIdleTime;
    };
    
    this.getMaxIdleTime = function() {
        return maxIdleTime;
    };
    
    // Methods -- GENERAL ACCESSORS 
    
    this.isMidUpdate = function() {
        return midUpdate;
    };
    
    this.getNumUpdates = function() {
        return numUpdates;
    };
    
    // Methods -- MODIFIERS
    
    this.beginUpdate = function() {
        if (midUpdate) {
            self.endUpdate();
        }
        
        midUpdate = true;
        lastBeginTime = new Date().getTime();
        
        if (numUpdates <1) {
            return;     // this is the first update
        }
        
        var time = lastBeginTime - lastEndTime;
        
        avgIdleTime = (avgIdleTime * (numUpdates - 1) + time) / numUpdates;
        
        if (time < minIdleTime) {
            minIdleTime = time;
        }
        if (time > maxIdleTime) {
            maxIdleTime = time;
        }
    };
    
    this.endUpdate = function() {
        if (!midUpdate) {
            return;
        }
        
        lastEndTime = new Date().getTime();
        midUpdate = false;
        
        var time = lastEndTime - lastBeginTime;
        
        numUpdates++;
        avgUpdateTime = (avgUpdateTime * (numUpdates - 1) + time) / numUpdates;
        
        if (time < minUpdateTime) {
            minUpdateTime = time;
        }
        if (time > maxUpdateTime) {
            maxUpdateTime = time;
        }
    };
    
    this.clearProfile = function() {
        midUpdate = false;
        numUpdates = 0;
        
        lastBeginTime = null;
        lastEndTime = null;
        
        minUpdateTime = Infinity;
        avgUpdateTime = 0;
        maxUpdateTime = 0;
        
        minIdleTime = Infinity;
        avgIdleTime = 0;
        maxIdleTime = 0;
    };
    
};

// Seadragon.Point.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonPoint = Seadragon.Point;

(function() {
    
    // preventing duplicate definitions because our code checks instanceof
    // SeadragonPoint, and that breaks if Seadragon.Point is redefined!
    if (SeadragonPoint) {
        return;
    }

    SeadragonPoint = Seadragon.Point = function(x, y) {
        
        // Properties
        
        this.x = typeof(x) == "number" ? x : 0;
        this.y = typeof(y) == "number" ? y : 0;
        
    };

    // Methods
    
    var SDPointPrototype = SeadragonPoint.prototype;

    SDPointPrototype.plus = function(point) {
        return new SeadragonPoint(this.x + point.x, this.y + point.y);
    };

    SDPointPrototype.minus = function(point) {
        return new SeadragonPoint(this.x - point.x, this.y - point.y);
    };

    SDPointPrototype.times = function(factor) {
        return new SeadragonPoint(this.x * factor, this.y * factor);
    };

    SDPointPrototype.divide = function(factor) {
        return new SeadragonPoint(this.x / factor, this.y / factor);
    };

    SDPointPrototype.negate = function() {
        return new SeadragonPoint(-this.x, -this.y);
    };

    SDPointPrototype.distanceTo = function(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) +
                        Math.pow(this.y - point.y, 2));
    };

    SDPointPrototype.apply = function(func) {
        return new SeadragonPoint(func(this.x), func(this.y));
    };

    SDPointPrototype.equals = function(point) {
        return (point instanceof SeadragonPoint) &&
                (this.x === point.x) && (this.y === point.y);
    };

    SDPointPrototype.toString = function() {
        return "(" + this.x + "," + this.y + ")";
    };

})();

// Seadragon.Rect.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonRect = Seadragon.Rect;

(function () {
    
    // preventing duplicate definitions because our code checks instanceof
    // SeadragonRect, and that breaks if Seadragon.Rect is redefined!
    if (SeadragonRect) {
        return;
    }

    SeadragonRect = Seadragon.Rect = function(x, y, width, height) {
        
        // Properties
        
        this.x = typeof(x) == "number" ? x : 0;
        this.y = typeof(y) == "number" ? y : 0;
        this.width = typeof(width) == "number" ? width : 0;
        this.height = typeof(height) == "number" ? height : 0;

    };
    
    // Methods
    
    var SDRectPrototype = SeadragonRect.prototype;
    
    SDRectPrototype.getAspectRatio = function() {
        return this.width / this.height;
    };
    
    SDRectPrototype.getTopLeft = function() {
        return new SeadragonPoint(this.x, this.y);
    };
    
    SDRectPrototype.getBottomRight = function() {
        return new SeadragonPoint(this.x + this.width, this.y + this.height);
    };
    
    SDRectPrototype.getCenter = function() {
        return new SeadragonPoint(this.x + this.width / 2.0,
                        this.y + this.height / 2.0);
    };
    
    SDRectPrototype.getSize = function() {
        return new SeadragonPoint(this.width, this.height);
    };
    
    SDRectPrototype.equals = function(other) {
        return (other instanceof SeadragonRect) &&
                (this.x === other.x) && (this.y === other.y) &&
                (this.width === other.width) && (this.height === other.height);
    };
    
    SDRectPrototype.toString = function() {
        return "[" + this.x + "," + this.y + "," + this.width + "x" +
                this.height + "]";
    };

})();

// Seadragon.Spring.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonSpring = Seadragon.Spring = function(initialValue) {
    
    // Fields
    
    var currentValue = typeof(initialValue) == "number" ? initialValue : 0;
    var startValue = currentValue;
    var targetValue = currentValue;
    
    var currentTime = new Date().getTime(); // always work in milliseconds
    var startTime = currentTime;
    var targetTime = currentTime;
    
    // Helpers
    
    /**
     * Transform from linear [0,1] to spring [0,1].
     */
    function transform(x) {
        var s = SeadragonConfig.springStiffness;
        return (1.0 - Math.exp(-x * s)) / (1.0 - Math.exp(-s));
    }
    
    // Methods
    
    this.getCurrent = function() {
        return currentValue;
    };
    
    this.getTarget = function() {
        return targetValue;
    };
    
    this.resetTo = function(target) {
        targetValue = target;
        targetTime = currentTime;
        startValue = targetValue;
        startTime = targetTime;
    };
    
    this.springTo = function(target) {
        startValue = currentValue;
        startTime = currentTime;
        targetValue = target;
        targetTime = startTime + 1000 * SeadragonConfig.animationTime;
    };
    
    this.shiftBy = function(delta) {
        startValue += delta;
        targetValue += delta;
    };
    
    this.update = function() {
        currentTime = new Date().getTime();
        currentValue = (currentTime >= targetTime) ? targetValue :
                startValue + (targetValue - startValue) *
                transform((currentTime - startTime) / (targetTime - startTime));
    };
    
};

// Seadragon.Utils.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonBrowser = Seadragon.Browser = {
    UNKNOWN: 0,
    IE: 1,
    FIREFOX: 2,
    SAFARI: 3,
    CHROME: 4,
    OPERA: 5
};

var SeadragonUtils = function() {
    
    // Fields
    
    var self = this;
    
    var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];
    var supportedImageFormats = {
        "bmp": false,
        "jpeg": true,
        "jpg": true,
        "png": true,
        "tif": false,
        "wdp": false
    };
    
    var browser = SeadragonBrowser.UNKNOWN;
    var browserVersion = 0;
    var badAlphaBrowser = false;    // updated in constructor
    
    var urlParams = {};
    
    // Constructor
    
    (function() {
        
        // Browser detect
        
        var app = navigator.appName;
        var ver = navigator.appVersion;
        var ua = navigator.userAgent;
        
        if (app == "Microsoft Internet Explorer" &&
                !!window.attachEvent && !!window.ActiveXObject) {
            
            var ieOffset = ua.indexOf("MSIE");
            browser = SeadragonBrowser.IE;
            browserVersion = parseFloat(
                    ua.substring(ieOffset + 5, ua.indexOf(";", ieOffset)));
            
            // update: for intranet sites and compat view list sites, IE sends
            // an IE7 User-Agent to the server to be interoperable, and even if
            // the page requests a later IE version, IE will still report the
            // IE7 UA to JS. we should be robust to this.
            var docMode = document.documentMode;
            if (typeof docMode !== "undefined") {
                browserVersion = docMode;
            }
            
        } else if (app == "Netscape" && !!window.addEventListener) {
            
            var ffOffset = ua.indexOf("Firefox");
            var saOffset = ua.indexOf("Safari");
            var chOffset = ua.indexOf("Chrome");
            
            if (ffOffset >= 0) {
                browser = SeadragonBrowser.FIREFOX;
                browserVersion = parseFloat(ua.substring(ffOffset + 8));
            } else if (saOffset >= 0) {
                var slash = ua.substring(0, saOffset).lastIndexOf("/");
                browser = (chOffset >= 0) ? SeadragonBrowser.CHROME : SeadragonBrowser.SAFARI;
                browserVersion = parseFloat(ua.substring(slash + 1, saOffset));
            }
            
        } else if (app == "Opera" && !!window.opera && !!window.attachEvent) {
            
            browser = SeadragonBrowser.OPERA;
            browserVersion = parseFloat(ver);
            
        }
        
        // Url parameters
        
        var query = window.location.search.substring(1);    // ignore '?'
        var parts = query.split('&');
        
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            var sep = part.indexOf('=');
            
            if (sep > 0) {
                urlParams[part.substring(0, sep)] =
                        decodeURIComponent(part.substring(sep + 1));
            }
        }
        
        // Browser behaviors
        
        // update: chrome 2 no longer has this problem! and now same with IE9!
        badAlphaBrowser =
                (browser == SeadragonBrowser.IE && browserVersion < 9) ||
                (browser == SeadragonBrowser.CHROME && browserVersion < 2);
        
    })();
    
    // Helpers
    
    function getOffsetParent(elmt, isFixed) {
        // IE and Opera "fixed" position elements don't have offset parents.
        // regardless, if it's fixed, its offset parent is the body.
        if (isFixed && elmt != document.body) {
            return document.body;
        } else {
            return elmt.offsetParent;
        }
    }
    
    // Methods
    
    this.getBrowser = function() {
        return browser;
    };
    
    this.getBrowserVersion = function() {
        return browserVersion;
    };
    
    this.getElement = function(elmt) {
        if (typeof(elmt) == "string") {
            elmt = document.getElementById(elmt);
        }
        
        return elmt;
    };
    
    this.getElementPosition = function(elmt) {
        var elmt = self.getElement(elmt);
        var result = new SeadragonPoint();
        
        // technique from:
        // http://www.quirksmode.org/js/findpos.html
        // with special check for "fixed" elements.
        
        var isFixed = self.getElementStyle(elmt).position == "fixed";
        var offsetParent = getOffsetParent(elmt, isFixed);
        
        while (offsetParent) {
            result.x += elmt.offsetLeft;
            result.y += elmt.offsetTop;
            
            if (isFixed) {
                result = result.plus(self.getPageScroll());
            }
            
            elmt = offsetParent;
            isFixed = self.getElementStyle(elmt).position == "fixed";
            offsetParent = getOffsetParent(elmt, isFixed);
        }
        
        return result;
    };
    
    this.getElementSize = function(elmt) {
        var elmt = self.getElement(elmt);
        return new SeadragonPoint(elmt.clientWidth, elmt.clientHeight);
    };
    
    this.getElementStyle = function(elmt) {
        var elmt = self.getElement(elmt);
        
        if (elmt.currentStyle) {
            return elmt.currentStyle;
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(elmt, "");
        } else {
            SeadragonDebug.fail("Unknown element style, no known technique.");
        }
    };
    
    this.getEvent = function(event) {
        return event ? event : window.event;
    };
    
    this.getMousePosition = function(event) {
        var event = self.getEvent(event);
        var result = new SeadragonPoint();
        
        // technique from:
        // http://www.quirksmode.org/js/events_properties.html
        
        if (event.type == "DOMMouseScroll" &&
                browser == SeadragonBrowser.FIREFOX && browserVersion < 3) {
            // hack for FF2 which reports incorrect position for mouse scroll
            result.x = event.screenX;
            result.y = event.screenY;
        } else if (typeof(event.pageX) == "number") {
           result.x = event.pageX;
            result.y = event.pageY;
        } else if (typeof(event.clientX) == "number") {
            result.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            result.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        } else {
            SeadragonDebug.fail("Unknown event mouse position, no known technique.");
        }
        
        return result;
    };
    
    this.getMouseScroll = function(event) {
        var event = self.getEvent(event);
        var delta = 0; // default value
        
        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/10/31/javascript-tutorial-the-scroll-wheel/
        
        if (typeof(event.wheelDelta) == "number") {
            delta = event.wheelDelta;
        } else if (typeof(event.detail) == "number") {
            delta = event.detail * -1;
        } else {
            SeadragonDebug.fail("Unknown event mouse scroll, no known technique.");
        }
        
        // normalize value to [-1, 1]
        return delta ? delta / Math.abs(delta) : 0;
    };
    
    this.getPageScroll = function() {
        var result = new SeadragonPoint();
        var docElmt = document.documentElement || {};
        var body = document.body || {};
        
        // technique from:
        // http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
        
        if (typeof(window.pageXOffset) == "number") {
            // most browsers
            result.x = window.pageXOffset;
            result.y = window.pageYOffset;
        } else if (body.scrollLeft || body.scrollTop) {
            // W3C spec, IE6+ in quirks mode
            result.x = body.scrollLeft;
            result.y = body.scrollTop;
        } else if (docElmt.scrollLeft || docElmt.scrollTop) {
            // IE6+ in standards mode
            result.x = docElmt.scrollLeft;
            result.y = docElmt.scrollTop;
        }
        
        // note: we specifically aren't testing for typeof here, because IE sets
        // the appropriate variables undefined instead of 0 under certain
        // conditions. this means we also shouldn't fail if none of the three
        // cases are hit; we'll just assume the page scroll is 0.
        
        return result;
    };
    
    this.getWindowSize = function() {
        var result = new SeadragonPoint();
        var docElmt = document.documentElement || {};
        var body = document.body || {};
        
        // technique from:
        // http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
        
        // important: i originally cleaned up the second and third IE checks to
        // check if the typeof was number. but this fails for quirks mode,
        // because docElmt.clientWidth is indeed a number, but it's incorrectly
        // zero. so no longer checking typeof is number for those cases.
        
        if (typeof(window.innerWidth) == 'number') {
            // non-IE browsers
            result.x = window.innerWidth;
            result.y = window.innerHeight;
        } else if (docElmt.clientWidth || docElmt.clientHeight) {
            // IE6+ in standards mode
            result.x = docElmt.clientWidth;
            result.y = docElmt.clientHeight;
        } else if (body.clientWidth || body.clientHeight) {
            // IE6+ in quirks mode
            result.x = body.clientWidth;
            result.y = body.clientHeight;
        } else {
            SeadragonDebug.fail("Unknown window size, no known technique.");
        }
        
        return result;
    };
    
    this.imageFormatSupported = function(ext) {
        var ext = ext ? ext : "";
        return !!supportedImageFormats[ext.toLowerCase()];
    };
    
    this.makeCenteredNode = function(elmt) {
        var elmt = SeadragonUtils.getElement(elmt);
        var div = self.makeNeutralElement("div");
        var html = [];
        
        // technique for vertically centering (in IE!!!) from:
        // http://www.jakpsatweb.cz/css/css-vertical-center-solution.html
        // with explicit neutralizing of styles added by me.
        html.push('<div style="display:table; height:100%; width:100%;');
        html.push('border:none; margin:0px; padding:0px;'); // neutralizing
        html.push('#position:relative; overflow:hidden; text-align:left;">');
            // the text-align:left guards against incorrect centering in IE
        html.push('<div style="#position:absolute; #top:50%; width:100%; ');
        html.push('border:none; margin:0px; padding:0px;'); // neutralizing
        html.push('display:table-cell; vertical-align:middle;">');
        html.push('<div style="#position:relative; #top:-50%; width:100%; ');
        html.push('border:none; margin:0px; padding:0px;'); // neutralizing
        html.push('text-align:center;"></div></div></div>');
        
        div.innerHTML = html.join('');
        div = div.firstChild;
        
        // now add the element as a child to the inner-most div
        var innerDiv = div;
        var innerDivs = div.getElementsByTagName("div");
        while (innerDivs.length > 0) {
            innerDiv = innerDivs[0];
            innerDivs = innerDiv.getElementsByTagName("div");
        }
        
        innerDiv.appendChild(elmt);
        
        return div;
    };
    
    this.makeNeutralElement = function(tagName) {
        var elmt = document.createElement(tagName);
        var style = elmt.style;
        
        // TODO reset neutral element's style in a better way
        style.background = "transparent none";
        style.border = "none";
        style.margin = "0px";
        style.padding = "0px";
        style.position = "static";
        
        return elmt;
    };
    
    this.makeTransparentImage = function(src) {
        var img = self.makeNeutralElement("img");
        var elmt = null;
        
        if (browser == SeadragonBrowser.IE && browserVersion < 7) {
            elmt = self.makeNeutralElement("span");
            elmt.style.display = "inline-block";
            
            // to size span correctly, load image and get natural size,
            // but don't override any user-set CSS values
            img.onload = function() {
                elmt.style.width = elmt.style.width || img.width + "px";
                elmt.style.height = elmt.style.height || img.height + "px";
                
                img.onload = null;
                img = null;     // to prevent memory leaks in IE
            };
            
            img.src = src;
            elmt.style.filter =
                    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
                    src + "', sizingMethod='scale')";
        } else {
            elmt = img;
            elmt.src = src;
        }
        
        return elmt;
    };
    
    this.setElementOpacity = function(elmt, opacity, usesAlpha) {
        var elmt = self.getElement(elmt);
        
        if (usesAlpha && badAlphaBrowser) {
            // images with alpha channels won't fade well, so round
            opacity = Math.round(opacity);
        }
        
        // for CSS opacity browsers, remove opacity value if it's unnecessary
        if (opacity < 1) {
            elmt.style.opacity = opacity;
        } else {
            elmt.style.opacity = "";
        }
        
        // for CSS filter browsers (IE), remove alpha filter if it's unnecessary.
        // update: doing this always since IE9 beta seems to have broken the
        // behavior if we rely on the programmatic filters collection.
        var prevFilter = elmt.style.filter || "";
        elmt.style.filter = prevFilter.replace(/[\s]*alpha\(.*?\)[\s]*/g, "");
                // important: note the lazy star! this protects against
                // multiple filters; we don't want to delete the other ones.
                // update: also trimming extra whitespace around filter.
        
        if (opacity >= 1) {
            return;
        }
        
        var ieOpacity = Math.round(100 * opacity);
        var ieFilter = " alpha(opacity=" + ieOpacity + ") ";
        
        elmt.style.filter += ieFilter;
        
        // old way -- seems to have broken in IE9's compatibiliy mode:
        // check if this element has filters associated with it (IE only),
        // but prevent bug where IE throws error "Member not found" sometimes.
        //try {
        //    if (elmt.filters && elmt.filters.alpha) {
        //        elmt.filters.alpha.opacity = ieOpacity;
        //    } else {
        //        elmt.style.filter += ieFilter;
        //    }
        //} catch (e) {
        //    elmt.style.filter += ieFilter;
        //}
    };
    
    this.addEvent = function(elmt, eventName, handler, useCapture) {
        var elmt = self.getElement(elmt);
        
        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/
        
        if (elmt.addEventListener) {
            if (eventName == "mousewheel") {
                elmt.addEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to add the mousewheel -- not a mistake!
            // this is for opera, since it uses onmousewheel but needs addEventListener.
            elmt.addEventListener(eventName, handler, useCapture);
        } else if (elmt.attachEvent) {
            elmt.attachEvent("on" + eventName, handler);
            if (useCapture && elmt.setCapture) {
                elmt.setCapture();
            }
        } else {
            SeadragonDebug.fail("Unable to attach event handler, no known technique.");
        }
    };
    
    this.removeEvent = function(elmt, eventName, handler, useCapture) {
        var elmt = self.getElement(elmt);
        
        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/
        
        if (elmt.removeEventListener) {
            if (eventName == "mousewheel") {
                elmt.removeEventListener("DOMMouseScroll", handler, useCapture);
            }
            // we are still going to remove the mousewheel -- not a mistake!
            // this is for opera, since it uses onmousewheel but needs removeEventListener.
            elmt.removeEventListener(eventName, handler, useCapture);
        } else if (elmt.detachEvent) {
            elmt.detachEvent("on" + eventName, handler);
            if (useCapture && elmt.releaseCapture) {
                elmt.releaseCapture();
            }
        } else {
            SeadragonDebug.fail("Unable to detach event handler, no known technique.");
        }
    };
    
    this.cancelEvent = function(event) {
        var event = self.getEvent(event);
        
        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/
        
        if (event.preventDefault) {
            event.preventDefault();     // W3C for preventing default
        }
        
        event.cancel = true;            // legacy for preventing default
        event.returnValue = false;      // IE for preventing default
    };
    
    this.stopEvent = function(event) {
        var event = self.getEvent(event);
        
        // technique from:
        // http://blog.paranoidferret.com/index.php/2007/08/10/javascript-working-with-events/
        
        if (event.stopPropagation) {
            event.stopPropagation();    // W3C for stopping propagation
        }
        
        event.cancelBubble = true;      // IE for stopping propagation
    };
    
    this.createCallback = function(object, method) {
        // create callback args
        var initialArgs = [];
        for (var i = 2; i < arguments.length; i++) {
            initialArgs.push(arguments[i]);
        }
        
        // create closure to apply method
        return function() {
            // concatenate new args, but make a copy of initialArgs first
            var args = initialArgs.concat([]);
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            
            return method.apply(object, args);
        };
    };
    
    this.getUrlParameter = function(key) {
        var value = urlParams[key];
        return value ? value : null;
    };
    
    this.makeAjaxRequest = function(url, callback) {
        var async = typeof(callback) == "function";
        var req = null;
        
        if (async) {
            var actual = callback;
            var callback = function() {
                window.setTimeout(SeadragonUtils.createCallback(null, actual, req), 1);
            };
        }
        
        if (window.ActiveXObject) {
            for (var i = 0; i < arrActiveX.length; i++) {
                try {
                    req = new ActiveXObject(arrActiveX[i]);
                    break;
                } catch (e) {
                    continue;
                }
            }
        } else if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        }
        
        if (!req) {
            SeadragonDebug.fail("Browser doesn't support XMLHttpRequest.");
        }
        
        // Proxy support
        if (SeadragonConfig.proxyUrl) {
            url = SeadragonConfig.proxyUrl + url;
        }
        
        if (async) {
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    // prevent memory leaks by breaking circular reference now
                    req.onreadystatechange = new Function();
                    callback();
                }
            };
        }
        
        try {
            req.open("GET", url, async);
            req.send(null);
        } catch (e) {
            SeadragonDebug.log(e.name + " while making AJAX request: " + e.message);
            
            req.onreadystatechange = null;
            req = null;
            
            if (async) {
                callback();
            }
        }
        
        return async ? null : req;
    };
    
    this.parseXml = function(string) {
        var xmlDoc = null;
        
        if (window.ActiveXObject) {
            try {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(string);
            } catch (e) {
                SeadragonDebug.log(e.name + " while parsing XML (ActiveX): " + e.message);
            }
        } else if (window.DOMParser) {
            try {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(string, "text/xml");
            } catch (e) {
                SeadragonDebug.log(e.name + " while parsing XML (DOMParser): " + e.message);
            }
        } else {
            SeadragonDebug.fail("Browser doesn't support XML DOM.");
        }
        
        return xmlDoc;
    };
    
};

// Seadragon.Utils is a static class, so make it singleton instance
SeadragonUtils = Seadragon.Utils = new SeadragonUtils();

// Seadragon.MouseTracker.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonMouseTracker = Seadragon.MouseTracker;

(function() {
    
    // DUPLICATION CHECK -- necessary here because of private static state
    if (SeadragonMouseTracker) {
        return;
    }
    
    // Constants
    
    // update: IE9 implements the W3C standard event model! =)
    var lteIE8 = SeadragonUtils.getBrowser() == SeadragonBrowser.IE &&
        SeadragonUtils.getBrowserVersion() < 9;
    
    // Static fields
    
    var buttonDownAny = false;
    
    var ieCapturingAny = false;
    var ieTrackersActive = {};      // dictionary from hash to MouseTracker
    var ieTrackersCapturing = [];   // list of trackers interested in capture
    
    // Static helpers
    
    function getMouseAbsolute(event) {
        return SeadragonUtils.getMousePosition(event);
    }
    
    function getMouseRelative(event, elmt) {
        var mouse = SeadragonUtils.getMousePosition(event);
        var offset = SeadragonUtils.getElementPosition(elmt);
        
        return mouse.minus(offset);
    }
    
    /**
     * Returns true if elmtB is a child node of elmtA, or if they're equal.
     */
    function isChild(elmtA, elmtB) {
        var body = document.body;
        while (elmtB && elmtA != elmtB && body != elmtB) {
            try {
                elmtB = elmtB.parentNode;
            } catch (e) {
                // Firefox sometimes fires events for XUL elements, which throws
                // a "permission denied" error. so this is not a child.
                return false;
            }
        }
        return elmtA == elmtB;
    }
    
    function onGlobalMouseDown() {
        buttonDownAny = true;
    }
    
    function onGlobalMouseUp() {
        buttonDownAny = false;
    }
    
    // Static constructor
    
    (function () {
        // the W3C event model lets us listen to the capture phase of events, so
        // to know if the mouse is globally up or down, we'll listen to the
        // capture phase of the window's events. we can't do this in IE, so
        // we'll give it a best effort by listening to the regular bubble phase,
        // and on the document since window isn't legal in IE for mouse events.
        if (lteIE8) {
            SeadragonUtils.addEvent(document, "mousedown", onGlobalMouseDown, false);
            SeadragonUtils.addEvent(document, "mouseup", onGlobalMouseUp, false);
        } else {
            SeadragonUtils.addEvent(window, "mousedown", onGlobalMouseDown, true);
            SeadragonUtils.addEvent(window, "mouseup", onGlobalMouseUp, true);
        }
    })();
    
    // Class
    
    SeadragonMouseTracker = Seadragon.MouseTracker = function(elmt) {
        
        // Fields
        
        var self = this;
        var ieSelf = null;
        
        var hash = Math.random();     // a unique hash for this tracker
        var elmt = SeadragonUtils.getElement(elmt);
        
        var tracking = false;
        var capturing = false;
        var buttonDownElmt = false;
        var insideElmt = false;
        
        var lastPoint = null;           // position of last mouse down/move
        var lastMouseDownTime = null;   // time of last mouse down
        var lastMouseDownPoint = null;  // position of last mouse down
        
        // Properties
        
        this.target = elmt;
        this.enterHandler = null;       // function(tracker, position, buttonDownElmt, buttonDownAny)
        this.exitHandler = null;        // function(tracker, position, buttonDownElmt, buttonDownAny)
        this.pressHandler = null;       // function(tracker, position)
        this.releaseHandler = null;     // function(tracker, position, insideElmtPress, insideElmtRelease)
        this.clickHandler = null;       // function(tracker, position, quick, shift)
        this.dragHandler = null;        // function(tracker, position, delta, shift)
        this.scrollHandler = null;      // function(tracker, position, scroll, shift)
        
        // Helpers
        
        function startTracking() {
            if (!tracking) {
                SeadragonUtils.addEvent(elmt, "mouseover", onMouseOver, false);
                SeadragonUtils.addEvent(elmt, "mouseout", onMouseOut, false);
                SeadragonUtils.addEvent(elmt, "mousedown", onMouseDown, false);
                SeadragonUtils.addEvent(elmt, "mouseup", onMouseUp, false);
                SeadragonUtils.addEvent(elmt, "mousewheel", onMouseScroll, false);
                SeadragonUtils.addEvent(elmt, "click", onMouseClick, false);
                
                tracking = true;
                ieTrackersActive[hash] = ieSelf;
            }
        }
        
        function stopTracking() {
            if (tracking) {
                SeadragonUtils.removeEvent(elmt, "mouseover", onMouseOver, false);
                SeadragonUtils.removeEvent(elmt, "mouseout", onMouseOut, false);
                SeadragonUtils.removeEvent(elmt, "mousedown", onMouseDown, false);
                SeadragonUtils.removeEvent(elmt, "mouseup", onMouseUp, false);
                SeadragonUtils.removeEvent(elmt, "mousewheel", onMouseScroll, false);
                SeadragonUtils.removeEvent(elmt, "click", onMouseClick, false);
                
                releaseMouse();
                tracking = false;
                delete ieTrackersActive[hash];
            }
        }
        
        function captureMouse() {
            if (!capturing) {
                // IE lets the element capture the mouse directly, but other
                // browsers use the capture phase on the highest element.
                if (lteIE8) {
                    // we need to capture the mouse, but we also don't want to
                    // handle mouseup like normally (special case for bubbling)
                    SeadragonUtils.removeEvent(elmt, "mouseup", onMouseUp, false);
                    SeadragonUtils.addEvent(elmt, "mouseup", onMouseUpIE, true);
                    SeadragonUtils.addEvent(elmt, "mousemove", onMouseMoveIE, true);
                } else {
                    SeadragonUtils.addEvent(window, "mouseup", onMouseUpWindow, true);
                    SeadragonUtils.addEvent(window, "mousemove", onMouseMove, true);
                }
                
                capturing = true;
            }
        }
        
        function releaseMouse() {
            if (capturing) {
                // similar reasoning as captureMouse()
                if (lteIE8) {
                    // we need to release the mouse, and also go back to handling
                    // mouseup like normal (no longer a hack for capture phase)
                    SeadragonUtils.removeEvent(elmt, "mousemove", onMouseMoveIE, true);
                    SeadragonUtils.removeEvent(elmt, "mouseup", onMouseUpIE, true);
                    SeadragonUtils.addEvent(elmt, "mouseup", onMouseUp, false);
                } else {
                    SeadragonUtils.removeEvent(window, "mousemove", onMouseMove, true);
                    SeadragonUtils.removeEvent(window, "mouseup", onMouseUpWindow, true);
                }
                
                capturing = false;
            }
        }
        
        // IE-specific helpers
        
        function triggerOthers(eventName, event) {
            // update: protecting against properties added to the Object class's
            // prototype, which can and does happen (e.g. through js libraries)
            var trackers = ieTrackersActive;
            for (var otherHash in trackers) {
                if (trackers.hasOwnProperty(otherHash) && hash != otherHash) {
                    trackers[otherHash][eventName](event);
                }
            }
        }
        
        function hasMouse() {
            return insideElmt;
        }
        
        // Listeners
        
        function onMouseOver(event) {
            var event = SeadragonUtils.getEvent(event);
            
            // IE capturing model doesn't raise or bubble the events on any
            // other element if we're capturing currently. so pass this event to
            // other elements being tracked so they can adjust if the element
            // was from them or from a child. however, IE seems to always fire
            // events originating from parents to those parents, so don't double
            // fire the event if the event originated from a parent.
            if (lteIE8 && capturing && !isChild(event.srcElement, elmt)) {
                triggerOthers("onMouseOver", event);
            }
            
            // similar to onMouseOut() tricky bubbling case...
            var to = event.target ? event.target : event.srcElement;
            var from = event.relatedTarget ? event.relatedTarget : event.fromElement;
            if (!isChild(elmt, to) || isChild(elmt, from)) {
                // the mouseover needs to end on this or a child node, and it
                // needs to start from this or an outer node.
                return;
            }
            
            insideElmt = true;
           
            if (typeof(self.enterHandler) == "function") {
                try {
                    self.enterHandler(self, getMouseRelative(event, elmt),
                            buttonDownElmt, buttonDownAny);
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing enter handler: " + e.message, e);
                }
            }
        }
        
        function onMouseOut(event) {
            var event = SeadragonUtils.getEvent(event);
            
            // similar to onMouseOver() case for IE capture model
            if (lteIE8 && capturing && !isChild(event.srcElement, elmt)) {
                triggerOthers("onMouseOut", event);
            }
            
            // we have to watch out for a tricky case: a mouseout occurs on a
            // child element, but the mouse is still inside the parent element.
            // the mouseout event will bubble up to us. this happens in all
            // browsers, so we need to correct for this. technique from:
            // http://www.quirksmode.org/js/events_mouse.html
            var from = event.target ? event.target : event.srcElement;
            var to = event.relatedTarget ? event.relatedTarget : event.toElement;
            if (!isChild(elmt, from) || isChild(elmt, to)) {
                // the mouseout needs to start from this or a child node, and it
                // needs to end on this or an outer node.
                return;
            }
            
            insideElmt = false;
            
            if (typeof(self.exitHandler) == "function") {
                try {
                    self.exitHandler(self, getMouseRelative(event, elmt),
                            buttonDownElmt, buttonDownAny);
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing exit handler: " + e.message, e);
                }
            }
        }
        
        function onMouseDown(event) {
            var event = SeadragonUtils.getEvent(event);
            
            // don't consider right-clicks (fortunately this is cross-browser)
            if (event.button == 2) {
                return;
            }
            
            buttonDownElmt = true;
            
            lastPoint = getMouseAbsolute(event);
            lastMouseDownPoint = lastPoint;
            lastMouseDownTime = new Date().getTime();
            
           if (typeof(self.pressHandler) == "function") {
                try {
                    self.pressHandler(self, getMouseRelative(event, elmt));
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing press handler: " + e.message, e);
                }
            }
            
            if (self.pressHandler || self.dragHandler) {
                // if a press or drag handler is registered, don't drag-drop images, etc.
                SeadragonUtils.cancelEvent(event);
            }
            
            if (!lteIE8 || !ieCapturingAny) {
                captureMouse();
                ieCapturingAny = true;
                ieTrackersCapturing = [ieSelf];     // reset to empty & add us
            } else if (lteIE8) {
                ieTrackersCapturing.push(ieSelf);   // add us to the list
            }
        }
        
        function onMouseUp(event) {
            var event = SeadragonUtils.getEvent(event);
            var insideElmtPress = buttonDownElmt;
            var insideElmtRelease = insideElmt;
            
            // don't consider right-clicks (fortunately this is cross-browser)
            if (event.button == 2) {
                return;
            }
            
            buttonDownElmt = false;
            
            if (typeof(self.releaseHandler) == "function") {
                try {
                    self.releaseHandler(self, getMouseRelative(event, elmt),
                            insideElmtPress, insideElmtRelease);
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing release handler: " + e.message, e);
                }
            }
            
            // some browsers sometimes don't fire click events when we're also
            // listening for mouseup events. i'm not sure why, it could be
            // something i'm doing. in the meantime, this is a temporary fix.
            if (insideElmtPress && insideElmtRelease) {
                handleMouseClick(event);
            }
        }
        
        /**
         * Only triggered once by the deepest element that initially received
         * the mouse down event. We want to make sure THIS event doesn't bubble.
         * Instead, we want to trigger the elements that initially received the
         * mouse down event (including this one) only if the mouse is no longer
         * inside them. Then, we want to release capture, and emulate a regular
         * mouseup on the event that this event was meant for.
         */
        function onMouseUpIE(event) {
            var event = SeadragonUtils.getEvent(event);
            
            // don't consider right-clicks (fortunately this is cross-browser)
            if (event.button == 2) {
                return;
            }
            
            // first trigger those that were capturing
            for (var i = 0; i < ieTrackersCapturing.length; i++) {
                var tracker = ieTrackersCapturing[i];
                if (!tracker.hasMouse()) {
                    tracker.onMouseUp(event);
                }
            }
            
            // then release capture and emulate a regular event
            releaseMouse();
            ieCapturingAny = false;
            event.srcElement.fireEvent("on" + event.type,
                    document.createEventObject(event));
            
            // make sure to stop this event -- shouldn't bubble up
            SeadragonUtils.stopEvent(event);
        }
        
        /**
         * Only triggered in W3C browsers by elements within which the mouse was
         * initially pressed, since they are now listening to the window for
         * mouseup during the capture phase. We shouldn't handle the mouseup
         * here if the mouse is still inside this element, since the regular
         * mouseup handler will still fire.
         */
        function onMouseUpWindow(event) {
            if (!insideElmt) {
                onMouseUp(event);
            }
            
            releaseMouse();
        }
        
        function onMouseClick(event) {
            // see onMouseUp() bug -- handleClick() is already called by
            // onMouseUp() as a temporary fix, so don't duplicate the call here.
            
            if (self.clickHandler) {                
                // since a click handler was registered, don't follow href's, etc.
                SeadragonUtils.cancelEvent(event);
            }
        }
        
        function handleMouseClick(event) {
            var event = SeadragonUtils.getEvent(event);
            
            // don't consider right-clicks (fortunately this is cross-browser)
            if (event.button == 2) {
                return;
            }
            
            var time = new Date().getTime() - lastMouseDownTime;
            var point = getMouseAbsolute(event);
            var distance = lastMouseDownPoint.distanceTo(point);
            var quick = time <= SeadragonConfig.clickTimeThreshold &&
                    distance <= SeadragonConfig.clickDistThreshold;
            
            if (typeof(self.clickHandler) == "function") {
                try {
                    self.clickHandler(self, getMouseRelative(event, elmt),
                            quick, event.shiftKey);
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing click handler: " + e.message, e);
                }
            }
        }
        
        function onMouseMove(event) {
            var event = SeadragonUtils.getEvent(event);
            var point = getMouseAbsolute(event);
            var delta = point.minus(lastPoint);
            
            lastPoint = point;
            
            if (typeof(self.dragHandler) == "function") {
                try {
                    self.dragHandler(self, getMouseRelative(event, elmt),
                            delta, event.shiftKey);
                } catch (e) {
                    // handler threw an error, ignore
                    SeadragonDebug.error(e.name +
                            " while executing drag handler: " + e.message, e);
                }
                
                // since a drag handler was registered, don't allow highlighting, etc.
                SeadragonUtils.cancelEvent(event);
            }
        }
        
        /**
         * Only triggered once by the deepest element that initially received
         * the mouse down event. Since no other element has captured the mouse,
         * we want to trigger the elements that initially received the mouse
         * down event (including this one).
         */
        function onMouseMoveIE(event) {
            // manually trigger those that are capturing
            for (var i = 0; i < ieTrackersCapturing.length; i++) {
                ieTrackersCapturing[i].onMouseMove(event);
            }
            
            // make sure to stop this event -- shouldn't bubble up. note that at
            // the time of this writing, there is no harm in letting it bubble,
            // but a minor change to our implementation would necessitate this.
            SeadragonUtils.stopEvent(event);
        }
        
        function onMouseScroll(event) {
            var event = SeadragonUtils.getEvent(event);
            var delta = SeadragonUtils.getMouseScroll(event);
            
            if (typeof(self.scrollHandler) == "function") {
                // FF2 and FF3/Mac (possibly others) seem to sometimes fire
                // extraneous scroll events. check for those.
                if (delta) {
                    try {
                        self.scrollHandler(self, getMouseRelative(event, elmt),
                                delta, event.shiftKey);
                    } catch (e) {
                        // handler threw an error, ignore
                        SeadragonDebug.error(e.name +
                                " while executing scroll handler: " + e.message, e);
                    }
                }
                
                // since a scroll handler was registered, don't scroll the page, etc.
                SeadragonUtils.cancelEvent(event);
            }
        }
        
        // Constructor
        
        (function () {
            ieSelf = {
                hasMouse: hasMouse,
                onMouseOver: onMouseOver,
                onMouseOut: onMouseOut,
                onMouseUp: onMouseUp,
                onMouseMove: onMouseMove
            };
        })();
        
        // Methods
        
        this.isTracking = function() {
            return tracking;
        };
        
        this.setTracking = function(track) {
            if (track) {
                startTracking();
            } else {
                stopTracking();
            }
        };
        
    };
    
})();

// Seadragon.EventManager.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonEventManager = Seadragon.EventManager = function() {
    
    // Fields
    
    var listeners = {}; // dictionary of eventName --> array of handlers
    
    // Methods
    
    this.addListener = function(eventName, handler) {
        if (typeof(handler) != "function") {
            return;
        }
        
        if (!listeners[eventName]) {
            listeners[eventName] = [];
        }
        
        listeners[eventName].push(handler);
    };
    
    this.removeListener = function(eventName, handler) {
        var handlers = listeners[eventName];
        
        if (typeof(handler) != "function") {
            return;
        } else if (!handlers) {
            return;
        }
        
        for (var i = 0; i < handlers.length; i++) {
            if (handler == handlers[i]) {
                handlers.splice(i, 1);
                return;
            }
        }
    };
    
    this.clearListeners = function(eventName) {
        if (listeners[eventName]) {
            delete listeners[eventName];
        }
    };
    
    this.trigger = function(eventName) {
        var handlers = listeners[eventName];
        var args = [];
        
        if (!handlers) {
            return;
        }
        
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        
        for (var i = 0; i < handlers.length; i++) {
            try {
                handlers[i].apply(window, args);
            } catch (e) {
                // handler threw an error, ignore, go on to next one
                SeadragonDebug.error(e.name + " while executing " + eventName +
                        " handler: " + e.message, e);
            }
        }
    };
    
};

// Seadragon.ImageLoader.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonImageLoader;

(function() {
    
    var TIMEOUT = 15000;     // milliseconds after which an image times out
    
    function Job(src, callback) {
        
        // Fields
        
        var image = null;
        var timeout = null;     // IE8 fix: no finishing event raised sometimes
        
        // Helpers
        
        function finish(success) {
            image.onload = null;
            image.onabort = null;
            image.onerror = null;
            
            if (timeout) {
                window.clearTimeout(timeout);
            }
            
            // call on a timeout to ensure asynchronous behavior
            window.setTimeout(function() {
                callback(src, success ? image : null);
            }, 1);
        }
        
        // Methods
        
        this.start = function() {
            image = new Image();
            
            var successFunc = function() { finish(true); };
            var failureFunc = function() { finish(false); };
            var timeoutFunc = function() {
                SeadragonDebug.log("Image timed out: " + src);
                finish(false);
            };
            
            image.onload = successFunc;
            image.onabort = failureFunc;
            image.onerror = failureFunc;
            
            // consider it a failure if the image times out.
            timeout = window.setTimeout(timeoutFunc, TIMEOUT);
            
            image.src = src;
        };
        
    }
    
    SeadragonImageLoader = Seadragon.ImageLoader = function() {
        
        // Fields
        
        var downloading = 0;    // number of Jobs currently downloading
        
        // Helpers
        
        function onComplete(callback, src, image) {
            downloading--;
            if (typeof(callback) == "function") {
                try {
                    callback(image);
                } catch (e) {
                    SeadragonDebug.error(e.name +  " while executing " + src +
                            " callback: " + e.message, e);
                }
            }
        }
        
        // Methods
        
        this.loadImage = function(src, callback) {
            if (downloading >= SeadragonConfig.imageLoaderLimit) {
                return false;
            }
            
            var func = SeadragonUtils.createCallback(null, onComplete, callback);
            var job = new Job(src, func);
            
            downloading++;
            job.start();
            
            return true;
        };
        
    };

})();

// Seadragon.Buttons.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonButton,
    SeadragonButtonGroup;

(function() {
    
    // Enumerations
    
    var ButtonState = {
        REST: 0,
        GROUP: 1,
        HOVER: 2,
        DOWN: 3
    };
    
    // Button class
    
    SeadragonButton = Seadragon.Button = function(tooltip,
            srcRest, srcGroup, srcHover, srcDown,
            onPress, onRelease, onClick, onEnter, onExit) {
        
        // Fields
        
        var button = SeadragonUtils.makeNeutralElement("span");
        var currentState = ButtonState.GROUP;
        var tracker = new SeadragonMouseTracker(button);
        
        var imgRest = SeadragonUtils.makeTransparentImage(srcRest);
        var imgGroup = SeadragonUtils.makeTransparentImage(srcGroup);
        var imgHover = SeadragonUtils.makeTransparentImage(srcHover);
        var imgDown = SeadragonUtils.makeTransparentImage(srcDown);
        
        var onPress = typeof(onPress) == "function" ? onPress : null;
        var onRelease = typeof(onRelease) == "function" ? onRelease : null;
        var onClick = typeof(onClick) == "function" ? onClick : null;
        var onEnter = typeof(onEnter) == "function" ? onEnter : null;
        var onExit = typeof(onExit) == "function" ? onExit : null;
        
        var fadeDelay = 0;      // begin fading immediately
        var fadeLength = 2000;  // fade over a period of 2 seconds
        var fadeBeginTime = null;
        var shouldFade = false;
        
        // Properties
        
        this.elmt = button;
        
        // Fading helpers
        
        function scheduleFade() {
            window.setTimeout(updateFade, 20);
        }
        
        function updateFade() {
            if (shouldFade) {
                var currentTime = new Date().getTime();
                var deltaTime = currentTime - fadeBeginTime;
                var opacity = 1.0 - deltaTime / fadeLength;
                
                opacity = Math.min(1.0, opacity);
                opacity = Math.max(0.0, opacity);
                
                SeadragonUtils.setElementOpacity(imgGroup, opacity, true);
                if (opacity > 0) {
                    scheduleFade();    // fade again
                }
            }
        }
        
        function beginFading() {
            shouldFade = true;
            fadeBeginTime = new Date().getTime() + fadeDelay;
            window.setTimeout(scheduleFade, fadeDelay);
        }
        
        function stopFading() {
            shouldFade = false;
            SeadragonUtils.setElementOpacity(imgGroup, 1.0, true);
        }
        
        // State helpers
        
        function inTo(newState) {
            if (newState >= ButtonState.GROUP && currentState == ButtonState.REST) {
                stopFading();
                currentState = ButtonState.GROUP;
            }
            
            if (newState >= ButtonState.HOVER && currentState == ButtonState.GROUP) {
                // important: don't explicitly say "visibility: visible".
                // see note in Viewer.setVisible() for explanation.
                imgHover.style.visibility = "";
                currentState = ButtonState.HOVER;
            }
            
            if (newState >= ButtonState.DOWN && currentState == ButtonState.HOVER) {
                // important: don't explicitly say "visibility: visible".
                // see note in Viewer.setVisible() for explanation.
                imgDown.style.visibility = "";
                currentState = ButtonState.DOWN;
            }
        }
        
        function outTo(newState) {
            if (newState <= ButtonState.HOVER && currentState == ButtonState.DOWN) {
                imgDown.style.visibility = "hidden";
                currentState = ButtonState.HOVER;
            }
            
            if (newState <= ButtonState.GROUP && currentState == ButtonState.HOVER) {
                imgHover.style.visibility = "hidden";
                currentState = ButtonState.GROUP;
            }
            
            if (newState <= ButtonState.REST && currentState == ButtonState.GROUP) {
                beginFading();
                currentState = ButtonState.REST;
            }
        }
        
        // Tracker helpers
        
        function enterHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            if (buttonDownElmt) {
                inTo(ButtonState.DOWN);
                if (onEnter) {
                    onEnter();
                }
            } else if (!buttonDownAny) {
                inTo(ButtonState.HOVER);
            }
        }
        
        function exitHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            outTo(ButtonState.GROUP);
            if (buttonDownElmt && onExit) {
                onExit();
            }
        }
        
        function pressHandler(tracker, position) {
            inTo(ButtonState.DOWN);
            if (onPress) {
                onPress();
            }
        }
        
        function releaseHandler(tracker, position, insideElmtPress, insideElmtRelease) {
            if (insideElmtPress && insideElmtRelease) {
                outTo(ButtonState.HOVER);
                if (onRelease) {
                    onRelease();
                }
            } else if (insideElmtPress) {
                outTo(ButtonState.GROUP);
            } else {
                // pressed elsewhere, but released on it. if we ignored the
                // enter event because a button was down, activate hover now
                inTo(ButtonState.HOVER);
            }
        }
        
        function clickHandler(tracker, position, quick, shift) {
            if (onClick && quick) {
                onClick();
            }
        }
        
        // Methods
        
        this.notifyGroupEnter = function() {
            inTo(ButtonState.GROUP);
        };
        
        this.notifyGroupExit = function() {
            outTo(ButtonState.REST);
        };
        
        // Constructor
        
        (function() {
            button.style.display = "inline-block";
            button.style.position = "relative";
            button.title = tooltip;
            
            button.appendChild(imgRest);
            button.appendChild(imgGroup);
            button.appendChild(imgHover);
            button.appendChild(imgDown);
            
            var styleRest = imgRest.style;
            var styleGroup = imgGroup.style;
            var styleHover = imgHover.style;
            var styleDown = imgDown.style;
            
            // DON'T position imgRest absolutely -- let it be inline so it fills
            // up the div, sizing the div appropriately
            styleGroup.position = styleHover.position = styleDown.position = "absolute";
            styleGroup.top = styleHover.top = styleDown.top = "0px";
            styleGroup.left = styleHover.left = styleDown.left = "0px";
            styleHover.visibility = styleDown.visibility = "hidden";
                    // rest and group are always visible
            
            // FF2 is very buggy with inline-block. it squashes the button div,
            // making the group-pressed states' images lower than rest. but
            // apparently, clearing the "top" style fixes this. (note that this
            // breaks the buttons in every other browser, so we're not clearing
            // the "top" style by default...)
            if (SeadragonUtils.getBrowser() == SeadragonBrowser.FIREFOX &&
                    SeadragonUtils.getBrowserVersion() < 3) {
                styleGroup.top = styleHover.top = styleDown.top = ""; 
            }
            
            tracker.enterHandler = enterHandler;
            tracker.exitHandler = exitHandler;
            tracker.pressHandler = pressHandler;
            tracker.releaseHandler = releaseHandler;
            tracker.clickHandler = clickHandler;
            
            tracker.setTracking(true);
            outTo(ButtonState.REST);
        })();
        
    };
    
    // ButtonGroup class
    
    SeadragonButtonGroup = Seadragon.ButtonGroup = function(buttons) {
        
       // Fields
        
        var group = SeadragonUtils.makeNeutralElement("span");
        var buttons = buttons.concat([]);   // copy
        var tracker = new SeadragonMouseTracker(group);
        
        // Properties
        
        this.elmt = group;
        
        // Tracker helpers
        
        function enterHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            // somewhat office ribbon style -- we do this regardless of whether
            // the mouse is down from elsewhere. it's a nice soft glow effect.
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].notifyGroupEnter();
            }
        }
        
        function exitHandler(tracker, position, buttonDownElmt, buttonDownAny) {
            if (!buttonDownElmt) {
                // only go to rest if the mouse isn't down from a button
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].notifyGroupExit();
                }
            }
        }
        
        function releaseHandler(tracker, position, insideElmtPress, insideElmtRelease) {
            if (!insideElmtRelease) {
                // this means was the mouse was inside the div during press, so
                // since it's no longer inside the div during release, it left
                // the div. but onDivExit() ignored it since the mouse was down
                // from the div, so we'll go out to rest state now.
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].notifyGroupExit();
                }
            }
        }
        
        // Methods
        
        this.emulateEnter = function() {
            enterHandler();
        };
        
        this.emulateExit = function() {
            exitHandler();
        };
        
        // Constructor
        
        (function() {
            group.style.display = "inline-block";
            
            for (var i = 0; i < buttons.length; i++) {
                group.appendChild(buttons[i].elmt);
            }
            
            tracker.enterHandler = enterHandler;
            tracker.exitHandler = exitHandler;
            tracker.releaseHandler = releaseHandler;
            
            tracker.setTracking(true);
        })();
        
    };
    
})();

// Seadragon.TileSource.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonTileSource = Seadragon.TileSource = function(
        width, height, tileSize, tileOverlap, minLevel, maxLevel) {
    
    // Fields
    
    var self = this;
    var normHeight = height / width;
    
    // Properties
    
    this.width = width;
    this.height = height;
    this.aspectRatio = width / height;
    this.dimensions = new SeadragonPoint(width, height);
    this.minLevel = minLevel ? minLevel : 0;
    this.maxLevel = maxLevel ? maxLevel :
            Math.ceil(Math.log(Math.max(width, height)) / Math.log(2));
    this.tileSize = tileSize ? tileSize : 0;
    this.tileOverlap = tileOverlap ? tileOverlap : 0;
    
    // Methods
    
    this.getLevelScale = function(level) {
        // equivalent to Math.pow(0.5, numLevels - level);
        return 1 / (1 << (self.maxLevel - level));
    };
    
    this.getNumTiles = function(level) {
        var scale = self.getLevelScale(level);
        var x = Math.ceil(scale * width / self.tileSize);
        var y = Math.ceil(scale * height / self.tileSize);
        
        return new SeadragonPoint(x, y);
    };
    
    this.getPixelRatio = function(level) {
        var imageSizeScaled = self.dimensions.times(self.getLevelScale(level));
        var rx = 1.0 / imageSizeScaled.x;
        var ry = 1.0 / imageSizeScaled.y;
        
        return new SeadragonPoint(rx, ry);
    };
    
    this.getTileAtPoint = function(level, point) {
        // support wrapping by taking less-than-full tiles into account!
        // this is necessary in order to properly wrap low-res tiles.
        var scaledSize = self.dimensions.times(self.getLevelScale(level));
        var pixel = point.times(scaledSize.x);
        var tx, ty;
        
        // optimize for the non-wrapping case, but support wrapping
        if (point.x >= 0.0 && point.x <= 1.0) {
            tx = Math.floor(pixel.x / self.tileSize);
        } else {
            tx = Math.ceil(scaledSize.x / self.tileSize) * Math.floor(pixel.x / scaledSize.x) +
                    Math.floor(((scaledSize.x + (pixel.x % scaledSize.x)) % scaledSize.x) / self.tileSize);
        }
        
        // same thing vertically
        if (point.y >= 0.0 && point.y <= normHeight) {
            ty = Math.floor(pixel.y / self.tileSize);
        } else {
            ty = Math.ceil(scaledSize.y / self.tileSize) * Math.floor(pixel.y / scaledSize.y) +
                    Math.floor(((scaledSize.y + (pixel.y % scaledSize.y)) % scaledSize.y) / self.tileSize);
        }
        
        return new SeadragonPoint(tx, ty);
    };
    
    this.getTileBounds = function(level, x, y) {
        // work in scaled pixels for this level
        var dimensionsScaled = self.dimensions.times(self.getLevelScale(level));
        
        // find position, adjust for no overlap data on top and left edges
        var px = (x === 0) ? 0 : self.tileSize * x - self.tileOverlap;
        var py = (y === 0) ? 0 : self.tileSize * y - self.tileOverlap;
        
        // find size, adjust for no overlap data on top and left edges
        var sx = self.tileSize + (x === 0 ? 1 : 2) * self.tileOverlap;
        var sy = self.tileSize + (y === 0 ? 1 : 2) * self.tileOverlap;
        
        // adjust size for single-tile levels where the image size is smaller
        // than the regular tile size, and for tiles on the bottom and right
        // edges that would exceed the image bounds
        sx = Math.min(sx, dimensionsScaled.x - px);
        sy = Math.min(sy, dimensionsScaled.y - py);
        
        // finally, normalize...
        // note that isotropic coordinates ==> only dividing by scaled x!
        var scale = 1.0 / dimensionsScaled.x;
        return new SeadragonRect(px * scale, py * scale, sx * scale, sy * scale);
    };
    
    this.getTileUrl = function(level, x, y) {
        throw new Error("Method not implemented.");
    };
    
    this.tileExists = function(level, x, y) {
        var numTiles = self.getNumTiles(level);
        return level >= self.minLevel && level <= self.maxLevel &&
                x >= 0 && y >= 0 && x < numTiles.x && y < numTiles.y;
    };
    
};

// Seadragon.DisplayRect.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonDisplayRect = Seadragon.DisplayRect = function(x, y, width, height, minLevel, maxLevel) {
    
    // Inheritance
    
    SeadragonRect.apply(this, arguments);
    
    // Properties (extended)
    
    this.minLevel = minLevel;
    this.maxLevel = maxLevel;
    
};

SeadragonDisplayRect.prototype = new SeadragonRect();

// Seadragon.DeepZoom.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonDziTileSource = Seadragon.DziTileSource = function(
        width, height, tileSize, tileOverlap, tilesUrl, tileFormat, displayRects) {
    
    // Inheritance
    
    SeadragonTileSource.apply(this, [width, height, tileSize, tileOverlap]);
    
    // Fields
    
    var self = this;
    var levelRects = {};    // 1D dictionary [level] --> array of DisplayRects
    
    // Properties
    
    this.fileFormat = tileFormat;   // deprecated old property ("file" instead of "tile")
    this.tileFormat = tileFormat;
    this.displayRects = displayRects;
    
    // Constructor
    
    (function() {
        if (!displayRects) {
            return;
        }
        
        for (var i = displayRects.length - 1; i >= 0; i--) {
            var rect = displayRects[i];
            for (var level = rect.minLevel; level <= rect.maxLevel; level++) {
                if (!levelRects[level]) {
                    levelRects[level] = [];
                }
                levelRects[level].push(rect);
            }
        }
    })();
    
    // Methods -- OVERRIDDEN
    
    this.getTileUrl = function(level, x, y) {
        // using array join because it's faster than string concatenation
        return [tilesUrl, level, '/', x, '_', y, '.', tileFormat].join('');
    };
    
    this.tileExists = function(level, x, y) {
        var rects = levelRects[level];
        
        if (!rects || !rects.length) {
            return true;
        }
        
        var scale = self.getLevelScale(level);
        
        for (var i = rects.length - 1; i >= 0; i--) {
            var rect = rects[i];
            
            // check level
            if (level < rect.minLevel || level > rect.maxLevel) {
                continue;
            }
            
            // transform rectangle coordinates to this level
            var xMin = rect.x * scale;
            var yMin = rect.y * scale;
            var xMax = xMin + rect.width * scale;
            var yMax = yMin + rect.height * scale;
            
            // convert to rows and columns -- note that we're ignoring tile
            // overlap, but it's a reasonable approximation. it errs on the side
            // of false positives, which is much better than false negatives.
            xMin = Math.floor(xMin / tileSize);
            yMin = Math.floor(yMin / tileSize);
            xMax = Math.ceil(xMax / tileSize);
            yMax = Math.ceil(yMax / tileSize);
            
            if (xMin <= x && x < xMax && yMin <= y && y < yMax) {
                return true;
            }
        }
        
        return false;
    };
    
};

SeadragonDziTileSource.prototype = new SeadragonTileSource();



(function() {
    
    // Helpers -- Errors
    
    function DziError(message) {
        Error.apply(this, arguments);
        this.message = message;
    }
    
    DziError.prototype = new Error();
    
    function getError(e) {
        if (!(e instanceof DziError)) {
            // shouldn't happen, but if it does, fail fast or at least log it
            SeadragonDebug.error(e.name + " while creating DZI from XML: " + e.message);
            e = new DziError(SeadragonStrings.getString("Errors.Unknown"));
        }
        
        return e;
    }
    
    // Helpers -- URL
    
    function getTilesUrl(xmlUrl) {
        var urlParts = xmlUrl.split('/');
        var filename = urlParts[urlParts.length - 1];
        var lastDot = filename.lastIndexOf('.');
        
        if (lastDot > -1) {
            urlParts[urlParts.length - 1] = filename.slice(0, lastDot);
        }
        
        return urlParts.join('/') + "_files/";
    }
    
    // Helpers -- XML
    
    function processResponse(xhr, tilesUrl) {
        if (!xhr) {
            throw new DziError(SeadragonStrings.getString("Errors.Security"));
        } else if (xhr.status !== 200 && xhr.status !== 0) {
            // chrome has bug where it sends "OK" for 404
            var status = xhr.status;
            var statusText = (status == 404) ? "Not Found" : xhr.statusText;
            throw new DziError(SeadragonStrings.getString("Errors.Status", status, statusText));
        }
        
        var doc = null;
        
        if (xhr.responseXML && xhr.responseXML.documentElement) {
            doc = xhr.responseXML;
        } else if (xhr.responseText)  {
            doc = SeadragonUtils.parseXml(xhr.responseText);
        }
        
        return processXml(doc, tilesUrl);
    }
    
    function processXml(xmlDoc, tilesUrl) {
        if (!xmlDoc || !xmlDoc.documentElement) {
            throw new DziError(SeadragonStrings.getString("Errors.Xml"));
        }
        
        var root = xmlDoc.documentElement;
        var rootName = root.tagName;
        
        if (rootName == "Image") {
            try {
                return processDzi(root, tilesUrl);
            } catch (e) {
                var defMsg = SeadragonStrings.getString("Errors.Dzi");
                throw (e instanceof DziError) ? e : new DziError(defMsg);
            }
        } else if (rootName == "Collection") {
            throw new DziError(SeadragonStrings.getString("Errors.Dzc"));
        } else if (rootName == "Error") {
            return processError(root);
        }
        
        throw new DziError(SeadragonStrings.getString("Errors.Dzi"));
    }
    
    function processDzi(imageNode, tilesUrl) {
        var tileFormat = imageNode.getAttribute("Format");
        
        if (!SeadragonUtils.imageFormatSupported(tileFormat)) {
            throw new DziError(SeadragonStrings.getString("Errors.ImageFormat",
                    tileFormat.toUpperCase()));
        }
        
        var sizeNode = imageNode.getElementsByTagName("Size")[0];
        var dispRectNodes = imageNode.getElementsByTagName("DisplayRect");
        
        var width = parseInt(sizeNode.getAttribute("Width"), 10);
        var height = parseInt(sizeNode.getAttribute("Height"), 10);
        var tileSize = parseInt(imageNode.getAttribute("TileSize"));
        var tileOverlap = parseInt(imageNode.getAttribute("Overlap"));
        var dispRects = [];
        
        for (var i = 0; i < dispRectNodes.length; i++) {
            var dispRectNode = dispRectNodes[i];
            var rectNode = dispRectNode.getElementsByTagName("Rect")[0];
            
            dispRects.push(new SeadragonDisplayRect( 
                parseInt(rectNode.getAttribute("X"), 10),
                parseInt(rectNode.getAttribute("Y"), 10),
                parseInt(rectNode.getAttribute("Width"), 10),
                parseInt(rectNode.getAttribute("Height"), 10),
                // TEMP not sure why we did this -- seems like it's wrong.
                // commenting out the hardcoded 0 and using the XML's value.
                //0,  // ignore MinLevel attribute, bug in Deep Zoom Composer
                parseInt(dispRectNode.getAttribute("MinLevel"), 10),
                parseInt(dispRectNode.getAttribute("MaxLevel"), 10)
            ));
        }
        
        return new SeadragonDziTileSource(width, height, tileSize, tileOverlap,
                tilesUrl, tileFormat, dispRects);
    }
    
    function processError(errorNode) {
        var messageNode = errorNode.getElementsByTagName("Message")[0];
        var message = messageNode.firstChild.nodeValue;
        
        throw new DziError(message);
    }
    
    // Methods -- FACTORIES
    
    SeadragonDziTileSource.getTilesUrl = getTilesUrl;
        // expose this publicly because it's useful for multiple clients
    
    SeadragonDziTileSource.createFromJson = function(jsonObj, callback) {
        var async = typeof(callback) == "function";
        var source, error;
        var dzi = jsonObj;
        
        if (!dzi || (!dzi.url && !dzi.tilesUrl)) {
            error = new DziError(SeadragonStrings.getString("Errors.Empty"));
            
        } else {
            
            try {
                
                var displayRects = dzi.displayRects;
                if (displayRects && displayRects.length) {
                    for (var i = 0, n = displayRects.length; i < n; i++) {
                        var dr = displayRects[i];
                        displayRects[i] = new SeadragonDisplayRect(
                            dr.x || dr[0],
                            dr.y || dr[1],
                            dr.width || dr[2],
                            dr.height || dr[3],
                            dr.minLevel || dr[4],
                            dr.maxLevel || dr[5]
                        );
                    }
                }
                
                source = new SeadragonDziTileSource(
                    dzi.width,
                    dzi.height,
                    dzi.tileSize,
                    dzi.tileOverlap,
                    dzi.tilesUrl || getTilesUrl(dzi.url),
                    dzi.tileFormat,
                    dzi.displayRects
                );
                
                source.xmlUrl = dzi.url;
                
            } catch (e) {
                error = getError(e);
            }
            
        }
        
        if (async) {
            window.setTimeout(SeadragonUtils.createCallback(null, callback, source, error && error.message), 1);
        } else if (error) {
            throw error;
        } else {
            return source;
        }
    };
    
    SeadragonDziTileSource.createFromXml = function(xmlUrl, xmlString, callback) {
        var async = typeof(callback) == "function";
        var error = null;
        
        if (!xmlUrl) {
            error = SeadragonStrings.getString("Errors.Empty");
            if (async) {
                window.setTimeout(function() {
                    callback(null, error);
                }, 1);
                return null;
            }
            throw new DziError(error);
        }
        
        var tilesUrl = getTilesUrl(xmlUrl);
        
        function finish(func, obj) {
            try {
                var source = func(obj, tilesUrl);
                source.xmlUrl = xmlUrl;
                return source;
            } catch (e) {
                if (async) {
                    error = getError(e).message;
                    return null;
                } else {
                    throw getError(e);
                }
            }
        }
        
        if (async) {
            if (xmlString) {
                window.setTimeout(function() {
                    var source = finish(processXml, SeadragonUtils.parseXml(xmlString));
                    callback(source, error);    // call after finish sets error
                }, 1);
            } else {
                SeadragonUtils.makeAjaxRequest(xmlUrl, function(xhr) {
                    var source = finish(processResponse, xhr);
                    callback(source, error);    // call after finish sets error
                });
            }
            
            return null;
        }
        
        // synchronous version
        if (xmlString) {
            return finish(processXml, SeadragonUtils.parseXml(xmlString));
        } else {
            return finish(processResponse, SeadragonUtils.makeAjaxRequest(xmlUrl));
        }
    };
    
})();

// Seadragon.Viewport.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonViewport = Seadragon.Viewport = function(containerSize, contentSize) {
    
    // Fields
    
    var self = this;
    
    var containerSize = new SeadragonPoint(containerSize.x, containerSize.y); // copy
    var contentAspect = contentSize.x / contentSize.y;
    var contentHeight = contentSize.y / contentSize.x;
    
    var centerSpringX = new SeadragonSpring(0);
    var centerSpringY = new SeadragonSpring(0);
    var zoomSpring = new SeadragonSpring(SeadragonConfig.logarithmicZoom ? 0 : 1);
    var zoomPoint = null;
    
    var homeBounds = new SeadragonRect(0, 0, 1, contentHeight);
    var homeCenter = homeBounds.getCenter();
    
    var LN2 = Math.LN2;
    
    // Helpers
    
    function init() {
        self.goHome(true);
        self.update();
    }
    
    function log2(x) {
        return Math.log(x) / LN2;
    }
    
    function pow2(x) {
        return Math.pow(2, x);
    }
    
    function clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    }
    
    function clampPointToRect(point, rect) {
        var xOld = point.x,
            yOld = point.y,
            xNew = clamp(xOld, rect.x, rect.x + rect.width),
            yNew = clamp(yOld, rect.y, rect.y + rect.height);
        
        return (xOld === xNew && yOld === yNew) ? point :
                new SeadragonPoint(xNew, yNew);
    }
    
    function getCenterConstraintRect(current) {
        var zoom = self.getZoom(current),
            width = 1.0 / zoom,
            height = width / self.getAspectRatio(),
            visibilityRatio = SeadragonConfig.visibilityRatio,
            xMin = (visibilityRatio - 0.5) * width,
            yMin = (visibilityRatio - 0.5) * height,
            xDelta = 1.0 - 2 * xMin,
            yDelta = contentHeight - 2 * yMin;
        
        if (xDelta < 0) {
            xMin += (0.5 * xDelta);
            xDelta = 0;
        }
        
        if (yDelta < 0) {
            yMin += (0.5 * yDelta);
            yDelta = 0;
        }
        
        return new Seadragon.Rect(xMin, yMin, xDelta, yDelta);
    }
    
    // Methods -- CONSTRAINT HELPERS
    
    this.getHomeBounds = function () {
        // fit home bounds to viewport's aspect ratio, maintaining center.
        // this is the same logic as in fitBounds().
        
        var viewportAspect = self.getAspectRatio();
        var homeBoundsFit = new SeadragonRect(
            homeBounds.x, homeBounds.y, homeBounds.width, homeBounds.height);
        
        if (contentAspect >= viewportAspect) {
            // width is bigger relative to viewport, resize height
            homeBoundsFit.height = homeBounds.width / viewportAspect;
            homeBoundsFit.y = homeCenter.y - homeBoundsFit.height / 2;
        } else {
            // height is bigger relative to viewport, resize width
            homeBoundsFit.width = homeBounds.height * viewportAspect;
            homeBoundsFit.x = homeCenter.x - homeBoundsFit.width / 2;
        }
        
        return homeBoundsFit;
    };
    
    this.getHomeCenter = function () {
        return homeCenter;
    };

    this.getHomeZoom = function () {
        // if content is wider, we'll fit width, otherwise height
        var aspectFactor = contentAspect / self.getAspectRatio();
        return (aspectFactor >= 1) ? 1 : aspectFactor;
    };
    
    this.getMinCenter = function (current) {
        return getCenterConstraintRect(current).getTopLeft();
    };
    
    this.getMaxCenter = function (current) {
        return getCenterConstraintRect(current).getBottomRight();
    };

    this.getMinZoom = function () {
        var homeZoom = self.getHomeZoom();

        // for backwards compatibility, respect minZoomDimension if present
        if (SeadragonConfig.minZoomDimension) {
            var zoom = (contentSize.x <= contentSize.y) ?
                SeadragonConfig.minZoomDimension / containerSize.x :
                SeadragonConfig.minZoomDimension / (containerSize.x * contentHeight);
        } else {
            var zoom = SeadragonConfig.minZoomImageRatio * homeZoom;
        }

        return Math.min(zoom, homeZoom);
    };

    this.getMaxZoom = function () {
        var zoom = contentSize.x * SeadragonConfig.maxZoomPixelRatio / containerSize.x;
        return Math.max(zoom, self.getHomeZoom());
    };
        
    // Methods -- ACCESSORS

    this.getAspectRatio = function () {
        return containerSize.x / containerSize.y;
    };
    
    this.getContainerSize = function() {
        return new SeadragonPoint(containerSize.x, containerSize.y);
    };
    
    this.getBounds = function(current) {
        var center = self.getCenter(current);
        var width = 1.0 / self.getZoom(current);
        var height = width / self.getAspectRatio();
        
        return new SeadragonRect(center.x - width / 2.0, center.y - height / 2.0,
            width, height);
    };
    
    this.getCenter = function(current) {
        var centerCurrent = new SeadragonPoint(
            centerSpringX.getCurrent(), centerSpringY.getCurrent());
        var centerTarget = new SeadragonPoint(
            centerSpringX.getTarget(), centerSpringY.getTarget());
        
        if (current) {
            return centerCurrent;
        } else if (!zoomPoint) {
            // no adjustment necessary since we're not zooming
            return centerTarget;
        }
        
        // to get the target center, we need to adjust for the zoom point.
        // we'll do this in the same way as the update() method.
        
        // manually calculate bounds based on this unadjusted target center.
        // this is mostly a duplicate of getBounds() above. note that this is
        // based on the TARGET zoom but the CURRENT center.
        var zoom = self.getZoom();
        var width = 1.0 / zoom;
        var height = width / self.getAspectRatio();
        var bounds = new SeadragonRect(
            centerCurrent.x - width / 2.0,
            centerCurrent.y - height / 2.0,
            width,
            height
        );
        
        // the conversions here are identical to the pixelFromPoint() and
        // deltaPointsFromPixels() methods.
        var oldZoomPixel = self.pixelFromPoint(zoomPoint, true);
        var newZoomPixel = zoomPoint.minus(bounds.getTopLeft()).times(containerSize.x / bounds.width);
        var deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
        var deltaZoomPoints = deltaZoomPixels.divide(containerSize.x * zoom);
        
        // finally, shift center to negate the change.
        return centerTarget.plus(deltaZoomPoints);
    };
    
    this.getZoom = function(current) {
        var zoom;
        if (current) {
            zoom = zoomSpring.getCurrent();
            return SeadragonConfig.logarithmicZoom ? pow2(zoom) : zoom;
        } else {
            zoom = zoomSpring.getTarget();
            return SeadragonConfig.logarithmicZoom ? pow2(zoom) : zoom;
        }
    };
    
    // Methods -- MODIFIERS
    
    this.applyConstraints = function(immediately) {
        // first, apply zoom constraints
        var oldZoom = self.getZoom();
        var newZoom = clamp(oldZoom, self.getMinZoom(), self.getMaxZoom());
        if (oldZoom != newZoom) {
            self.zoomTo(newZoom, zoomPoint, immediately);
        }
        
        // then, apply pan constraints -- but do so via fitBounds() in order to
        // account for (and adjust) the zoom point! also ignore constraints if
        // content is being wrapped! but differentiate horizontal vs. vertical.
        var oldCenter = self.getCenter();
        var newCenter = clampPointToRect(oldCenter, getCenterConstraintRect());
        if (SeadragonConfig.wrapHorizontal) {
            newCenter.x = oldCenter.x;
        }
        if (SeadragonConfig.wrapVertical) {
            newCenter.y = oldCenter.y;
        }
        if (!oldCenter.equals(newCenter)) {
            var width = 1.0 / newZoom,
                height = width / self.getAspectRatio();
            self.fitBounds(new SeadragonRect(
                newCenter.x - 0.5 * width,
                newCenter.y - 0.5 * height,
                width,
                height
            ), immediately);
        }
    };
    
    this.ensureVisible = function(immediately) {
        // for backwards compatibility
        self.applyConstraints(immediately);
    };
    
    this.fitBounds = function(bounds, immediately) {
        var aspect = self.getAspectRatio();
        var center = bounds.getCenter();
        
        // resize bounds to match viewport's aspect ratio, maintaining center.
        // note that zoom = 1/width, and width = height*aspect.
        var newBounds = new SeadragonRect(bounds.x, bounds.y, bounds.width, bounds.height);
        if (newBounds.getAspectRatio() >= aspect) {
            // width is bigger relative to viewport, resize height
            newBounds.height = bounds.width / aspect;
            newBounds.y = center.y - newBounds.height / 2;
        } else {
            // height is bigger relative to viewport, resize width
            newBounds.width = bounds.height * aspect;
            newBounds.x = center.x - newBounds.width / 2;
        }
        
        // stop movement first! this prevents the operation from missing
        self.panTo(self.getCenter(true), true);
        self.zoomTo(self.getZoom(true), null, true);
        
        // capture old values for bounds and width. we need both, but we'll
        // also use both for redundancy, to protect against precision errors.
        // note: use target bounds, since update() hasn't been called yet!
        var oldBounds = self.getBounds();
        var oldZoom = self.getZoom();
        
        // if we're already at the correct zoom, just pan and we're done.
        // we'll check both zoom and bounds for redundancy, to protect against
        // precision errors (see note below).
        var newZoom = 1.0 / newBounds.width;
        if (newZoom == oldZoom || newBounds.width == oldBounds.width) {
            self.panTo(center, immediately);
            return;
        }
        
        // otherwise, we need to zoom about the only point whose pixel transform
        // is constant between the old and new bounds. this is just tricky math.
        var refPoint = oldBounds.getTopLeft().times(containerSize.x / oldBounds.width).minus(
                newBounds.getTopLeft().times(containerSize.x / newBounds.width)).divide(
                containerSize.x / oldBounds.width - containerSize.x / newBounds.width);
        
        // note: that last line (cS.x / oldB.w - cS.x / newB.w) was causing a
        // divide by 0 in the case that oldBounds.width == newBounds.width.
        // that should have been picked up by the zoom check, but in certain
        // cases, the math is slightly off and the zooms are different. so now,
        // the zoom check has an extra check added.
        
        self.zoomTo(newZoom, refPoint, immediately);
    };
   
    this.goHome = function(immediately) {
        // calculate center adjusted for zooming
        var center = self.getCenter();
        
        // if we're wrapping horizontally, "unwind" the horizontal spring
        if (SeadragonConfig.wrapHorizontal) {
            // this puts center.x into the range [0, 1) always
            center.x = (1 + (center.x % 1)) % 1;
            centerSpringX.resetTo(center.x);
            centerSpringX.update();
        }
        
        // if we're wrapping vertically, "unwind" the vertical spring
        if (SeadragonConfig.wrapVertical) {
            // this puts center.y into the range e.g. [0, 0.75) always
            center.y = (contentHeight + (center.y % contentHeight)) % contentHeight;
            centerSpringY.resetTo(center.y);
            centerSpringY.update();
        }
        
        self.fitBounds(homeBounds, immediately);
    };
    
    this.panBy = function(delta, immediately) {
        self.panTo(self.getCenter().plus(delta), immediately);
    };
    
    this.panTo = function(center, immediately) {
        // we have to account for zoomPoint here, i.e. if we're in the middle
        // of a zoom about some point and panTo() is called, we should be
        // spring to some center that will get us to the specified center.
        // the logic here is thus the exact inverse of the getCenter() method.
        
        if (immediately) {
            centerSpringX.resetTo(center.x);
            centerSpringY.resetTo(center.y);
            return;
        }
        
        if (!zoomPoint) {
            centerSpringX.springTo(center.x);
            centerSpringY.springTo(center.y);
            return;
        }
                
        // manually calculate bounds based on this unadjusted target center.
        // this is mostly a duplicate of getBounds() above. note that this is
        // based on the TARGET zoom but the CURRENT center.
        var zoom = self.getZoom();
        var width = 1.0 / zoom;
        var height = width / self.getAspectRatio();
        var bounds = new SeadragonRect(
            centerSpringX.getCurrent() - width / 2.0,
            centerSpringY.getCurrent() - height / 2.0,
            width,
            height
        );
        
        // the conversions here are identical to the pixelFromPoint() and
        // deltaPointsFromPixels() methods.
        var oldZoomPixel = self.pixelFromPoint(zoomPoint, true);
        var newZoomPixel = zoomPoint.minus(bounds.getTopLeft()).times(containerSize.x / bounds.width);
        var deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
        var deltaZoomPoints = deltaZoomPixels.divide(containerSize.x * zoom);
        
        // finally, shift center to negate the change.
        var centerTarget = center.minus(deltaZoomPoints);
        
        centerSpringX.springTo(centerTarget.x);
        centerSpringY.springTo(centerTarget.y);
    };
    
    this.zoomBy = function(factor, refPoint, immediately) {
        self.zoomTo(self.getZoom() * factor, refPoint, immediately);
    };
    
    this.zoomTo = function(zoom, refPoint, immediately) {
        // we used to constrain zoom automatically here; now it needs to be
        // explicitly constrained, via applyConstraints().
        //zoom = clamp(zoom, self.getMinZoom(), self.getMaxZoom());
        
        if (immediately) {
            zoomSpring.resetTo(SeadragonConfig.logarithmicZoom ? log2(zoom) : zoom);
        } else {
            zoomSpring.springTo(SeadragonConfig.logarithmicZoom ? log2(zoom) : zoom);
        }
        
        zoomPoint = refPoint instanceof SeadragonPoint ? refPoint : null;
    };
    
    this.resize = function(newContainerSize, maintain) {
        // default behavior: just ensure the visible content remains visible.
        // note that this keeps the center (relative to the content) constant.
        var oldBounds = self.getBounds();
        var newBounds = oldBounds;
        var widthDeltaFactor = newContainerSize.x / containerSize.x;
        
        // update container size, but make copy first
        containerSize = new SeadragonPoint(newContainerSize.x, newContainerSize.y);
        
        if (maintain) {
            // no resize relative to screen, resize relative to viewport.
            // keep origin constant, zoom out (increase bounds) by delta factor.
            newBounds.width = oldBounds.width * widthDeltaFactor;
            newBounds.height = newBounds.width / self.getAspectRatio(); 
        }
        
        self.fitBounds(newBounds, true);
    };
    
    this.update = function() {
        var oldCenterX = centerSpringX.getCurrent();
        var oldCenterY = centerSpringY.getCurrent();
        var oldZoom = zoomSpring.getCurrent();
        
        // remember position of zoom point
        if (zoomPoint) {
            var oldZoomPixel = self.pixelFromPoint(zoomPoint, true);
        }
        
        // now update zoom only, don't update pan yet
        zoomSpring.update();
        
        // adjust for change in position of zoom point, if we've zoomed
        if (zoomPoint && zoomSpring.getCurrent() != oldZoom) {
            var newZoomPixel = self.pixelFromPoint(zoomPoint, true);
            var deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
            var deltaZoomPoints = self.deltaPointsFromPixels(deltaZoomPixels, true);
            
            // shift pan to negate the change
            centerSpringX.shiftBy(deltaZoomPoints.x);
            centerSpringY.shiftBy(deltaZoomPoints.y);
        } else {
            // don't try to adjust next time; this improves performance
            zoomPoint = null;
        }
        
        // now after adjustment, update pan
        centerSpringX.update();
        centerSpringY.update();
        
        return centerSpringX.getCurrent() != oldCenterX ||
                centerSpringY.getCurrent() != oldCenterY ||
                zoomSpring.getCurrent() != oldZoom;
    };
    
    // Methods -- CONVERSION HELPERS
    
    this.deltaPixelsFromPoints = function(deltaPoints, current) {
        return deltaPoints.times(containerSize.x * self.getZoom(current));
    };
    
    this.deltaPointsFromPixels = function(deltaPixels, current) {
        return deltaPixels.divide(containerSize.x * self.getZoom(current));
    };
    
    this.pixelFromPoint = function(point, current) {
        var bounds = self.getBounds(current);
        return point.minus(bounds.getTopLeft()).times(containerSize.x / bounds.width);
    };
    
    this.pointFromPixel = function(pixel, current) {
        var bounds = self.getBounds(current);
        return pixel.divide(containerSize.x / bounds.width).plus(bounds.getTopLeft());
    };
    
    // Constructor
    
    init();
    
};

// Seadragon.Drawer.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonDrawer,
    SeadragonOverlayPlacement;

(function() {
    
    // Constants
    
    var QUOTA = 100;    // the max number of images we should keep in memory
    var MIN_PIXEL_RATIO = 0.5;  // the most shrunk a tile should be
    
    // Method of drawing
    
    var browser = SeadragonUtils.getBrowser();
    var browserVer = SeadragonUtils.getBrowserVersion();
    var userAgent = navigator.userAgent;
    
    // check if browser supports <canvas>.
    // update: IE9 returns type "object" instead of "function"...
    var hasCanvas = !!(document.createElement("canvas").getContext);
    
    // we use this style for a lot of our checks, so caching it here:
    var docElmt = document.documentElement || {};
    var docElmtStyle = docElmt.style || {};
    
    // check if browser supports CSS transforms. using this technique:
    // http://www.zachstronaut.com/posts/2009/02/17/animate-css-transforms-firefox-webkit.html
    // also, the spec says translate values need to include units (e.g. "px"),
    // but webkit chokes on units. we need to check for this bug.
    var hasCssTransforms = false;
    var cssTransformProperties = ["msTransform", "WebkitTransform", "MozTransform"];
    var cssTransformProperty, cssTransformNoUnits;
    
    while (cssTransformProperty = cssTransformProperties.shift()) {
        if (typeof docElmtStyle[cssTransformProperty] !== "undefined") {
            hasCssTransforms = true;
            cssTransformNoUnits = /webkit/i.test(cssTransformProperty);
            break;
        }
    }
    
    // we'll use a similar technique to check for CSS transitions.
    // TEMP the value for CSS transition-property is the CSS name of the
    // property you want transitioned, e.g. "-webkit-transform", and NOT the
    // JavaScript name, e.g. "WebkitTransform". so for the time being, we're
    // hardcoding this stuff to just webkit instead of general checking.
    var cssTransformPropertyCssName = "-webkit-transform";
    var cssTransitionProperty = "WebkitTransition";
    var hasCssTransitions =
        typeof docElmtStyle[cssTransitionProperty] !== "undefined";
    
    // check if browser is IE, or supports IE's proprietary DirectX filters.
    // specifically, the matrix transform filter is similar to CSS transforms!
    // http://msdn.microsoft.com/en-us/library/ms533014(v=VS.85).aspx
    var IE_MATRIX_FILTER = "progid:DXImageTransform.Microsoft.Matrix";
    var IE_MATRIX_FILTER_REGEXP = new RegExp(
        IE_MATRIX_FILTER + "\\(.*?\\)", 'g');
    
    // TEMP checking for the presence of the "filters" property isn't really
    // strong feature detection, so added an explicit IE check. that's fine?
    // update: also trying catch this since IE9 throws an error here.
    var hasIeFilters = (function() {
        try {
            return (browser == SeadragonBrowser.IE) &&
                !!(document.documentElement.filters);
        } catch (e) {
            return false;
        }
    })();
    
    // in general, <canvas> is great because it's standardized and stable for
    // the functionality we need. plus, firefox, opera and safari 4 all have
    // subpixel precision inside <canvas>. CSS transforms also seem to get us
    // subpixel precision, and more broadly, across firefox, safari 4 and
    // chrome. both <canvas> and CSS transform
    // have potential to be hardware accelerated, so deciding between the two
    // comes down to subpixel precision and perf based on experimentation.
    // note that IE provides proprietary matrix transforms which also get us
    // subpixel precision!! for fallback, we use regular CSS position/size.
    // UPDATE: IE's matrix transforms are dog-slow, no good unfortunately.
    // but, we may still be able to use them somehow, maybe once per frame on
    // just the canvas and not multiple times per frame on each tile.
    // TODO investigate IE matrix transforms on canvas instead of per tile.
    // TEMP for now, turning off IE matrix transforms altogether.
    var badCanvas =     // due to no subpixel precision
            (browser == SeadragonBrowser.SAFARI && browserVer < 4)
    var useCanvas = hasCanvas && !badCanvas;
    var useCssTransforms = !useCanvas && hasCssTransforms;
    var useIeFilters = false;
    
    // UPDATE: safari 4 on Mac OS X 10.6 (snow leopard) and safari mobile on
    // iPhone OS 3 hardware accelerate CSS transforms when combined with CSS
    // transitions, so use them there over <canvas>!
    // UPDATE: this causes flickers on the iPhone; removing support for now.
    //var acceleratedTransforms =
    //    browser == SeadragonBrowser.SAFARI && userAgent.match(/Mac OS X/) && (
    //        // case 1: safari 4 (desktop and iPad)
    //        browserVer >= 4 ||
    //        // case 2: safari mobile, might be 3
    //        userAgent.match(/Mobile\//));
    //if (hasCssTransforms && hasCssTransitions && acceleratedTransforms) {
    //    useCanvas = false;
    //    useCssTransforms = true;
    //}
    
    // regardless, in IE, we use <img> tags. unfortunately, in IE, <img> tags
    // use a crappy nearest-neighbor interpolation by default. IE7+ lets us
    // change this via a proprietary CSS property. unfortunately, changing it to
    // bicubic caused tile seams in IE7 -- but not IE8! even IE8 in compat mode
    // has no tile seams. so we need to detect IE8 regardless of mode; we do so
    // via document.documentMode, introduced in IE8 for all modes. finally, in
    // IE7, we'll explicitly say nearest-neighbor, otherwise if the user zooms
    // the page, IE7 would implicitly change it to bicubic, causing tile seams.
    var MS_INTERPOLATION_MODE = (typeof document.documentMode !== "undefined") ?
            "bicubic" : "nearest-neighbor";
    
    // Tiles
    
    function Tile(level, x, y, bounds, exists, url) {
        // Core
        this.level = level;
        this.x = x;
        this.y = y;
        this.bounds = bounds;   // where this tile fits, in normalized coordinates
        this.exists = exists;   // part of sparse image? tile hasn't failed to load?
        
        // Image
        this.url = url;         // the URL of this tile's image
        this.elmt = null;       // the HTML element for this tile
        this.image = null;      // the Image object for this tile
        this.loaded = false;    // is this tile loaded?
        this.loading = false;   // or is this tile loading?
        
        // Drawing
        this.style = null;      // alias of this.elmt.style
        this.position = null;   // this tile's position on screen, in pixels
        this.size = null;       // this tile's size on screen, in pixels
        this.blendStart = null; // the start time of this tile's blending
        this.opacity = null;    // the current opacity this tile should be
        this.distance = null;   // the distance of this tile to the viewport center
        this.visibility = null; // the visibility score of this tile
        
        // Caching
        this.beingDrawn = false;// whether this tile is currently being drawn
        this.lastDrawnTime = 0; // when the tile was last drawn
        this.lastTouchTime = 0; // the time that tile was last touched (though not necessarily drawn)
    }
    
    Tile.prototype.toString = function() {
        return this.level + "/" + this.x + "_" + this.y;
    };
    
    Tile.prototype.drawHTML = function(container) {
        if (!this.loaded) {
            SeadragonDebug.error("Attempting to draw tile " + this.toString() +
                    " when it's not yet loaded.");
            return;
        }
        
        // initialize if first time
        if (!this.elmt) {
            this.elmt = SeadragonUtils.makeNeutralElement("img");
            this.elmt.src = this.url; 
            this.style = this.elmt.style;
            this.style.position = "absolute";
            this.style.msInterpolationMode = MS_INTERPOLATION_MODE;
                // IE only property. see note above for explanation.
            
            if (useCssTransforms) {
                this.style[cssTransformProperty + "Origin"] = "0px 0px";
                // TEMP commenting out CSS transitions for now; not stable yet.
                //if (hasCssTransitions) {
                //    this.style[cssTransitionProperty + "Property"] = cssTransformPropertyCssName;
                //    this.style[cssTransitionProperty + "Duration"] = ".01666667s";   // TEMP 1/60th of a second
                //}
            }
        }
        
        var elmt = this.elmt;
        var image = this.image;
        var style = this.style;
        var position = this.position;
        var size = this.size;
        
        if (elmt.parentNode != container) {
            container.appendChild(elmt);
        }
        
        if (useCssTransforms) {
            
            // warning! sometimes chrome doesn't have this new <img> element
            // loaded yet, even though it's a clone of another <img> element
            // that is loaded. so we use the width and height properties of the
            // original <img> (the image variable instead of this one (elmt).
            style[cssTransformProperty] = [
                'matrix(',
                (size.x / image.width).toFixed(8),
                ',0,0,',
                (size.y / image.height).toFixed(8),
                ',',
                position.x.toFixed(8),
                cssTransformNoUnits ? ',' : 'px,',
                position.y.toFixed(8),
                cssTransformNoUnits ? ')' : 'px)'
            ].join('');
            
        } else if (useIeFilters) {
            
            var containerWidth = container.clientWidth,
                containerHeight = container.clientHeight;
            
            style.width = containerWidth + "px";
            style.height = containerHeight + "px";
            style.filter = [
                'progid:DXImageTransform.Microsoft.Matrix(',
                'M11=',
                (size.x / containerWidth).toFixed(8),
                ',M22=',
                (size.y / containerHeight).toFixed(8),
                ',Dx=',
                position.x.toFixed(8),
                ',Dy=',
                position.y.toFixed(8),
                ')'
            ].join('');
            
        } else {
            
            position = position.apply(Math.floor);
            size = size.apply(Math.ceil);
            
            style.left = position.x + "px";
            style.top = position.y + "px";
            style.width = size.x + "px";
            style.height = size.y + "px";
            
        }
        
        // TEMP because we know exactly whether we're using IE filters or not,
        // short-circuitting this utils call to optimize the logic.
        // UPDATE: we're no longer using IE filters, so reverting this logic.
        SeadragonUtils.setElementOpacity(elmt, this.opacity);
        //var opacity = this.opacity;
        //if (useIeFilters && opacity < 1) {
        //    style.filter += " alpha(opacity=" + Math.round(100 * opacity) + ")";
        //} else {
        //    style.opacity = (opacity < 1) ? opacity : '';
        //}
    };
    
    Tile.prototype.drawCanvas = function(context) {
        if (!this.loaded) {
            SeadragonDebug.error("Attempting to draw tile " + this.toString() +
                    " when it's not yet loaded.");
            return;
        }
        
        var position = this.position;
        var size = this.size;
            
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, position.x, position.y, size.x, size.y);
    };
    
    Tile.prototype.unload = function() {
        if (this.elmt && this.elmt.parentNode) {
            this.elmt.parentNode.removeChild(this.elmt);
        }
        
        this.elmt = null;
        this.image = null;
        this.loaded = false;
        this.loading = false;
    }
    
    // Overlays
    
    SeadragonOverlayPlacement = Seadragon.OverlayPlacement = {
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8
    };
    
    /**
     * Creates an "adjustment" function for a given overlay placement that
     * adjusts an overlay's position depending on its size and placement. This
     * gives better perf during draw loop since we don't need to re-check and
     * re-calculate the adjustment every single iteration.
     */
    function createAdjustmentFunction(placement) {
        switch (placement) {
            case SeadragonOverlayPlacement.TOP_LEFT:
                return function(position, size) {
                    // no adjustment needed
                };
            case SeadragonOverlayPlacement.TOP:
                return function(position, size) {
                    position.x -= size.x / 2;
                    // no y adjustment needed
                };
            case SeadragonOverlayPlacement.TOP_RIGHT:
                return function(position, size) {
                    position.x -= size.x;
                    // no y adjustment needed
                };
            case SeadragonOverlayPlacement.RIGHT:
                return function(position, size) {
                    position.x -= size.x;
                    position.y -= size.y / 2;
                };
            case SeadragonOverlayPlacement.BOTTOM_RIGHT:
                return function(position, size) {
                    position.x -= size.x;
                    position.y -= size.y;
                };
            case SeadragonOverlayPlacement.BOTTOM:
                return function(position, size) {
                    position.x -= size.x / 2;
                    position.y -= size.y;
                };
            case SeadragonOverlayPlacement.BOTTOM_LEFT:
                return function(position, size) {
                    // no x adjustment needed
                    position.y -= size.y;
                };
            case SeadragonOverlayPlacement.LEFT:
                return function(position, size) {
                    // no x adjustment needed
                    position.y -= size.y / 2;
                };
            case SeadragonOverlayPlacement.CENTER:
            default:
                return function(position, size) {
                    position.x -= size.x / 2;
                    position.y -= size.y / 2;
                };
        }
    }
    
    function Overlay(elmt, loc, placement) {
        // Core
        this.elmt = elmt;
        this.scales = (loc instanceof SeadragonRect);
        this.bounds = new SeadragonRect(loc.x, loc.y, loc.width, loc.height);
        // Drawing
        this.adjust = createAdjustmentFunction(loc instanceof SeadragonPoint ?
                placement : SeadragonOverlayPlacement.TOP_LEFT);    // rects are always top-left
        this.position = new SeadragonPoint(loc.x, loc.y);
        this.size = new SeadragonPoint(loc.width, loc.height);
        this.style = elmt.style;
        this.naturalSize = new SeadragonPoint(elmt.clientWidth, elmt.clientHeight);
    }
    
    Overlay.prototype.destroy = function() {
        var elmt = this.elmt;
        var style = this.style;
        
        if (elmt.parentNode) {
            elmt.parentNode.removeChild(elmt);
        }
        
        style.top = "";
        style.left = "";
        style.position = "";
        
        if (this.scales) {
            style.width = "";
            style.height = "";
        }
    };
    
    Overlay.prototype.drawHTML = function(container) {
        var elmt = this.elmt;
        var style = this.style;
        var scales = this.scales;
        var naturalSize = this.naturalSize;
        
        if (elmt.parentNode != container) {
            container.appendChild(elmt);
            style.position = "absolute";
            naturalSize.x = elmt.clientWidth;
            naturalSize.y = elmt.clientHeight;
        }
        
        var position = this.position;
        var size = this.size;
        
        // override calculated size if this element doesn't scale with image
        if (!scales) {
            size.x = naturalSize.x = naturalSize.x || elmt.clientWidth;
            size.y = naturalSize.y = naturalSize.y || elmt.clientHeight;
        }
        
        // adjust position based on placement (default is center)
        this.adjust(position, size);
        
        if (SeadragonConfig.transformOverlays && hasCssTransforms) {
            
            style[cssTransformProperty + "Origin"] = "0px 0px";
            style[cssTransformProperty] = [
                'translate(',
                position.x.toFixed(8),
                'px,',  // webkit correctly accepts length units for translate() func
                position.y.toFixed(8),
                'px)'
            ].join('');
            
            if (scales) {
                
                if (!elmt.clientWidth) {
                    style.width = "100%";
                }
                if (!elmt.clientHeight) {
                    style.height = "100%";
                }
                
                style[cssTransformProperty] += [
                    ' scale(',
                    (size.x / elmt.clientWidth).toFixed(8),
                    ',',
                    (size.y / elmt.clientHeight).toFixed(8),
                    ')'
                ].join('');
                
            }
            
        } else if (SeadragonConfig.transformOverlays && useIeFilters) {
            
            var containerWidth = container.clientWidth,
                containerHeight = container.clientHeight;
            
            style.width = containerWidth + "px";
            style.height = containerHeight + "px";
            style.filter = [
                'progid:DXImageTransform.Microsoft.Matrix(',
                'M11=',
                (size.x / containerWidth).toFixed(8),
                ',M22=',
                (size.y / containerHeight).toFixed(8),
                ',Dx=',
                position.x.toFixed(8),
                ',Dy=',
                position.y.toFixed(8),
                ')'
            ].join('');
            
        } else {
            
            position = position.apply(Math.floor);
            size = size.apply(Math.ceil);
            
            style.left = position.x + "px";
            style.top = position.y + "px";
            
            if (scales) {
                style.width = size.x + "px";
                style.height = size.y + "px";
            }
            
        }
    };
    
    Overlay.prototype.update = function(loc, placement) {
        this.scales = (loc instanceof SeadragonRect);
        this.bounds = new SeadragonRect(loc.x, loc.y, loc.width, loc.height);
        this.adjust = createAdjustmentFunction(loc instanceof SeadragonPoint ?
                placement : SeadragonOverlayPlacement.TOP_LEFT);    // rects are always top-left
    };
    
    // Drawer
    
    SeadragonDrawer = Seadragon.Drawer = function(source, viewport, elmt) {
        
        // Implementation note:
        // 
        // This class draws two types of things: tiles and overlays. Currently,
        // only HTML elements are supported overlay types, so they will always
        // be inserted into the DOM. Tiles are images, which allows them to be
        // both inserted into the DOM or to be drawn onto a <canvas> element.
        // 
        // Higher-res (higher-level) tiles need to be drawn above lower-res
        // (lower-level) tiles. Overlays need to be drawn above all tiles. For
        // tiles drawn using <canvas>, this is easy. For tiles drawn as HTML,
        // and for overlays, we can use the CSS z-index property, but that has
        // issues in full page. So instead, we can achieve natural z-ordering
        // through the order of the elements in the container.
        // 
        // To do this, in the HTML mode, we add the tiles not to the container
        // directly, but to a div inside the container. This div is the first
        // child of the container. The overlays are added to the container
        // directly, after that div. This ensures that the overlays are always
        // drawn above the tiles.
        // 
        // In the below fields, the canvas field refers to the <canvas> element
        // if we're drawing with canvas, or the div that contains the tiles if
        // we're drawing with HTML.
        // 
        // Minor note: we remove and re-add tiles to the div every frame, but we
        // can't do this with overlays, as it breaks browser event behavior.
        
        // Fields
        
        var container = SeadragonUtils.getElement(elmt);
        var canvas = SeadragonUtils.makeNeutralElement(useCanvas ? "canvas" : "div");
        var context = useCanvas ? canvas.getContext("2d") : null;
        
        var imageLoader = new SeadragonImageLoader();
        var profiler = new SeadragonProfiler();
        
        var minLevel = source.minLevel;
        var maxLevel = source.maxLevel;
        var tileSize = source.tileSize;
        var tileOverlap = source.tileOverlap;
        var normHeight = source.height / source.width;
        
        var cacheNumTiles = {};     // 1d dictionary [level] --> Point
        var cachePixelRatios = {};  // 1d dictionary [level] --> Point
        var tilesMatrix = {};       // 3d dictionary [level][x][y] --> Tile
        var tilesLoaded = [];       // unordered list of Tiles with loaded images
        var coverage = {};          // 3d dictionary [level][x][y] --> Boolean
        
        var overlays = [];          // unordered list of Overlays added
        var lastDrawn = [];         // unordered list of Tiles drawn last frame
        var lastFrameTime = 0;      // the timestamp of the previous frame
        var lastResetTime = 0;
        var midUpdate = false;
        var updateAgain = true;
        
        // Properties
        
        this.elmt = container;
        this.profiler = profiler;
        
        // Constructor
        
        (function() {
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.position = "absolute";
            container.style.textAlign = "left";    // explicit left-align
            container.appendChild(canvas);
        })();
        
        // Helpers -- CACHES
        
        function getNumTiles(level) {
            if (!cacheNumTiles[level]) {
                cacheNumTiles[level] = source.getNumTiles(level);
            }
            
            return cacheNumTiles[level];
        }
        
        function getPixelRatio(level) {
            if (!cachePixelRatios[level]) {
                cachePixelRatios[level] = source.getPixelRatio(level);
            }
            
            return cachePixelRatios[level];
        }
        
        // Helpers -- TILES
        
        function getTile(level, x, y, time, numTilesX, numTilesY) {
            if (!tilesMatrix[level]) {
                tilesMatrix[level] = {};
            }
            if (!tilesMatrix[level][x]) {
                tilesMatrix[level][x] = {};
            }
            
            // initialize tile object if first time
            if (!tilesMatrix[level][x][y]) {
                // where applicable, adjust x and y to support wrapping.
                var xMod = (numTilesX + (x % numTilesX)) % numTilesX;
                var yMod = (numTilesY + (y % numTilesY)) % numTilesY;
                var bounds = source.getTileBounds(level, xMod, yMod);
                var exists = source.tileExists(level, xMod, yMod);
                var url = source.getTileUrl(level, xMod, yMod);
                
                // also adjust bounds to support wrapping.
                bounds.x += 1.0 * (x - xMod) / numTilesX;
                bounds.y += normHeight * (y - yMod) / numTilesY;
                
                tilesMatrix[level][x][y] = new Tile(level, x, y, bounds, exists, url);
            }
            
            var tile = tilesMatrix[level][x][y];
            
            // mark tile as touched so we don't reset it too soon
            tile.lastTouchTime = time;
            
            return tile;
        }
        
        function loadTile(tile, time) {
            tile.loading = imageLoader.loadImage(tile.url,
                    SeadragonUtils.createCallback(null, onTileLoad, tile, time));
        }
        
        function onTileLoad(tile, time, image) {
            tile.loading = false;
            
            if (midUpdate) {
                SeadragonDebug.error("Tile load callback in middle of drawing routine.");
                return;
            } else if (!image) {
                SeadragonDebug.log("Tile " + tile + " failed to load: " + tile.url);
                tile.exists = false;
                return;
            } else if (time < lastResetTime) {
                SeadragonDebug.log("Ignoring tile " + tile + " loaded before reset: " + tile.url);
                return;
            }
            
            tile.loaded = true;
            tile.image = image;
            
            var insertionIndex = tilesLoaded.length;
            
            if (tilesLoaded.length >= QUOTA) {
                var cutoff = Math.ceil(Math.log(tileSize) / Math.log(2));
                    // don't delete any single-tile levels. this takes priority.
                
                var worstTile = null;
                var worstTileIndex = -1;
                
                for (var i = tilesLoaded.length - 1; i >= 0; i--) {
                    var prevTile = tilesLoaded[i];
                    
                    if (prevTile.level <= cutoff || prevTile.beingDrawn) {
                        continue;
                    } else if (!worstTile) {
                        worstTile = prevTile;
                        worstTileIndex = i;
                        continue;
                    }
                    
                    var prevTime = prevTile.lastTouchTime;
                    var worstTime = worstTile.lastTouchTime;
                    var prevLevel = prevTile.level;
                    var worstLevel = worstTile.level;
                    
                    if (prevTime < worstTime ||
                            (prevTime == worstTime && prevLevel > worstLevel)) {
                        worstTile = prevTile;
                        worstTileIndex = i;
                    }
                }
                
                if (worstTile && worstTileIndex >= 0) {
                    worstTile.unload();
                    insertionIndex = worstTileIndex;
                    // note: we don't want or need to delete the actual Tile
                    // object from tilesMatrix; that's negligible memory.
                }
            }
            
            tilesLoaded[insertionIndex] = tile;
            updateAgain = true;
        }
        
        function clearTiles() {
            tilesMatrix = {};
            tilesLoaded = [];
        }
        
        // Helpers -- COVERAGE
        
        // Coverage scheme: it's required that in the draw routine, coverage for
        // every tile within the viewport is initially explicitly set to false.
        // This way, if a given level's coverage has been initialized, and a tile
        // isn't found, it means it's offscreen and thus provides coverage (since
        // there's no content needed to be covered). And if every tile that is found
        // does provide coverage, the entire visible level provides coverage.
        
        /**
         * Returns true if the given tile provides coverage to lower-level tiles of
         * lower resolution representing the same content. If neither x nor y is
         * given, returns true if the entire visible level provides coverage.
         * 
         * Note that out-of-bounds tiles provide coverage in this sense, since
         * there's no content that they would need to cover. Tiles at non-existent
         * levels that are within the image bounds, however, do not.
         */
        function providesCoverage(level, x, y) {
            if (!coverage[level]) {
                return false;
            }
            
            if (x === undefined || y === undefined) {
                // check that every visible tile provides coverage.
                // update: protecting against properties added to the Object
                // class's prototype, which can definitely (and does) happen.
                var rows = coverage[level];
                for (var i in rows) {
                    if (rows.hasOwnProperty(i)) {
                        var cols = rows[i];
                        for (var j in cols) {
                            if (cols.hasOwnProperty(j) && !cols[j]) {
                               return false;
                            }
                        }
                    }
                }
                
                return true;
            }
            
            return (coverage[level][x] === undefined ||
                    coverage[level][x][y] === undefined ||
                    coverage[level][x][y] === true);
        }
        
        /**
         * Returns true if the given tile is completely covered by higher-level
         * tiles of higher resolution representing the same content. If neither x
         * nor y is given, returns true if the entire visible level is covered.
         */
        function isCovered(level, x, y) {
            if (x === undefined || y === undefined) {
                return providesCoverage(level+1);
            } else {
                return (providesCoverage(level+1, 2*x, 2*y) &&
                        providesCoverage(level+1, 2*x, 2*y + 1) &&
                        providesCoverage(level+1, 2*x + 1, 2*y) &&
                        providesCoverage(level+1, 2*x + 1, 2*y + 1));
            }
        }
        
        /**
         * Sets whether the given tile provides coverage or not.
         */
        function setCoverage(level, x, y, covers) {
            if (!coverage[level]) {
                SeadragonDebug.error("Setting coverage for a tile before its " +
                        "level's coverage has been reset: " + level);
                return;
            }
            
            if (!coverage[level][x]) {
                coverage[level][x] = {};
            }
            
            coverage[level][x][y] = covers;
        }
        
        /**
         * Resets coverage information for the given level. This should be called
         * after every draw routine. Note that at the beginning of the next draw
         * routine, coverage for every visible tile should be explicitly set. 
         */
        function resetCoverage(level) {
            coverage[level] = {};
        }
        
        // Helpers -- SCORING
        
        function compareTiles(prevBest, tile) {
            // figure out if this tile is better than the previous best tile...
            // note that if there is no prevBest, this is automatically better.
            if (!prevBest) {
                return tile;
            }
            
            if (tile.visibility > prevBest.visibility) {
                return tile;
            } else if (tile.visibility == prevBest.visibility) {
                if (tile.distance < prevBest.distance) {
                    return tile;
                }
            }
            
            return prevBest;
        }
        
        // Helpers -- OVERLAYS
        
        function getOverlayIndex(elmt) {
            for (var i = overlays.length - 1; i >= 0; i--) {
                if (overlays[i].elmt == elmt) {
                    return i;
                }
            }
            
            return -1;
        }
        
        // Helpers -- CORE
        
        function updateActual() {
            // assume we won't need to update again after this update.
            // we'll set this if we find a reason to update again.
            updateAgain = false;
            
            // make local references to variables & functions referenced in
            // loops in order to improve perf
            var _canvas = canvas;
            var _context = context;
            var _container = container;
            var _useCanvas = useCanvas;
            var _lastDrawn = lastDrawn;
            
            // the tiles that were drawn last frame, but won't be this frame,
            // can be cleared from the cache, so they should be marked as such.
            while (_lastDrawn.length > 0) {
                var tile = _lastDrawn.pop();
                tile.beingDrawn = false;
            }
            
            // we need the size of the viewport (in pixels) in multiple places
            var viewportSize = viewport.getContainerSize();
            var viewportWidth = viewportSize.x;
            var viewportHeight = viewportSize.y;
            
            // clear canvas, whether in <canvas> mode or HTML mode.
            // this is important as scene may be empty this frame.
            if (_useCanvas) {
                _canvas.width = viewportWidth;
                _canvas.height = viewportHeight;
                _context.clearRect(0, 0, viewportWidth, viewportHeight);
                    // this last line shouldn't be needed. setting the width and
                    // height should clear <canvas>, but Firefox doesn't always.
            } else {
                _canvas.innerHTML = "";
            }
            
            // if viewport is off image entirely, don't bother drawing.
            // UPDATE: logic modified to support horizontal/vertical wrapping.
            var viewportBounds = viewport.getBounds(true);
            var viewportTL = viewportBounds.getTopLeft();
            var viewportBR = viewportBounds.getBottomRight();
            if (!SeadragonConfig.wrapHorizontal &&
                    (viewportBR.x < 0 || viewportTL.x > 1)) {
                // we're not wrapping horizontally, and viewport is off in x
                return;
            } else if (!SeadragonConfig.wrapVertical &&
                    (viewportBR.y < 0 || viewportTL.y > normHeight)) {
                // we're not wrapping vertically, and viewport is off in y
                return;
            }
            
            // the below section is commented out because it's more relevant to
            // collections, where you don't want 10 items to all load their xml
            // at the same time when 9 of them won't be in the viewport soon.
            
//            // but even if the viewport is currently on the image, don't force
//            // tiles to load if the viewport target is off the image
//            var viewportTargetBounds = getViewportBounds(false);
//            var viewportTargetTL = viewportTargetBounds.getTopLeft();
//            var viewportTargetBR = viewportTargetBounds.getBottomRight();
//            var willBeOff = viewportTargetBR.x < 0 || viewportTargetBR.y < 0 ||
//                    viewportTargetTL.x > 1 || viewportTargetTL.y > normHeight;
            
            // make local references to functions and variables used in loops to
            // improve perf
            var _getNumTiles = getNumTiles;
            var _getPixelRatio = getPixelRatio;
            var _getTile = getTile;
            var _isCovered = isCovered;
            var _setCoverage = setCoverage;
            var _resetCoverage = resetCoverage;
            var _providesCoverage = providesCoverage;
            var _tileOverlap = tileOverlap;
            var _lastFrameTime = lastFrameTime;
            var isChrome = (browser === SeadragonBrowser.CHROME);
            // same for Math functions
            var _abs = Math.abs;
            var _ceil = Math.ceil;
            var _floor = Math.floor;
            var _log = Math.log;
            var _max = Math.max;
            var _min = Math.min;
            // and Viewport functions
            var _deltaPixelsFromPoints = viewport.deltaPixelsFromPoints;
            var _pixelFromPoint = viewport.pixelFromPoint;
            // and TileSource functions
            var _getTileAtPoint = source.getTileAtPoint;
            // and Config properties
            var alwaysBlend = SeadragonConfig.alwaysBlend;
            var blendTimeMillis = 1000 * SeadragonConfig.blendTime;
            var immediateRender = SeadragonConfig.immediateRender;
            var minDimension = SeadragonConfig.minZoomDimension;   // for backwards compatibility
            var minImageRatio = SeadragonConfig.minImageRatio;
            var wrapHorizontal = SeadragonConfig.wrapHorizontal;
            var wrapVertical = SeadragonConfig.wrapVertical;
            var wrapOverlays = SeadragonConfig.wrapOverlays;
            
            // restrain bounds of viewport relative to image.
            // UPDATE: logic modified to support horizontal/vertical wrapping.
            if (!wrapHorizontal) {
                viewportTL.x = _max(viewportTL.x, 0);
                viewportBR.x = _min(viewportBR.x, 1);
            }
            if (!wrapVertical) {
                viewportTL.y = _max(viewportTL.y, 0);
                viewportBR.y = _min(viewportBR.y, normHeight);
            }
            
            var best = null;
            var haveDrawn = false;
            var currentTime = new Date().getTime();
            
            // calculate values for scoring -- this is based on TARGET values
            var viewportCenterPoint = viewport.getCenter();
            var viewportCenterPixel = _pixelFromPoint(viewportCenterPoint);
            var zeroRatioT = _deltaPixelsFromPoints(_getPixelRatio(0), false).x;
            var optimalPixelRatio = immediateRender ? 1 : zeroRatioT;
            
            // adjust levels to iterate over -- this is based on CURRENT values
            // TODO change this logic to use minImageRatio, but for backwards
            // compatibility, use minDimension if it's been explicitly set.
            // TEMP for now, original minDimension logic with default 64.
            minDimension = minDimension || 64;
            var lowestLevel = _max(minLevel, _floor(_log(minDimension) / _log(2)));
            var zeroRatioC = _deltaPixelsFromPoints(_getPixelRatio(0), true).x;
            var highestLevel = _min(maxLevel,
                    _floor(_log(zeroRatioC / MIN_PIXEL_RATIO) / _log(2)));
            
            // with very small images, this edge case can occur...
            lowestLevel = _min(lowestLevel, highestLevel);
            
            for (var level = highestLevel; level >= lowestLevel; level--) {
                var drawLevel = false;
                var renderPixelRatioC = _deltaPixelsFromPoints(
                        _getPixelRatio(level), true).x;     // note the .x!
                
                // if we haven't drawn yet, only draw level if tiles are big enough
                if ((!haveDrawn && renderPixelRatioC >= MIN_PIXEL_RATIO) ||
                        level == lowestLevel) {
                    drawLevel = true;
                    haveDrawn = true;
                } else if (!haveDrawn) {
                    continue;
                }
                
                _resetCoverage(level);
                
                // calculate scores applicable to all tiles on this level --
                // note that we're basing visibility on the TARGET pixel ratio
                var levelOpacity = _min(1, (renderPixelRatioC - 0.5) / 0.5);
                var renderPixelRatioT = _deltaPixelsFromPoints(
                        _getPixelRatio(level), false).x;
                var levelVisibility = optimalPixelRatio /
                        _abs(optimalPixelRatio - renderPixelRatioT);
                
                // only iterate over visible tiles
                var tileTL = _getTileAtPoint(level, viewportTL);
                var tileBR = _getTileAtPoint(level, viewportBR);
                var numTiles = _getNumTiles(level);
                var numTilesX = numTiles.x;
                var numTilesY = numTiles.y;
                if (!wrapHorizontal) {
                    tileBR.x = _min(tileBR.x, numTilesX - 1);
                }
                if (!wrapVertical) {
                    tileBR.y = _min(tileBR.y, numTilesY - 1);
                }
                
                for (var x = tileTL.x; x <= tileBR.x; x++) {
                    for (var y = tileTL.y; y <= tileBR.y; y++) {
                        var tile = _getTile(level, x, y, currentTime, numTilesX, numTilesY);
                        var drawTile = drawLevel;
                        
                        // assume this tile doesn't cover initially
                        _setCoverage(level, x, y, false);
                        
                        if (!tile.exists) {
                            // not part of sparse image, or failed to load
                            continue;
                        }
                    
                        // if we've drawn a higher-resolution level and we're not
                        // going to draw this level, then say this tile does cover
                        // if it's covered by higher-resolution tiles. if we're not
                        // covered, then we should draw this tile regardless.
                        if (haveDrawn && !drawTile) {
                            if (_isCovered(level, x, y)) {
                                _setCoverage(level, x, y, true);
                            } else {
                                drawTile = true;
                            }
                        }
                        
                        if (!drawTile) {
                            continue;
                        }
                        
                        // calculate tile's position and size in pixels
                        var boundsTL = tile.bounds.getTopLeft();
                        var boundsSize = tile.bounds.getSize();
                        var positionC = _pixelFromPoint(boundsTL, true);
                        var sizeC = _deltaPixelsFromPoints(boundsSize, true);
                        
                        // if there is no tile overlap, we need to oversize the
                        // tiles by 1px to prevent seams at imperfect zooms.
                        // fortunately, this is not an issue with regular dzi's
                        // created from Deep Zoom Composer, which uses overlap.
                        if (!_tileOverlap) { 
                            sizeC = sizeC.plus(new SeadragonPoint(1, 1));
                        }
                        
                        // calculate distance from center of viewport -- note
                        // that this is based on tile's TARGET position
                        var positionT = _pixelFromPoint(boundsTL, false);
                        var sizeT = _deltaPixelsFromPoints(boundsSize, false);
                        var tileCenter = positionT.plus(sizeT.divide(2));
                        var tileDistance = viewportCenterPixel.distanceTo(tileCenter);
                        
                        // update tile's scores and values
                        tile.position = positionC;
                        tile.size = sizeC;
                        tile.distance = tileDistance;
                        tile.visibility = levelVisibility;
                        
                        if (tile.loaded) {
                            if (!tile.blendStart) {
                                // image was just added, blend it
                                tile.blendStart = currentTime;
                            }
                            
                            var deltaTime = currentTime - tile.blendStart;
                            var opacity = (blendTimeMillis === 0) ? 1 :
                                _min(1, deltaTime / blendTimeMillis);
                            
                            if (alwaysBlend) {
                                opacity *= levelOpacity;
                            }
                            
                            tile.opacity = opacity;
                            
                            // queue tile for drawing in reverse order
                            _lastDrawn.push(tile);
                            
                            // if fully blended in, this tile now provides coverage,
                            // otherwise we need to update again to keep blending
                            if (opacity >= 1) {
                                _setCoverage(level, x, y, true);
                            
                                // workaround for chrome's weird flickering issue
                                if (isChrome && tile.lastDrawnTime !== _lastFrameTime) {
                                    _setCoverage(level, x, y, false);
                                }
                            } else if (deltaTime < blendTimeMillis) {
                                updateAgain = true;
                            }
                            
                            // new: remember that it was drawn this frame
                            tile.lastDrawnTime = currentTime;
                        } else if (tile.loading) {
                            // nothing to see here, move on
                        } else {
                            // means tile isn't loaded yet, so score it
                            best = compareTiles(best, tile);
                        }
                    }
                }
                
                // we may not need to draw any more lower-res levels
                if (_providesCoverage(level)) {
                    break;
                }
            }
            
            // now draw the tiles, but in reverse order since we want higher-res
            // tiles to be drawn on top of lower-res ones. also mark each tile
            // as being drawn so it won't get cleared from the cache.
            for (var i = _lastDrawn.length - 1; i >= 0; i--) {
                var tile = _lastDrawn[i];
                
                if (_useCanvas) {
                    tile.drawCanvas(_context);
                } else {
                    tile.drawHTML(_canvas);
                }
                
                tile.beingDrawn = true;
            }
            
            // draw the overlays -- TODO optimize based on viewport like tiles,
            // but this is tricky for non-scaling overlays like pins...
            var numOverlays = overlays.length;
            
            for (var i = 0; i < numOverlays; i++) {
                var overlay = overlays[i];
                var bounds = overlay.bounds;
                var overlayTL = bounds.getTopLeft();    // in normalized coords
                
                // wrap overlays if specified
                if (wrapOverlays && wrapHorizontal) {
                    // TEMP this isn't perfect, e.g. view center is at -2.1 and
                    // overlay is at 0.1, this will use -2.9 instead of -1.9.
                    overlayTL.x += _floor(viewportCenterPoint.x);
                }
                if (wrapOverlays && wrapVertical) {
                    // TODO wrap overlays vertically
                }
                
                overlay.position = _pixelFromPoint(overlayTL, true);
                overlay.size = _deltaPixelsFromPoints(bounds.getSize(), true);
                
                overlay.drawHTML(container);
            }
            
            // load next tile if there is one to load
            if (best) {
                loadTile(best, currentTime);
                updateAgain = true; // because we haven't finished drawing, so
                                    // we should be re-evaluating and re-scoring
            }
            
            // new: save this frame's timestamp to enable comparing times
            lastFrameTime = currentTime;
        }
        
        // Methods -- OVERLAYS
        
        this.addOverlay = function(elmt, loc, placement) {
            var elmt = SeadragonUtils.getElement(elmt);
            
            if (getOverlayIndex(elmt) >= 0) {
                return;     // they're trying to add a duplicate overlay
            }
            
            overlays.push(new Overlay(elmt, loc, placement));
            updateAgain = true;     // TODO do we really need this?
        };
        
        this.updateOverlay = function(elmt, loc, placement) {
            var elmt = SeadragonUtils.getElement(elmt);
            var i = getOverlayIndex(elmt);
            
            if (i >= 0) {
                overlays[i].update(loc, placement);
                updateAgain = true;     // TODO do we really need this?
            }
        };
       
        this.removeOverlay = function(elmt) {
            var elmt = SeadragonUtils.getElement(elmt);
            var i = getOverlayIndex(elmt);
            
            if (i >= 0) {
                overlays[i].destroy();
                overlays.splice(i, 1);
                updateAgain = true;     // TODO do we really need this?
            }
        };
        
        this.clearOverlays = function() {
            while (overlays.length > 0) {
                overlays.pop().destroy();
                updateAgain = true;     // TODO do we really need this?
                                        // TODO it also doesn't need to be in the loop.
            }
        };
        
        // Methods -- CORE
        
        this.needsUpdate = function() {
            return updateAgain;
        };
        
        this.numTilesLoaded = function() {
            return tilesLoaded.length;
        };
        
        this.reset = function() {
            clearTiles();
            lastResetTime = new Date().getTime();
            updateAgain = true;
        };
        
        this.update = function() {
            profiler.beginUpdate();
            midUpdate = true;
            updateActual();
            midUpdate = false;
            profiler.endUpdate();
        };
    
        this.idle = function() {
            // TODO idling function
        };
        
    };
    
})();

// Seadragon.Viewer.js:

//  This code is distributed under the included license agreement, also
//  available here: http://go.microsoft.com/fwlink/?LinkId=164943

var SeadragonViewer,
    SeadragonControlAnchor;

(function() {
    
    // Constants
    
    var SIGNAL = "----seadragon----";
    
    // Private static
    
    var browser = SeadragonUtils.getBrowser();
    
    // Controls
    
    SeadragonControlAnchor = Seadragon.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4
    };
    
    /**
     * Adds the given element to the given container based on the given anchor,
     * such that all new elements anchored to a right edge are shown to the left
     * of existing elements anchored to the same edge.
     */
    function addToAnchor(elmt, anchor, container) {
        if (anchor == SeadragonControlAnchor.TOP_RIGHT || anchor == SeadragonControlAnchor.BOTTOM_RIGHT) {
            container.insertBefore(elmt, container.firstChild);
        } else {
            container.appendChild(elmt);
        }
    }
    
    function Control(elmt, anchor, container) {
        // Fields
        var wrapper = SeadragonUtils.makeNeutralElement("span");
        
        // Properties
        this.elmt = elmt;
        this.anchor = anchor;
        this.container = container;
        this.wrapper = wrapper;
        
        // Constructor
        wrapper.style.display = "inline-block";
        wrapper.appendChild(elmt);
        if (anchor == SeadragonControlAnchor.NONE) {
            wrapper.style.width = wrapper.style.height = "100%";    // IE6 fix
        }
        
        addToAnchor(wrapper, anchor, container);
    }
    
    Control.prototype.destroy = function() {
        this.wrapper.removeChild(this.elmt);
        this.container.removeChild(this.wrapper);
    };
    
    Control.prototype.isVisible = function() {
        // see note in setVisible() below about using "display: none"
        return this.wrapper.style.display != "none";
    };
    
    Control.prototype.setVisible = function(visible) {
        // using "display: none" instead of "visibility: hidden" so that mouse
        // events are no longer blocked by this invisible control.
        this.wrapper.style.display = visible ? "inline-block" : "none";
    };
    
    Control.prototype.setOpacity = function(opacity) {
        // like with setVisible() above, we really should be working with the
        // wrapper element and not the passed in element directly, so that we
        // don't conflict with the developer's own opacity settings. but this
        // doesn't work in IE always, so for our controls, use a hack for now...
        if (this.elmt[SIGNAL] && browser == SeadragonBrowser.IE) {
            SeadragonUtils.setElementOpacity(this.elmt, opacity, true);
        } else {
            SeadragonUtils.setElementOpacity(this.wrapper, opacity, true);
        }
    }
    
    // Navigation control
    
    var FULL_PAGE = "fullpage";
    var HOME = "home";
    var ZOOM_IN = "zoomin";
    var ZOOM_OUT = "zoomout";
    
    var REST = "_rest.png";
    var GROUP = "_grouphover.png";
    var HOVER = "_hover.png";
    var DOWN = "_pressed.png";
    
    function makeNavControl(viewer) {
        var group = null;
        var zooming = false;    // whether we should be continuously zooming
        var zoomFactor = null;  // how much we should be continuously zooming by
        var lastZoomTime = null;
        
        function onHome() {
            if (viewer.viewport) {
                viewer.viewport.goHome();
            }
        }
        
        function onFullPage() {
            viewer.setFullPage(!viewer.isFullPage());
            group.emulateExit();  // correct for no mouseout event on change
            
            if (viewer.viewport) {
                viewer.viewport.applyConstraints();
            }
        }
        
        function beginZoomingIn() {
            lastZoomTime = new Date().getTime();
            zoomFactor = SeadragonConfig.zoomPerSecond;
            zooming = true;
            scheduleZoom();
        }
        
        function beginZoomingOut() {
            lastZoomTime = new Date().getTime();
            zoomFactor = 1.0 / SeadragonConfig.zoomPerSecond;
            zooming = true;
            scheduleZoom();
        }
        
        function endZooming() {
            zooming = false;
        }
        
        function scheduleZoom() {
            window.setTimeout(doZoom, 10);
        }
        
        function doZoom() {
            if (zooming && viewer.viewport) {
                var currentTime = new Date().getTime();
                var deltaTime = currentTime - lastZoomTime;
                var adjustedFactor = Math.pow(zoomFactor, deltaTime / 1000);
                
                viewer.viewport.zoomBy(adjustedFactor);
                viewer.viewport.applyConstraints();
                lastZoomTime = currentTime;
                scheduleZoom();
            }
        }
        
        function doSingleZoomIn() {
            if (viewer.viewport) {
                zooming = false;
                viewer.viewport.zoomBy(SeadragonConfig.zoomPerClick / 1.0);
                viewer.viewport.applyConstraints();
            }
        }
        
        function doSingleZoomOut() {
            if (viewer.viewport) {
                zooming = false;
                viewer.viewport.zoomBy(1.0 / SeadragonConfig.zoomPerClick);
                viewer.viewport.applyConstraints();
            }
        }
        
        function lightUp() {
            group.emulateEnter();
            group.emulateExit();
        }
        
        function url(prefix, postfix) {
            return SeadragonConfig.imagePath + prefix + postfix; 
        }
        
        var zoomIn = new SeadragonButton(SeadragonStrings.getString("Tooltips.ZoomIn"),
                url(ZOOM_IN, REST), url(ZOOM_IN, GROUP), url(ZOOM_IN, HOVER),
                url(ZOOM_IN, DOWN), beginZoomingIn, endZooming, doSingleZoomIn,
                beginZoomingIn, endZooming);
        
        var zoomOut = new SeadragonButton(SeadragonStrings.getString("Tooltips.ZoomOut"),
                url(ZOOM_OUT, REST), url(ZOOM_OUT, GROUP), url(ZOOM_OUT, HOVER),
                url(ZOOM_OUT, DOWN), beginZoomingOut, endZooming, doSingleZoomOut,
                beginZoomingOut, endZooming);
        
        var goHome = new SeadragonButton(SeadragonStrings.getString("Tooltips.Home"),
                url(HOME, REST), url(HOME, GROUP), url(HOME, HOVER),
                url(HOME, DOWN), null, onHome, null, null, null);
        
        var fullPage = new SeadragonButton(SeadragonStrings.getString("Tooltips.FullPage"),
                url(FULL_PAGE, REST), url(FULL_PAGE, GROUP), url(FULL_PAGE, HOVER),
                url(FULL_PAGE, DOWN), null, onFullPage, null, null, null);
        
        group = new SeadragonButtonGroup([zoomIn, zoomOut, goHome, fullPage]);
        group.elmt[SIGNAL] = true;   // hack to get our controls to fade
        
        viewer.addEventListener("open", lightUp);
        
        return group.elmt;
    }
    
    // Viewer
    
    SeadragonViewer = Seadragon.Viewer = function(container) {
        
        // Fields
        
        var self = this;
        
        var parent = SeadragonUtils.getElement(container);
        var container = SeadragonUtils.makeNeutralElement("div");
        var canvas = SeadragonUtils.makeNeutralElement("div");
        
        var controlsTL = SeadragonUtils.makeNeutralElement("div");
        var controlsTR = SeadragonUtils.makeNeutralElement("div");
        var controlsBR = SeadragonUtils.makeNeutralElement("div");
        var controlsBL = SeadragonUtils.makeNeutralElement("div");
        
        var source = null;
        var drawer = null;
        var viewport = null;
        var profiler = null;
        
        var eventManager = new SeadragonEventManager();
        var innerTracker = new SeadragonMouseTracker(canvas);
        var outerTracker = new SeadragonMouseTracker(container);
        
        var controls = [];
        var controlsShouldFade = true;
        var controlsFadeBeginTime = null;
        var navControl = null;
        
        var controlsFadeDelay = 1000;   // begin fading after 1 second
        var controlsFadeLength = 2000;  // fade over 2 second period
        var controlsFadeBeginTime = null;
        var controlsShouldFade = false;
        
        var bodyWidth = document.body.style.width;
        var bodyHeight = document.body.style.height;
        var bodyOverflow = document.body.style.overflow;
        var docOverflow = document.documentElement.style.overflow;
        
        var fsBoundsDelta = new SeadragonPoint(1, 1);
        var prevContainerSize = null;
        
        var lastOpenStartTime = 0;
        var lastOpenEndTime = 0;
        
        var mouseDownPixel = null;
        var mouseDownCenter = null;
        
        var animating = false;
        var forceRedraw = false;
        var mouseInside = false;
        
        // Properties
        
        this.container = parent;
        this.elmt = container;
        
        this.source = null;
        this.drawer = null;
        this.viewport = null;
        this.profiler = null;
        
        this.tracker = innerTracker;
        
        // Helpers -- UI
        
        function initialize() {
            // copy style objects to improve perf
            var canvasStyle = canvas.style;
            var containerStyle = container.style;
            var controlsTLStyle = controlsTL.style;
            var controlsTRStyle = controlsTR.style;
            var controlsBRStyle = controlsBR.style;
            var controlsBLStyle = controlsBL.style;
            
            containerStyle.width = "100%";
            containerStyle.height = "100%";
            containerStyle.position = "relative";
            containerStyle.left = "0px";
            containerStyle.top = "0px";
            containerStyle.textAlign = "left";  // needed to protect against
                                                // incorrect centering
            
            canvasStyle.width = "100%";
            canvasStyle.height = "100%";
            canvasStyle.overflow = "hidden";
            canvasStyle.position = "absolute";
            canvasStyle.top = "0px";
            canvasStyle.left = "0px";
            
            controlsTLStyle.position = controlsTRStyle.position =
                    controlsBRStyle.position = controlsBLStyle.position =
                    "absolute";
            
            controlsTLStyle.top = controlsTRStyle.top = "0px";
            controlsTLStyle.left = controlsBLStyle.left = "0px";
            controlsTRStyle.right = controlsBRStyle.right = "0px";
            controlsBLStyle.bottom = controlsBRStyle.bottom = "0px";
            
            // mouse tracker handler for canvas (pan and zoom)
            innerTracker.clickHandler = onCanvasClick;
            innerTracker.pressHandler = onCanvasPress;
            innerTracker.dragHandler = onCanvasDrag;
            innerTracker.releaseHandler = onCanvasRelease;
            innerTracker.scrollHandler = onCanvasScroll;
            innerTracker.setTracking(true);     // default state
            
            // create default navigation control
            navControl = makeNavControl(self);
            navControl.style.marginRight = "4px";
            navControl.style.marginBottom = "4px";
            self.addControl(navControl, SeadragonControlAnchor.BOTTOM_RIGHT);
            
            // mouse tracker handler for container (controls fading)
            outerTracker.enterHandler = onContainerEnter;
            outerTracker.exitHandler = onContainerExit;
            outerTracker.releaseHandler = onContainerRelease;
            outerTracker.setTracking(true); // always tracking
            window.setTimeout(beginControlsAutoHide, 1);    // initial fade out
            
            //append to DOM only at end
            container.appendChild(canvas);
            container.appendChild(controlsTL);
            container.appendChild(controlsTR);
            container.appendChild(controlsBR);
            container.appendChild(controlsBL);
            parent.innerHTML = "";          // clear any existing content...
            parent.appendChild(container);  // ...then add the real container
        }
        
        function setMessage(message) {
            var textNode = document.createTextNode(message);
            
            canvas.innerHTML = "";
            canvas.appendChild(SeadragonUtils.makeCenteredNode(textNode));
            
            var textStyle = textNode.parentNode.style;
            
            // explicit styles for error message
            //textStyle.color = "white";    // TEMP uncommenting this; very obtrusive
            textStyle.fontFamily = "verdana";
            textStyle.fontSize = "13px";
            textStyle.fontSizeAdjust = "none";
            textStyle.fontStyle = "normal";
            textStyle.fontStretch = "normal";
            textStyle.fontVariant = "normal";
            textStyle.fontWeight = "normal";
            textStyle.lineHeight = "1em";
            textStyle.textAlign = "center";
            textStyle.textDecoration = "none";
        }
        
        // Helpers -- CORE
        
        function beforeOpen() {
            if (source) {
                onClose();
            }
            
            lastOpenStartTime = new Date().getTime();   // to ignore earlier opens
            
            // show loading message after a delay if it still hasn't loaded
            window.setTimeout(function() {
                if (lastOpenStartTime > lastOpenEndTime) {
                    setMessage(SeadragonStrings.getString("Messages.Loading"));
                }
            }, 2000);
            
            return lastOpenStartTime;
        }
        
        function onOpen(time, _source, error) {
            lastOpenEndTime = new Date().getTime();
            
            if (time < lastOpenStartTime) {
                SeadragonDebug.log("Ignoring out-of-date open.");
                eventManager.trigger("ignore", self);
                return;
            } else if (!_source) {
                setMessage(error);
                eventManager.trigger("error", self);
                return;
            }
            
            // clear any previous message
            canvas.innerHTML = "";
            prevContainerSize = SeadragonUtils.getElementSize(container);
            
            // UPDATE: if the container is collapsed, we should delay opening
            // since we don't know yet what the home zoom should be, so opening
            // when the container gets layout will allow us to gracefully and
            // correctly start at home. this also prevents viewport NaN values.
            // what timeout value should we use? it's arbitrary, but given that
            // this generally only occurs in embed scenarios where the image is
            // opened before the page has even finished loading, we'll use very
            // small timeout values to be crisp and responsive. note that this
            // polling is necessary; there is no good cross-browser event here.
            if (prevContainerSize.x === 0 || prevContainerSize.y === 0) {
                window.setTimeout(function () {
                    onOpen(time, _source, error);
                }, 10);
                return;
            }
            
            // assign fields
            source = _source;
            viewport = new SeadragonViewport(prevContainerSize, source.dimensions);
            drawer = new SeadragonDrawer(source, viewport, canvas);
            profiler = new SeadragonProfiler();
            
            // assign properties
            self.source = source;
            self.viewport = viewport;
            self.drawer = drawer;
            self.profiler = profiler;
            
            // begin updating
            animating = false;
            forceRedraw = true;
            scheduleUpdate(updateMulti);
            eventManager.trigger("open", self);
        }
        
        function onClose() {
            // TODO need destroy() methods to prevent leaks? check for null if so.
            
            // nullify fields and properties
            self.source = source = null;
            self.viewport = viewport = null;
            self.drawer = drawer = null;
            self.profiler = profiler = null;
            
            // clear all tiles and any message
            canvas.innerHTML = "";
        }
        
        function scheduleUpdate(updateFunc, prevUpdateTime) {
            // if we're animating, update as fast as possible to stay smooth
            if (animating) {
                return window.setTimeout(updateFunc, 1);
            }
            
            // if no previous update, consider this an update
            var currentTime = new Date().getTime();
            var prevUpdateTime = prevUpdateTime ? prevUpdateTime : currentTime;
            var targetTime = prevUpdateTime + 1000 / 60;    // 60 fps ideal
            
            // calculate delta time to be a positive number
            var deltaTime = Math.max(1, targetTime - currentTime);
            return window.setTimeout(updateFunc, deltaTime);
        }
        
        function updateOnce() {
            if (!source) {
                return;
            }
            
            profiler.beginUpdate();
            
            var containerSize = SeadragonUtils.getElementSize(container);
            
            // UPDATE: don't break if the viewer was collapsed or hidden!
            // in that case, go ahead still update normally as we were before,
            // but don't notify the viewport of the resize! prevents NaN bug.
            if (!containerSize.equals(prevContainerSize) &&
                    containerSize.x > 0 && containerSize.y > 0) {
                viewport.resize(containerSize, true); // maintain image position
                prevContainerSize = containerSize;
                eventManager.trigger("resize", self);
            }
            
            var animated = viewport.update();
            
            if (!animating && animated) {
                // we weren't animating, and now we did ==> animation start
                eventManager.trigger("animationstart", self);
                abortControlsAutoHide();
            }
            
            if (animated) {
                // viewport moved
                drawer.update();
                eventManager.trigger("animation", self);
            } else if (forceRedraw || drawer.needsUpdate()) {
                // need to load or blend images, etc.
                drawer.update();
                forceRedraw = false;
            } else {
                // no changes, so preload images, etc.
                drawer.idle();
            }
            
            if (animating && !animated) {
                // we were animating, and now we're not anymore ==> animation finish
                eventManager.trigger("animationfinish", self);
                
                // if the mouse has left the container, begin fading controls
                if (!mouseInside) {
                    beginControlsAutoHide();
                }
            }
            
            animating = animated;
            
            profiler.endUpdate();
        }
        
        function updateMulti() {
            if (!source) {
                return;
            }
            
            var beginTime = new Date().getTime();
            
            updateOnce();
            scheduleUpdate(arguments.callee, beginTime);
        }
        
        // Controls
        
        function getControlIndex(elmt) {
            for (var i = controls.length - 1; i >= 0; i--) {
                if (controls[i].elmt == elmt) {
                    return i;
                }
            }
            
            return -1;
        }
        
        function scheduleControlsFade() {
            window.setTimeout(updateControlsFade, 20);
        }
        
        function updateControlsFade() {
            if (controlsShouldFade) {
                var currentTime = new Date().getTime();
                var deltaTime = currentTime - controlsFadeBeginTime;
                var opacity = 1.0 - deltaTime / controlsFadeLength;
                
                opacity = Math.min(1.0, opacity);
                opacity = Math.max(0.0, opacity);
                
                for (var i = controls.length - 1; i >= 0; i--) {
                    controls[i].setOpacity(opacity);
                }
                
                if (opacity > 0) {
                    scheduleControlsFade();    // fade again
                }
            }
        }
        
        function abortControlsAutoHide() {
            controlsShouldFade = false;
            for (var i = controls.length - 1; i >= 0; i--) {
                controls[i].setOpacity(1.0);
            }
        }
        
        function beginControlsAutoHide() {
            if (!SeadragonConfig.autoHideControls) {
                return;
            }
            
            controlsShouldFade = true;
            controlsFadeBeginTime = new Date().getTime() + controlsFadeDelay;
            window.setTimeout(scheduleControlsFade, controlsFadeDelay);
        }
        
        // Mouse interaction with container
        
        function onContainerEnter(tracker, position, buttonDownElmt, buttonDownAny) {
            mouseInside = true;
            abortControlsAutoHide();
        }
        
        function onContainerExit(tracker, position, buttonDownElmt, buttonDownAny) {
            // fade controls out over time, only if the mouse isn't down from
            // within the container (e.g. panning, or using a control)
            if (!buttonDownElmt) {
                mouseInside = false;
                if (!animating) {
                    beginControlsAutoHide();
                }
            }
        }
        
        function onContainerRelease(tracker, position, insideElmtPress, insideElmtRelease) {
            // the mouse may have exited the container and we ignored it if the
            // mouse was down from within the container. now when the mouse is
            // released, we should fade the controls out now.
            if (!insideElmtRelease) {
                mouseInside = false;
                if (!animating) {
                    beginControlsAutoHide();
                }
            }
        }
        
        // Mouse interaction with canvas
        
        function onCanvasClick(tracker, position, quick, shift) {
            if (viewport && quick) {    // ignore clicks where mouse moved
                var zoomPerClick = SeadragonConfig.zoomPerClick;
                var factor = shift ? 1.0 / zoomPerClick : zoomPerClick;
                viewport.zoomBy(factor, viewport.pointFromPixel(position, true));
                viewport.applyConstraints();
            }
        }
        
        function onCanvasPress(tracker, position) {
            if (viewport) {
                mouseDownPixel = position;
                mouseDownCenter = viewport.getCenter();
            }
        }
        
        function onCanvasDrag(tracker, position, delta, shift) {
            if (viewport) {
                // note that in both cases, we're negating delta pixels since
                // dragging is opposite of panning. analogy is adobe viewer,
                // dragging up scrolls down.
                if (SeadragonConfig.constrainDuringPan) {
                    var deltaPixels = position.minus(mouseDownPixel);
                    var deltaPoints = viewport.deltaPointsFromPixels(deltaPixels.negate(), true);
                    viewport.panTo(mouseDownCenter.plus(deltaPoints));
                    viewport.applyConstraints();
                } else {
                    viewport.panBy(viewport.deltaPointsFromPixels(delta.negate(), true));
                }
            }
        }
        
        function onCanvasRelease(tracker, position, insideElmtPress, insideElmtRelease) {
            if (insideElmtPress && viewport) {
                viewport.applyConstraints();
            }
        }
        
        function onCanvasScroll(tracker, position, delta, shift) {
            if (viewport) {
                var factor = Math.pow(SeadragonConfig.zoomPerScroll, delta);
                viewport.zoomBy(factor, viewport.pointFromPixel(position, true));
                viewport.applyConstraints();
            }
        }
		
		// Keyboard interaction
		
		function onPageKeyDown(event) {
			event = SeadragonUtils.getEvent(event);
			if (event.keyCode === 27) {    // 27 means esc key
				self.setFullPage(false);
			}
		}
        
        // Methods -- IMAGE
        
        this.isOpen = function() {
            return !!source;
        };
        
        this.openDzi = function(xmlUrlOrJsonObj, xmlString) {
            var currentTime = beforeOpen();
            var callback = SeadragonUtils.createCallback(null, onOpen, currentTime);
            
            switch (typeof(xmlUrlOrJsonObj)) {
            case "string":
                SeadragonDziTileSource.createFromXml(xmlUrlOrJsonObj, xmlString, callback);
                break;
            default:
                SeadragonDziTileSource.createFromJson(xmlUrlOrJsonObj, callback);
                break;
            }
        };
        
        this.openTileSource = function(tileSource) {
            var currentTime = beforeOpen();
            window.setTimeout(function() {
                onOpen(currentTime, tileSource);
            }, 1);
        };
        
        this.close = function() {
            if (!source) {
                return;
            }
            
            onClose();
        };
        
        // Methods -- CONTROLS
        
        this.addControl = function(elmt, anchor) {
            var elmt = SeadragonUtils.getElement(elmt);
            
            if (getControlIndex(elmt) >= 0) {
                return;     // they're trying to add a duplicate control
            }
            
            var div = null;
            
            switch (anchor) {
                case SeadragonControlAnchor.TOP_RIGHT:
                    div = controlsTR;
                    elmt.style.position = "relative";
                    break;
                case SeadragonControlAnchor.BOTTOM_RIGHT:
                    div = controlsBR;
                    elmt.style.position = "relative";
                    break;
                case SeadragonControlAnchor.BOTTOM_LEFT:
                    div = controlsBL;
                    elmt.style.position = "relative";
                    break;
                case SeadragonControlAnchor.TOP_LEFT:
                    div = controlsTL;
                    elmt.style.position = "relative";
                    break;
                case SeadragonControlAnchor.NONE:
                default:
                    div = container;
                    elmt.style.position = "absolute";
                    break;
            }
            
            controls.push(new Control(elmt, anchor, div));
        };
        
        this.removeControl = function(elmt) {
            var elmt = SeadragonUtils.getElement(elmt);
            var i = getControlIndex(elmt);
            
            if (i >= 0) {
                controls[i].destroy();
                controls.splice(i, 1);
            }
        };
        
        this.clearControls = function() {
            while (controls.length > 0) {
                controls.pop().destroy();
            }
        };
        
        this.getNavControl = function() {
            return navControl;
        };
        
        // Methods -- UI
        
        this.isDashboardEnabled = function() {
            for (var i = controls.length - 1; i >= 0; i--) {
                if (controls[i].isVisible()) {
                    return true;
                }
            }
            
            return false;
        };
        
        this.isFullPage = function() {
            return container.parentNode == document.body;
        };
        
        this.isMouseNavEnabled = function() {
            return innerTracker.isTracking();
        };
        
        this.isVisible = function() {
            return container.style.visibility != "hidden";
        };
        
        this.setDashboardEnabled = function(enabled) {
            for (var i = controls.length - 1; i >= 0; i--) {
                controls[i].setVisible(enabled);
            }
        };
        
        this.setFullPage = function(fullPage) {
            if (fullPage == self.isFullPage()) {
                return;
            }
            
            // copy locally to improve perf
            var body = document.body;
            var bodyStyle = body.style;
            var docStyle = document.documentElement.style;
            var containerStyle = container.style;
            var canvasStyle = canvas.style;
            
            if (fullPage) {
                // change overflow, but preserve what current values are
                bodyOverflow = bodyStyle.overflow;
                docOverflow = docStyle.overflow;
                bodyStyle.overflow = "hidden";
                docStyle.overflow = "hidden";
                
                // IE6 needs the body width/height to be 100% also
                bodyWidth = bodyStyle.width;
                bodyHeight = bodyStyle.height;
                bodyStyle.width = "100%";
                bodyStyle.height = "100%";
                
                // always show black background, etc., for fullpage
                canvasStyle.backgroundColor = "black";
                canvasStyle.color = "white";
                
                // make container attached to the window, immune to scrolling,
                // and above any other things with a z-index set.
                containerStyle.position = "fixed";
                containerStyle.zIndex = "99999999";
                
                body.appendChild(container);
                prevContainerSize = SeadragonUtils.getWindowSize();
				
				// add keyboard listener for esc key, to exit full page.
				// add it on document because browsers won't give an arbitrary
				// element (e.g. this viewer) keyboard focus, and adding it to
				// window doesn't work properly in IE.
				SeadragonUtils.addEvent(document, "keydown", onPageKeyDown);
                
                onContainerEnter();     // mouse will be inside container now
            } else {
                // restore previous values for overflow
                bodyStyle.overflow = bodyOverflow;
                docStyle.overflow = docOverflow;
                
                // IE6 needed to overwrite the body width/height also
                bodyStyle.width = bodyWidth;
                bodyStyle.height = bodyHeight;
                
                // return to inheriting style
                canvasStyle.backgroundColor = "";
                canvasStyle.color = "";
                
                // make container be inline on page again, and auto z-index
                containerStyle.position = "relative";
                containerStyle.zIndex = "";
                
                parent.appendChild(container);
                prevContainerSize = SeadragonUtils.getElementSize(parent);
				
				// remove keyboard listener for esc key
				SeadragonUtils.removeEvent(document, "keydown", onPageKeyDown);
                
                onContainerExit();      // mouse will likely be outside now
            }
            
            if (viewport) {
                var oldBounds = viewport.getBounds();
                viewport.resize(prevContainerSize);
                var newBounds = viewport.getBounds();
            
                if (fullPage) {
                    // going to fullpage, remember how much bounds changed by.
                    fsBoundsDelta = new SeadragonPoint(newBounds.width / oldBounds.width,
                        newBounds.height / oldBounds.height);
                } else {
                    // leaving fullpage, negate how much the fullpage zoomed by.
                    // note that we have to negate the bigger of the two changes.
                    // we have to zoom about the center of the new bounds, but
                    // that's NOT the zoom point. so we have to manually update
                    // first so that that center becomes the viewport center.
                    viewport.update();
                    viewport.zoomBy(Math.max(fsBoundsDelta.x, fsBoundsDelta.y),
                            null, true);
                }
                
                forceRedraw = true;
                eventManager.trigger("resize", self);
                updateOnce();
            }
        };
        
        this.setMouseNavEnabled = function(enabled) {
            innerTracker.setTracking(enabled);
        };
        
        this.setVisible = function(visible) {
            // important: don't explicitly say "visibility: visible", because
            // the W3C spec actually says children of hidden elements that have
            // "visibility: visible" should still be rendered. that's usually
            // not what we (or developers) want. browsers are inconsistent in
            // this regard, but IE seems to follow this spec.
            container.style.visibility = visible ? "" : "hidden";
        };
        
        this.showMessage = function(message, delay) {
            if (!delay) {
                setMessage(message);
                return;
            }
            
            window.setTimeout(function() {
                if (!self.isOpen()) {
                    setMessage(message);
                }
            }, delay);
        };
        
        // Methods -- EVENT HANDLING
        
        this.addEventListener = function(eventName, handler) {
            eventManager.addListener(eventName, handler);
        };
        
        this.removeEventListener = function(eventName, handler) {
            eventManager.removeListener(eventName, handler);
        };
        
        // Constructor
        
        initialize();
        
    };

})();

})(window, document, Math);
/*! 
 * Seadragon Ajax 0.8.9 (custom build from source on 2013-01-23 17:05:40.978) 
 * CREATE Lab fork: https://github.com/CMU-CREATE-Lab/seadragon-ajax 
 * http://gallery.expression.microsoft.com/SeadragonAjax 
 * This code is distributed under the license agreement at: 
 * http://go.microsoft.com/fwlink/?LinkId=164943 
 */
 
(function(h,r,g,N){var l="100%",p=10,w="absolute",u="relative",o="hidden",L=" while executing ",f="function",D="mousewheel",k="px",B="inline-block",F="span",j="0px",A="none",s="div",H="fixed",J="undefined",z=",",n="number",d="",I="string",b=null,a=true,t=.5,c=false;if(!h.Seadragon)h.Seadragon={};var v=h.Seadragon,i=v.Config;(function(){if(i)return;i=v.Config={debugMode:c,animationTime:1.5,blendTime:t,alwaysBlend:c,autoHideControls:a,constrainDuringPan:a,immediateRender:c,logarithmicZoom:a,wrapHorizontal:c,wrapVertical:c,wrapOverlays:c,transformOverlays:c,minZoomDimension:b,minZoomImageRatio:.8,maxZoomPixelRatio:2,visibilityRatio:.8,springStiffness:5,imageLoaderLimit:2,clickTimeThreshold:200,clickDistThreshold:5,zoomPerClick:2,zoomPerScroll:g.pow(2,1/3),zoomPerSecond:2,proxyUrl:b,imagePath:"img/"}})();var x=v.Strings;(function(){var a="Hmm, this doesn't appear to be a valid Deep Zoom Image.";if(x)return;x=v.Strings={Errors:{Failure:"Sorry, but Seadragon Ajax can't run on your browser!\nPlease try using IE 8 or Firefox 3.\n",Dzc:"Sorry, we don't support Deep Zoom Collections!",Dzi:a,Xml:a,Empty:"You asked us to open nothing, so we did just that.",ImageFormat:"Sorry, we don't support {0}-based Deep Zoom Images.",Security:"It looks like a security restriction stopped us from loading this Deep Zoom Image.",Status:"This space unintentionally left blank ({0} {1}).",Unknown:"Whoops, something inexplicably went wrong. Sorry!"},Messages:{Loading:"Loading..."},Tooltips:{FullPage:"Toggle full page",Home:"Go home",ZoomIn:"Zoom in (you can also use your mouse's scroll wheel)",ZoomOut:"Zoom out (you can also use your mouse's scroll wheel)"}};x.getString=function(f){for(var c=f.split("."),a=x,b=0;b<c.length;b++)a=a[c[b]]||{};if(typeof a!=I)a=d;var e=arguments;return a.replace(/\{\d+\}/g,function(b){var a=parseInt(b.match(/\d+/))+1;return a<e.length?e[a]:d})};x.setString=function(e,d){for(var c=e.split("."),b=x,a=0;a<c.length-1;a++){if(!b[c[a]])b[c[a]]={};b=b[c[a]]}b[c[a]]=d}})();var q=function(){this.log=function(c,d){var a=h.console||{},b=i.debugMode;if(b&&a.log)a.log(c);else b&&d&&alert(c)};this.error=function(b,d){var c=h.console||{},a=i.debugMode;if(a&&c.error)c.error(b);else a&&alert(b);if(a)throw d||new Error(b)};this.fail=function(a){alert(x.getString("Errors.Failure"));throw new Error(a)}};q=v.Debug=new q;var U=v.Profiler=function(){var d=this,o=d,f=c,e=0,h=b,l=b,j=Infinity,g=0,i=0,n=Infinity,k=0,m=0;d.getAvgUpdateTime=function(){return g};d.getMinUpdateTime=function(){return j};d.getMaxUpdateTime=function(){return i};d.getAvgIdleTime=function(){return k};d.getMinIdleTime=function(){return n};d.getMaxIdleTime=function(){return m};d.isMidUpdate=function(){return f};d.getNumUpdates=function(){return e};d.beginUpdate=function(){f&&o.endUpdate();f=a;h=(new Date).getTime();if(e<1)return;var b=h-l;k=(k*(e-1)+b)/e;if(b<n)n=b;if(b>m)m=b};d.endUpdate=function(){if(!f)return;l=(new Date).getTime();f=c;var a=l-h;e++;g=(g*(e-1)+a)/e;if(a<j)j=a;if(a>i)i=a};d.clearProfile=function(){f=c;e=0;h=b;l=b;j=Infinity;g=0;i=0;n=Infinity;k=0;m=0}},m=v.Point;(function(){if(m)return;m=v.Point=function(a,b){this.x=typeof a==n?a:0;this.y=typeof b==n?b:0};var a=m.prototype;a.plus=function(a){return new m(this.x+a.x,this.y+a.y)};a.minus=function(a){return new m(this.x-a.x,this.y-a.y)};a.times=function(a){return new m(this.x*a,this.y*a)};a.divide=function(a){return new m(this.x/a,this.y/a)};a.negate=function(){return new m(-this.x,-this.y)};a.distanceTo=function(a){return g.sqrt(g.pow(this.x-a.x,2)+g.pow(this.y-a.y,2))};a.apply=function(a){return new m(a(this.x),a(this.y))};a.equals=function(a){return a instanceof m&&this.x===a.x&&this.y===a.y};a.toString=function(){return "("+this.x+z+this.y+")"}})();var y=v.Rect;(function(){if(y)return;y=v.Rect=function(d,e,c,b){var a=this;a.x=typeof d==n?d:0;a.y=typeof e==n?e:0;a.width=typeof c==n?c:0;a.height=typeof b==n?b:0};var a=y.prototype;a.getAspectRatio=function(){return this.width/this.height};a.getTopLeft=function(){return new m(this.x,this.y)};a.getBottomRight=function(){var a=this;return new m(a.x+a.width,a.y+a.height)};a.getCenter=function(){var a=this;return new m(a.x+a.width/2,a.y+a.height/2)};a.getSize=function(){return new m(this.width,this.height)};a.equals=function(a){var b=this;return a instanceof y&&b.x===a.x&&b.y===a.y&&b.width===a.width&&b.height===a.height};a.toString=function(){var a=this;return "["+a.x+z+a.y+z+a.width+"x"+a.height+"]"}})();var Q=v.Spring=function(j){var c=this,d=typeof j==n?j:0,e=d,b=d,a=(new Date).getTime(),h=a,f=a;function k(b){var a=i.springStiffness;return (1-g.exp(-b*a))/(1-g.exp(-a))}c.getCurrent=function(){return d};c.getTarget=function(){return b};c.resetTo=function(c){b=c;f=a;e=b;h=f};c.springTo=function(c){e=d;h=a;b=c;f=h+1e3*i.animationTime};c.shiftBy=function(a){e+=a;b+=a};c.update=function(){a=(new Date).getTime();d=a>=f?b:e+(b-e)*k((a-h)/(f-h))}},C=v.Browser={UNKNOWN:0,IE:1,FIREFOX:2,SAFARI:3,CHROME:4,OPERA:5},e=function(){var t="DOMMouseScroll",l=this,o=l,x=["Msxml2.XMLHTTP","Msxml3.XMLHTTP","Microsoft.XMLHTTP"],z={bmp:c,jpeg:a,jpg:a,png:a,tif:c,wdp:c},u=C.UNKNOWN,p=0,v=c,y={};(function(){var d=navigator.appName,o=navigator.appVersion,a=navigator.userAgent;if(d=="Microsoft Internet Explorer"&&!!h.attachEvent&&!!h.ActiveXObject){var i=a.indexOf("MSIE");u=C.IE;p=parseFloat(a.substring(i+5,a.indexOf(";",i)));var j=r.documentMode;if(typeof j!==J)p=j}else if(d=="Netscape"&&!!h.addEventListener){var g=a.indexOf("Firefox"),b=a.indexOf("Safari"),l=a.indexOf("Chrome");if(g>=0){u=C.FIREFOX;p=parseFloat(a.substring(g+8))}else if(b>=0){var n=a.substring(0,b).lastIndexOf("/");u=l>=0?C.CHROME:C.SAFARI;p=parseFloat(a.substring(n+1,b))}}else if(d=="Opera"&&!!h.opera&&!!h.attachEvent){u=C.OPERA;p=parseFloat(o)}for(var m=h.location.search.substring(1),k=m.split("&"),f=0;f<k.length;f++){var c=k[f],e=c.indexOf("=");if(e>0)y[c.substring(0,e)]=decodeURIComponent(c.substring(e+1))}v=u==C.IE&&p<9||u==C.CHROME&&p<2})();function w(a,b){if(b&&a!=r.body)return r.body;else return a.offsetParent}l.getBrowser=function(){return u};l.getBrowserVersion=function(){return p};l.getElement=function(a){if(typeof a==I)a=r.getElementById(a);return a};l.getElementPosition=function(a){var a=o.getElement(a),b=new m,c=o.getElementStyle(a).position==H,d=w(a,c);while(d){b.x+=a.offsetLeft;b.y+=a.offsetTop;if(c)b=b.plus(o.getPageScroll());a=d;c=o.getElementStyle(a).position==H;d=w(a,c)}return b};l.getElementSize=function(a){var a=o.getElement(a);return new m(a.clientWidth,a.clientHeight)};l.getElementStyle=function(a){var a=o.getElement(a);if(a.currentStyle)return a.currentStyle;else if(h.getComputedStyle)return h.getComputedStyle(a,d);else q.fail("Unknown element style, no known technique.")};l.getEvent=function(a){return a?a:h.event};l.getMousePosition=function(a){var a=o.getEvent(a),b=new m;if(a.type==t&&u==C.FIREFOX&&p<3){b.x=a.screenX;b.y=a.screenY}else if(typeof a.pageX==n){b.x=a.pageX;b.y=a.pageY}else if(typeof a.clientX==n){b.x=a.clientX+r.body.scrollLeft+r.documentElement.scrollLeft;b.y=a.clientY+r.body.scrollTop+r.documentElement.scrollTop}else q.fail("Unknown event mouse position, no known technique.");return b};l.getMouseScroll=function(b){var b=o.getEvent(b),a=0;if(typeof b.wheelDelta==n)a=b.wheelDelta;else if(typeof b.detail==n)a=b.detail*-1;else q.fail("Unknown event mouse scroll, no known technique.");return a?a/g.abs(a):0};l.getPageScroll=function(){var a=new m,b=r.documentElement||{},c=r.body||{};if(typeof h.pageXOffset==n){a.x=h.pageXOffset;a.y=h.pageYOffset}else if(c.scrollLeft||c.scrollTop){a.x=c.scrollLeft;a.y=c.scrollTop}else if(b.scrollLeft||b.scrollTop){a.x=b.scrollLeft;a.y=b.scrollTop}return a};l.getWindowSize=function(){var a=new m,b=r.documentElement||{},c=r.body||{};if(typeof h.innerWidth==n){a.x=h.innerWidth;a.y=h.innerHeight}else if(b.clientWidth||b.clientHeight){a.x=b.clientWidth;a.y=b.clientHeight}else if(c.clientWidth||c.clientHeight){a.x=c.clientWidth;a.y=c.clientHeight}else q.fail("Unknown window size, no known technique.");return a};l.imageFormatSupported=function(a){var a=a?a:d;return !!z[a.toLowerCase()]};l.makeCenteredNode=function(h){var b="border:none; margin:0px; padding:0px;",h=e.getElement(h),c=o.makeNeutralElement(s),a=[];a.push('<div style="display:table; height:100%; width:100%;');a.push(b);a.push('#position:relative; overflow:hidden; text-align:left;">');a.push('<div style="#position:absolute; #top:50%; width:100%; ');a.push(b);a.push('display:table-cell; vertical-align:middle;">');a.push('<div style="#position:relative; #top:-50%; width:100%; ');a.push(b);a.push('text-align:center;"></div></div></div>');c.innerHTML=a.join(d);c=c.firstChild;var g=c,f=c.getElementsByTagName(s);while(f.length>0){g=f[0];f=g.getElementsByTagName(s)}g.appendChild(h);return c};l.makeNeutralElement=function(c){var b=r.createElement(c),a=b.style;a.background="transparent none";a.border=A;a.margin=j;a.padding=j;a.position="static";return b};l.makeTransparentImage=function(d){var c=o.makeNeutralElement("img"),a=b;if(u==C.IE&&p<7){a=o.makeNeutralElement(F);a.style.display=B;c.onload=function(){a.style.width=a.style.width||c.width+k;a.style.height=a.style.height||c.height+k;c.onload=b;c=b};c.src=d;a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+d+"', sizingMethod='scale')"}else{a=c;a.src=d}return a};l.setElementOpacity=function(b,a,f){var b=o.getElement(b);if(f&&v)a=g.round(a);if(a<1)b.style.opacity=a;else b.style.opacity=d;var c=b.style.filter||d;b.style.filter=c.replace(/[\s]*alpha\(.*?\)[\s]*/g,d);if(a>=1)return;var e=g.round(100*a),h=" alpha(opacity="+e+") ";b.style.filter+=h};l.addEvent=function(a,c,d,b){var a=o.getElement(a);if(a.addEventListener){c==D&&a.addEventListener(t,d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}else q.fail("Unable to attach event handler, no known technique.")};l.removeEvent=function(a,c,d,b){var a=o.getElement(a);if(a.removeEventListener){c==D&&a.removeEventListener(t,d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}else q.fail("Unable to detach event handler, no known technique.")};l.cancelEvent=function(b){var b=o.getEvent(b);b.preventDefault&&b.preventDefault();b.cancel=a;b.returnValue=c};l.stopEvent=function(b){var b=o.getEvent(b);b.stopPropagation&&b.stopPropagation();b.cancelBubble=a};l.createCallback=function(d,c){for(var b=[],a=2;a<arguments.length;a++)b.push(arguments[a]);return function(){for(var e=b.concat([]),a=0;a<arguments.length;a++)e.push(arguments[a]);return c.apply(d,e)}};l.getUrlParameter=function(c){var a=y[c];return a?a:b};l.makeAjaxRequest=function(j,d){var c=typeof d==f,a=b;if(c)var l=d,d=function(){h.setTimeout(e.createCallback(b,l,a),1)};if(h.ActiveXObject)for(var k=0;k<x.length;k++)try{a=new ActiveXObject(x[k]);break}catch(g){continue}else if(h.XMLHttpRequest)a=new XMLHttpRequest;!a&&q.fail("Browser doesn't support XMLHttpRequest.");if(i.proxyUrl)j=i.proxyUrl+j;if(c)a.onreadystatechange=function(){if(a.readyState==4){a.onreadystatechange=new Function;d()}};try{a.open("GET",j,c);a.send(b)}catch(g){q.log(g.name+" while making AJAX request: "+g.message);a.onreadystatechange=b;a=b;c&&d()}return c?b:a};l.parseXml=function(e){var d=b;if(h.ActiveXObject)try{d=new ActiveXObject("Microsoft.XMLDOM");d.async=c;d.loadXML(e)}catch(a){q.log(a.name+" while parsing XML (ActiveX): "+a.message)}else if(h.DOMParser)try{var f=new DOMParser;d=f.parseFromString(e,"text/xml")}catch(a){q.log(a.name+" while parsing XML (DOMParser): "+a.message)}else q.fail("Browser doesn't support XML DOM.");return d}};e=v.Utils=new e;var M=v.MouseTracker;(function(){var d="mouseup",j="mousedown";if(M)return;var l=e.getBrowser()==C.IE&&e.getBrowserVersion()<9,o=c,t=c,s={},m=[];function p(a){return e.getMousePosition(a)}function k(b,d){var c=e.getMousePosition(b),a=e.getElementPosition(d);return c.minus(a)}function n(b,a){var d=r.body;while(a&&b!=a&&d!=a)try{a=a.parentNode}catch(e){return c}return b==a}function u(){o=a}function w(){o=c}(function(){if(l){e.addEvent(r,j,u,c);e.addEvent(r,d,w,c)}else{e.addEvent(h,j,u,a);e.addEvent(h,d,w,a)}})();M=v.MouseTracker=function(u){var w="mousemove",z="mouseout",y="mouseover",x=this,v=x,H=b,M=g.random(),u=e.getElement(u),F=c,A=c,C=c,E=c,G=b,O=b,N=b;x.target=u;x.enterHandler=b;x.exitHandler=b;x.pressHandler=b;x.releaseHandler=b;x.clickHandler=b;x.dragHandler=b;x.scrollHandler=b;function X(){if(!F){e.addEvent(u,y,K,c);e.addEvent(u,z,L,c);e.addEvent(u,j,U,c);e.addEvent(u,d,B,c);e.addEvent(u,D,R,c);e.addEvent(u,"click",T,c);F=a;s[M]=H}}function Z(){if(F){e.removeEvent(u,y,K,c);e.removeEvent(u,z,L,c);e.removeEvent(u,j,U,c);e.removeEvent(u,d,B,c);e.removeEvent(u,D,R,c);e.removeEvent(u,"click",T,c);I();F=c;delete s[M]}}function Y(){if(!A){if(l){e.removeEvent(u,d,B,c);e.addEvent(u,d,V,a);e.addEvent(u,w,Q,a)}else{e.addEvent(h,d,P,a);e.addEvent(h,w,J,a)}A=a}}function I(){if(A){if(l){e.removeEvent(u,w,Q,a);e.removeEvent(u,d,V,a);e.addEvent(u,d,B,c)}else{e.removeEvent(h,w,J,a);e.removeEvent(h,d,P,a)}A=c}}function S(c,d){var b=s;for(var a in b)b.hasOwnProperty(a)&&M!=a&&b[a][c](d)}function ab(){return E}function K(b){var b=e.getEvent(b);l&&A&&!n(b.srcElement,u)&&S("onMouseOver",b);var g=b.target?b.target:b.srcElement,d=b.relatedTarget?b.relatedTarget:b.fromElement;if(!n(u,g)||n(u,d))return;E=a;if(typeof v.enterHandler==f)try{v.enterHandler(v,k(b,u),C,o)}catch(c){q.error(c.name+" while executing enter handler: "+c.message,c)}}function L(a){var a=e.getEvent(a);l&&A&&!n(a.srcElement,u)&&S("onMouseOut",a);var d=a.target?a.target:a.srcElement,g=a.relatedTarget?a.relatedTarget:a.toElement;if(!n(u,d)||n(u,g))return;E=c;if(typeof v.exitHandler==f)try{v.exitHandler(v,k(a,u),C,o)}catch(b){q.error(b.name+" while executing exit handler: "+b.message,b)}}function U(b){var b=e.getEvent(b);if(b.button==2)return;C=a;G=p(b);N=G;O=(new Date).getTime();if(typeof v.pressHandler==f)try{v.pressHandler(v,k(b,u))}catch(c){q.error(c.name+" while executing press handler: "+c.message,c)}(v.pressHandler||v.dragHandler)&&e.cancelEvent(b);if(!l||!t){Y();t=a;m=[H]}else l&&m.push(H)}function B(a){var a=e.getEvent(a),g=C,d=E;if(a.button==2)return;C=c;if(typeof v.releaseHandler==f)try{v.releaseHandler(v,k(a,u),g,d)}catch(b){q.error(b.name+" while executing release handler: "+b.message,b)}g&&d&&W(a)}function V(a){var a=e.getEvent(a);if(a.button==2)return;for(var b=0;b<m.length;b++){var d=m[b];!d.hasMouse()&&d.onMouseUp(a)}I();t=c;a.srcElement.fireEvent("on"+a.type,r.createEventObject(a));e.stopEvent(a)}function P(a){!E&&B(a);I()}function T(a){v.clickHandler&&e.cancelEvent(a)}function W(a){var a=e.getEvent(a);if(a.button==2)return;var h=(new Date).getTime()-O,d=p(a),c=N.distanceTo(d),g=h<=i.clickTimeThreshold&&c<=i.clickDistThreshold;if(typeof v.clickHandler==f)try{v.clickHandler(v,k(a,u),g,a.shiftKey)}catch(b){q.error(b.name+" while executing click handler: "+b.message,b)}}function J(a){var a=e.getEvent(a),c=p(a),d=c.minus(G);G=c;if(typeof v.dragHandler==f){try{v.dragHandler(v,k(a,u),d,a.shiftKey)}catch(b){q.error(b.name+" while executing drag handler: "+b.message,b)}e.cancelEvent(a)}}function Q(b){for(var a=0;a<m.length;a++)m[a].onMouseMove(b);e.stopEvent(b)}function R(a){var a=e.getEvent(a),c=e.getMouseScroll(a);if(typeof v.scrollHandler==f){if(c)try{v.scrollHandler(v,k(a,u),c,a.shiftKey)}catch(b){q.error(b.name+" while executing scroll handler: "+b.message,b)}e.cancelEvent(a)}}(function(){H={hasMouse:ab,onMouseOver:K,onMouseOut:L,onMouseUp:B,onMouseMove:J}})();x.isTracking=function(){return F};x.setTracking=function(a){if(a)X();else Z()}}})();var W=v.EventManager=function(){var b=this,a={};b.addListener=function(b,c){if(typeof c!=f)return;if(!a[b])a[b]=[];a[b].push(c)};b.removeListener=function(e,d){var b=a[e];if(typeof d!=f)return;else if(!b)return;for(var c=0;c<b.length;c++)if(d==b[c]){b.splice(c,1);return}};b.clearListeners=function(b){if(a[b])delete a[b]};b.trigger=function(e){var d=a[e],f=[];if(!d)return;for(var b=1;b<arguments.length;b++)f.push(arguments[b]);for(var b=0;b<d.length;b++)try{d[b].apply(h,f)}catch(c){q.error(c.name+L+e+" handler: "+c.message,c)}}},S;(function(){var d=15000;function g(i,j){var e=b,f=b;function g(a){e.onload=b;e.onabort=b;e.onerror=b;f&&h.clearTimeout(f);h.setTimeout(function(){j(i,a?e:b)},1)}this.start=function(){e=new Image;var j=function(){g(a)},b=function(){g(c)},k=function(){q.log("Image timed out: "+i);g(c)};e.onload=j;e.onabort=b;e.onerror=b;f=h.setTimeout(k,d);e.src=i}}S=v.ImageLoader=function(){var d=0;function h(b,e,c){d--;if(typeof b==f)try{b(c)}catch(a){q.error(a.name+L+e+" callback: "+a.message,a)}}this.loadImage=function(l,f){if(d>=i.imageLoaderLimit)return c;var j=e.createCallback(b,h,f),k=new g(l,j);d++;k.start();return a}}})();var O,R;(function(){var i={REST:0,GROUP:1,HOVER:2,DOWN:3};O=v.Button=function(W,V,S,T,U,y,q,v,x,z){var l=e.makeNeutralElement(F),k=i.GROUP,m=new M(l),H=e.makeTransparentImage(V),r=e.makeTransparentImage(S),s=e.makeTransparentImage(T),t=e.makeTransparentImage(U),y=typeof y==f?y:b,q=typeof q==f?q:b,v=typeof v==f?v:b,x=typeof x==f?x:b,z=typeof z==f?z:b,G=0,P=2e3,D=b,A=c;this.elmt=l;function E(){h.setTimeout(R,20)}function R(){if(A){var c=(new Date).getTime(),d=c-D,b=1-d/P;b=g.min(1,b);b=g.max(0,b);e.setElementOpacity(r,b,a);b>0&&E()}}function N(){A=a;D=(new Date).getTime()+G;h.setTimeout(E,G)}function Q(){A=c;e.setElementOpacity(r,1,a)}function p(a){if(a>=i.GROUP&&k==i.REST){Q();k=i.GROUP}if(a>=i.HOVER&&k==i.GROUP){s.style.visibility=d;k=i.HOVER}if(a>=i.DOWN&&k==i.HOVER){t.style.visibility=d;k=i.DOWN}}function n(a){if(a<=i.HOVER&&k==i.DOWN){t.style.visibility=o;k=i.HOVER}if(a<=i.GROUP&&k==i.HOVER){s.style.visibility=o;k=i.GROUP}if(a<=i.REST&&k==i.GROUP){N();k=i.REST}}function K(d,c,a,b){if(a){p(i.DOWN);x&&x()}else!b&&p(i.HOVER)}function O(d,c,a){n(i.GROUP);a&&z&&z()}function L(){p(i.DOWN);y&&y()}function I(d,c,a,b){if(a&&b){n(i.HOVER);q&&q()}else if(a)n(i.GROUP);else p(i.HOVER)}function J(c,b,a){v&&a&&v()}this.notifyGroupEnter=function(){p(i.GROUP)};this.notifyGroupExit=function(){n(i.REST)};(function(){l.style.display=B;l.style.position=u;l.title=W;l.appendChild(H);l.appendChild(r);l.appendChild(s);l.appendChild(t);var g=H.style,f=r.style,b=s.style,c=t.style;f.position=b.position=c.position=w;f.top=b.top=c.top=j;f.left=b.left=c.left=j;b.visibility=c.visibility=o;if(e.getBrowser()==C.FIREFOX&&e.getBrowserVersion()<3)f.top=b.top=c.top=d;m.enterHandler=K;m.exitHandler=O;m.pressHandler=L;m.releaseHandler=I;m.clickHandler=J;m.setTracking(a);n(i.REST)})()};R=v.ButtonGroup=function(b){var d=e.makeNeutralElement(F),b=b.concat([]),c=new M(d);this.elmt=d;function f(){for(var a=0;a<b.length;a++)b[a].notifyGroupEnter()}function g(f,e,c){if(!c)for(var a=0;a<b.length;a++)b[a].notifyGroupExit()}function h(f,e,d,c){if(!c)for(var a=0;a<b.length;a++)b[a].notifyGroupExit()}this.emulateEnter=function(){f()};this.emulateExit=function(){g()};(function(){d.style.display=B;for(var e=0;e<b.length;e++)d.appendChild(b[e].elmt);c.enterHandler=f;c.exitHandler=g;c.releaseHandler=h;c.setTracking(a)})()}})();var T=v.TileSource=function(d,c,i,e,h,f){var b=this,a=b,j=c/d;b.width=d;b.height=c;b.aspectRatio=d/c;b.dimensions=new m(d,c);b.minLevel=h?h:0;b.maxLevel=f?f:g.ceil(g.log(g.max(d,c))/g.log(2));b.tileSize=i?i:0;b.tileOverlap=e?e:0;b.getLevelScale=function(b){return 1/(1<<a.maxLevel-b)};b.getNumTiles=function(e){var b=a.getLevelScale(e),f=g.ceil(b*d/a.tileSize),h=g.ceil(b*c/a.tileSize);return new m(f,h)};b.getPixelRatio=function(c){var b=a.dimensions.times(a.getLevelScale(c)),d=1/b.x,e=1/b.y;return new m(d,e)};b.getTileAtPoint=function(h,d){var b=a.dimensions.times(a.getLevelScale(h)),c=d.times(b.x),e,f;if(d.x>=0&&d.x<=1)e=g.floor(c.x/a.tileSize);else e=g.ceil(b.x/a.tileSize)*g.floor(c.x/b.x)+g.floor((b.x+c.x%b.x)%b.x/a.tileSize);if(d.y>=0&&d.y<=j)f=g.floor(c.y/a.tileSize);else f=g.ceil(b.y/a.tileSize)*g.floor(c.y/b.y)+g.floor((b.y+c.y%b.y)%b.y/a.tileSize);return new m(e,f)};b.getTileBounds=function(k,f,h){var c=a.dimensions.times(a.getLevelScale(k)),i=f===0?0:a.tileSize*f-a.tileOverlap,j=h===0?0:a.tileSize*h-a.tileOverlap,d=a.tileSize+(f===0?1:2)*a.tileOverlap,e=a.tileSize+(h===0?1:2)*a.tileOverlap;d=g.min(d,c.x-i);e=g.min(e,c.y-j);var b=1/c.x;return new y(i*b,j*b,d*b,e*b)};b.getTileUrl=function(){throw new Error("Method not implemented.")};b.tileExists=function(b,d,e){var c=a.getNumTiles(b);return b>=a.minLevel&&b<=a.maxLevel&&d>=0&&e>=0&&d<c.x&&e<c.y}},P=v.DisplayRect=function(e,f,d,c,b,a){y.apply(this,arguments);this.minLevel=b;this.maxLevel=a};P.prototype=new y;var K=v.DziTileSource=function(m,l,e,j,k,i,f){var b=this;T.apply(b,[m,l,e,j]);var n=b,h={};b.fileFormat=i;b.tileFormat=i;b.displayRects=f;(function(){if(!f)return;for(var c=f.length-1;c>=0;c--)for(var b=f[c],a=b.minLevel;a<=b.maxLevel;a++){if(!h[a])h[a]=[];h[a].push(b)}})();b.getTileUrl=function(a,b,c){return [k,a,"/",b,"_",c,".",i].join(d)};b.tileExists=function(d,p,q){var f=h[d];if(!f||!f.length)return a;for(var i=n.getLevelScale(d),o=f.length-1;o>=0;o--){var b=f[o];if(d<b.minLevel||d>b.maxLevel)continue;var j=b.x*i,k=b.y*i,l=j+b.width*i,m=k+b.height*i;j=g.floor(j/e);k=g.floor(k/e);l=g.ceil(l/e);m=g.ceil(m/e);if(j<=p&&p<l&&k<=q&&q<m)return a}return c}};K.prototype=new T;(function(){var c="Errors.Empty";function a(a){Error.apply(this,arguments);this.message=a}a.prototype=new Error;function i(b){if(!(b instanceof a)){q.error(b.name+" while creating DZI from XML: "+b.message);b=new a(x.getString("Errors.Unknown"))}return b}function d(d){var a=d.split("/"),b=a[a.length-1],c=b.lastIndexOf(".");if(c>-1)a[a.length-1]=b.slice(0,c);return a.join("/")+"_files/"}function j(c,i){if(!c)throw new a(x.getString("Errors.Security"));else if(c.status!==200&&c.status!==0){var f=c.status,h=f==404?"Not Found":c.statusText;throw new a(x.getString("Errors.Status",f,h))}var d=b;if(c.responseXML&&c.responseXML.documentElement)d=c.responseXML;else if(c.responseText)d=e.parseXml(c.responseText);return g(d,i)}function g(d,g){var b="Errors.Dzi";if(!d||!d.documentElement)throw new a(x.getString("Errors.Xml"));var e=d.documentElement,c=e.tagName;if(c=="Image")try{return l(e,g)}catch(f){var h=x.getString(b);throw f instanceof a?f:new a(h)}else if(c=="Collection")throw new a(x.getString("Errors.Dzc"));else if(c=="Error")return k(e);throw new a(x.getString(b))}function l(b,m){var f=b.getAttribute("Format");if(!e.imageFormatSupported(f))throw new a(x.getString("Errors.ImageFormat",f.toUpperCase()));for(var j=b.getElementsByTagName("Size")[0],h=b.getElementsByTagName("DisplayRect"),o=parseInt(j.getAttribute("Width"),p),n=parseInt(j.getAttribute("Height"),p),l=parseInt(b.getAttribute("TileSize")),k=parseInt(b.getAttribute("Overlap")),i=[],g=0;g<h.length;g++){var d=h[g],c=d.getElementsByTagName("Rect")[0];i.push(new P(parseInt(c.getAttribute("X"),p),parseInt(c.getAttribute("Y"),p),parseInt(c.getAttribute("Width"),p),parseInt(c.getAttribute("Height"),p),parseInt(d.getAttribute("MinLevel"),p),parseInt(d.getAttribute("MaxLevel"),p)))}return new K(o,n,l,k,m,f,i)}function k(c){var b=c.getElementsByTagName("Message")[0],d=b.firstChild.nodeValue;throw new a(d)}K.getTilesUrl=d;K.createFromJson=function(q,o){var r=typeof o==f,m,k,g=q;if(!g||!g.url&&!g.tilesUrl)k=new a(x.getString(c));else try{var l=g.displayRects;if(l&&l.length)for(var n=0,s=l.length;n<s;n++){var j=l[n];l[n]=new P(j.x||j[0],j.y||j[1],j.width||j[2],j.height||j[3],j.minLevel||j[4],j.maxLevel||j[5])}m=new K(g.width,g.height,g.tileSize,g.tileOverlap,g.tilesUrl||d(g.url),g.tileFormat,g.displayRects);m.xmlUrl=g.url}catch(p){k=i(p)}if(r)h.setTimeout(e.createCallback(b,o,m,k&&k.message),1);else if(k)throw k;else return m};K.createFromXml=function(l,m,n){var p=typeof n==f,k=b;if(!l){k=x.getString(c);if(p){h.setTimeout(function(){n(b,k)},1);return b}throw new a(k)}var q=d(l);function o(d,e){try{var c=d(e,q);c.xmlUrl=l;return c}catch(a){if(p){k=i(a).message;return b}else throw i(a)}}if(p){if(m)h.setTimeout(function(){var a=o(g,e.parseXml(m));n(a,k)},1);else e.makeAjaxRequest(l,function(b){var a=o(j,b);n(a,k)});return b}if(m)return o(g,e.parseXml(m));else return o(j,e.makeAjaxRequest(l))}})();var X=v.Viewport=function(e,n){var d=this,c=d,e=new m(e.x,e.y),s=n.x/n.y,o=n.y/n.x,h=new Q(0),j=new Q(0),l=new Q(i.logarithmicZoom?0:1),f=b,k=new y(0,0,1,o),q=k.getCenter(),A=g.LN2;function z(){c.goHome(a);c.update()}function u(a){return g.log(a)/A}function w(a){return g.pow(2,a)}function r(c,b,a){return g.min(g.max(c,b),a)}function x(b,a){var d=b.x,f=b.y,c=r(d,a.x,a.x+a.width),e=r(f,a.y,a.y+a.height);return d===c&&f===e?b:new m(c,e)}function p(h){var k=c.getZoom(h),g=1/k,j=g/c.getAspectRatio(),f=i.visibilityRatio,d=(f-t)*g,e=(f-t)*j,a=1-2*d,b=o-2*e;if(a<0){d+=t*a;a=0}if(b<0){e+=t*b;b=0}return new v.Rect(d,e,a,b)}d.getHomeBounds=function(){var b=c.getAspectRatio(),a=new y(k.x,k.y,k.width,k.height);if(s>=b){a.height=k.width/b;a.y=q.y-a.height/2}else{a.width=k.height*b;a.x=q.x-a.width/2}return a};d.getHomeCenter=function(){return q};d.getHomeZoom=function(){var a=s/c.getAspectRatio();return a>=1?1:a};d.getMinCenter=function(a){return p(a).getTopLeft()};d.getMaxCenter=function(a){return p(a).getBottomRight()};d.getMinZoom=function(){var a=c.getHomeZoom();if(i.minZoomDimension)var b=n.x<=n.y?i.minZoomDimension/e.x:i.minZoomDimension/(e.x*o);else var b=i.minZoomImageRatio*a;return g.min(b,a)};d.getMaxZoom=function(){var a=n.x*i.maxZoomPixelRatio/e.x;return g.max(a,c.getHomeZoom())};d.getAspectRatio=function(){return e.x/e.y};d.getContainerSize=function(){return new m(e.x,e.y)};d.getBounds=function(b){var d=c.getCenter(b),a=1/c.getZoom(b),e=a/c.getAspectRatio();return new y(d.x-a/2,d.y-e/2,a,e)};d.getCenter=function(r){var b=new m(h.getCurrent(),j.getCurrent()),g=new m(h.getTarget(),j.getTarget());if(r)return b;else if(!f)return g;var l=c.getZoom(),d=1/l,k=d/c.getAspectRatio(),i=new y(b.x-d/2,b.y-k/2,d,k),q=c.pixelFromPoint(f,a),p=f.minus(i.getTopLeft()).times(e.x/i.width),n=p.minus(q),o=n.divide(e.x*l);return g.plus(o)};d.getZoom=function(b){var a;if(b){a=l.getCurrent();return i.logarithmicZoom?w(a):a}else{a=l.getTarget();return i.logarithmicZoom?w(a):a}};d.applyConstraints=function(g){var h=c.getZoom(),d=r(h,c.getMinZoom(),c.getMaxZoom());h!=d&&c.zoomTo(d,f,g);var b=c.getCenter(),a=x(b,p());if(i.wrapHorizontal)a.x=b.x;if(i.wrapVertical)a.y=b.y;if(!b.equals(a)){var e=1/d,j=e/c.getAspectRatio();c.fitBounds(new y(a.x-t*e,a.y-t*j,e,j),g)}};d.ensureVisible=function(a){c.applyConstraints(a)};d.fitBounds=function(f,j){var h=c.getAspectRatio(),i=f.getCenter(),d=new y(f.x,f.y,f.width,f.height);if(d.getAspectRatio()>=h){d.height=f.width/h;d.y=i.y-d.height/2}else{d.width=f.height*h;d.x=i.x-d.width/2}c.panTo(c.getCenter(a),a);c.zoomTo(c.getZoom(a),b,a);var g=c.getBounds(),m=c.getZoom(),k=1/d.width;if(k==m||d.width==g.width){c.panTo(i,j);return}var l=g.getTopLeft().times(e.x/g.width).minus(d.getTopLeft().times(e.x/d.width)).divide(e.x/g.width-e.x/d.width);c.zoomTo(k,l,j)};d.goHome=function(b){var a=c.getCenter();if(i.wrapHorizontal){a.x=(1+a.x%1)%1;h.resetTo(a.x);h.update()}if(i.wrapVertical){a.y=(o+a.y%o)%o;j.resetTo(a.y);j.update()}c.fitBounds(k,b)};d.panBy=function(b,a){c.panTo(c.getCenter().plus(b),a)};d.panTo=function(b,q){if(q){h.resetTo(b.x);j.resetTo(b.y);return}if(!f){h.springTo(b.x);j.springTo(b.y);return}var l=c.getZoom(),d=1/l,k=d/c.getAspectRatio(),i=new y(h.getCurrent()-d/2,j.getCurrent()-k/2,d,k),p=c.pixelFromPoint(f,a),o=f.minus(i.getTopLeft()).times(e.x/i.width),m=o.minus(p),n=m.divide(e.x*l),g=b.minus(n);h.springTo(g.x);j.springTo(g.y)};d.zoomBy=function(d,b,a){c.zoomTo(c.getZoom()*d,b,a)};d.zoomTo=function(a,c,d){if(d)l.resetTo(i.logarithmicZoom?u(a):a);else l.springTo(i.logarithmicZoom?u(a):a);f=c instanceof m?c:b};d.resize=function(d,h){var f=c.getBounds(),b=f,g=d.x/e.x;e=new m(d.x,d.y);if(h){b.width=f.width*g;b.height=b.width/c.getAspectRatio()}c.fitBounds(b,a)};d.update=function(){var m=h.getCurrent(),n=j.getCurrent(),e=l.getCurrent();if(f)var k=c.pixelFromPoint(f,a);l.update();if(f&&l.getCurrent()!=e){var i=c.pixelFromPoint(f,a),g=i.minus(k),d=c.deltaPointsFromPixels(g,a);h.shiftBy(d.x);j.shiftBy(d.y)}else f=b;h.update();j.update();return h.getCurrent()!=m||j.getCurrent()!=n||l.getCurrent()!=e};d.deltaPixelsFromPoints=function(a,b){return a.times(e.x*c.getZoom(b))};d.deltaPointsFromPixels=function(a,b){return a.divide(e.x*c.getZoom(b))};d.pixelFromPoint=function(d,b){var a=c.getBounds(b);return d.minus(a.getTopLeft()).times(e.x/a.width)};d.pointFromPixel=function(d,b){var a=c.getBounds(b);return d.divide(e.x/a.width).plus(a.getTopLeft())};z()},V,E;(function(){var n="progid:DXImageTransform.Microsoft.Matrix(",j=" when it's not yet loaded.",h="Attempting to draw tile ",W=100,G=t,B=e.getBrowser(),P=e.getBrowserVersion(),bb=navigator.userAgent,R=!!r.createElement("canvas").getContext,T=r.documentElement||{},H=T.style||{},A=c,K=["msTransform","WebkitTransform","MozTransform"],f,x;while(f=K.shift())if(typeof H[f]!==J){A=a;x=/webkit/i.test(f);break}var X="-webkit-transform",L="WebkitTransition",Z=typeof H[L]!==J,O="progid:DXImageTransform.Microsoft.Matrix",Y=new RegExp(O+"\\(.*?\\)","g"),ab=function(){try{return B==C.IE&&!!r.documentElement.filters}catch(a){return c}}(),Q=B==C.SAFARI&&P<4,p=R&&!Q,F=!p&&A,I=c,M=typeof r.documentMode!==J?"bicubic":"nearest-neighbor";function o(f,h,i,d,e,g){var a=this;a.level=f;a.x=h;a.y=i;a.bounds=d;a.exists=e;a.url=g;a.elmt=b;a.image=b;a.loaded=c;a.loading=c;a.style=b;a.position=b;a.size=b;a.blendStart=b;a.opacity=b;a.distance=b;a.visibility=b;a.beingDrawn=c;a.lastDrawnTime=0;a.lastTouchTime=0}o.prototype.toString=function(){return this.level+"/"+this.x+"_"+this.y};o.prototype.drawHTML=function(l){var a=this;if(!a.loaded){q.error(h+a.toString()+j);return}if(!a.elmt){a.elmt=e.makeNeutralElement("img");a.elmt.src=a.url;a.style=a.elmt.style;a.style.position=w;a.style.msInterpolationMode=M;if(F)a.style[f+"Origin"]="0px 0px"}var m=a.elmt,r=a.image,c=a.style,b=a.position,i=a.size;m.parentNode!=l&&l.appendChild(m);if(F)c[f]=["matrix(",(i.x/r.width).toFixed(8),",0,0,",(i.y/r.height).toFixed(8),z,b.x.toFixed(8),x?z:"px,",b.y.toFixed(8),x?")":"px)"].join(d);else if(I){var p=l.clientWidth,o=l.clientHeight;c.width=p+k;c.height=o+k;c.filter=[n,"M11=",(i.x/p).toFixed(8),",M22=",(i.y/o).toFixed(8),",Dx=",b.x.toFixed(8),",Dy=",b.y.toFixed(8),")"].join(d)}else{b=b.apply(g.floor);i=i.apply(g.ceil);c.left=b.x+k;c.top=b.y+k;c.width=i.x+k;c.height=i.y+k}e.setElementOpacity(m,a.opacity)};o.prototype.drawCanvas=function(c){var a=this;if(!a.loaded){q.error(h+a.toString()+j);return}var b=a.position,d=a.size;c.globalAlpha=a.opacity;c.drawImage(a.image,b.x,b.y,d.x,d.y)};o.prototype.unload=function(){var a=this;a.elmt&&a.elmt.parentNode&&a.elmt.parentNode.removeChild(a.elmt);a.elmt=b;a.image=b;a.loaded=c;a.loading=c};E=v.OverlayPlacement={CENTER:0,TOP_LEFT:1,TOP:2,TOP_RIGHT:3,RIGHT:4,BOTTOM_RIGHT:5,BOTTOM:6,BOTTOM_LEFT:7,LEFT:8};function D(a){switch(a){case E.TOP_LEFT:return function(){};case E.TOP:return function(a,b){a.x-=b.x/2};case E.TOP_RIGHT:return function(a,b){a.x-=b.x};case E.RIGHT:return function(a,b){a.x-=b.x;a.y-=b.y/2};case E.BOTTOM_RIGHT:return function(a,b){a.x-=b.x;a.y-=b.y};case E.BOTTOM:return function(a,b){a.x-=b.x/2;a.y-=b.y};case E.BOTTOM_LEFT:return function(a,b){a.y-=b.y};case E.LEFT:return function(a,b){a.y-=b.y/2};case E.CENTER:default:return function(a,b){a.x-=b.x/2;a.y-=b.y/2}}}function u(c,a,d){var b=this;b.elmt=c;b.scales=a instanceof y;b.bounds=new y(a.x,a.y,a.width,a.height);b.adjust=D(a instanceof m?d:E.TOP_LEFT);b.position=new m(a.x,a.y);b.size=new m(a.width,a.height);b.style=c.style;b.naturalSize=new m(c.clientWidth,c.clientHeight)}u.prototype.destroy=function(){var b=this.elmt,a=this.style;b.parentNode&&b.parentNode.removeChild(b);a.top=d;a.left=d;a.position=d;if(this.scales){a.width=d;a.height=d}};u.prototype.drawHTML=function(m){var h=this,c=h.elmt,a=h.style,o=h.scales,j=h.naturalSize;if(c.parentNode!=m){m.appendChild(c);a.position=w;j.x=c.clientWidth;j.y=c.clientHeight}var e=h.position,b=h.size;if(!o){b.x=j.x=j.x||c.clientWidth;b.y=j.y=j.y||c.clientHeight}h.adjust(e,b);if(i.transformOverlays&&A){a[f+"Origin"]="0px 0px";a[f]=["translate(",e.x.toFixed(8),"px,",e.y.toFixed(8),"px)"].join(d);if(o){if(!c.clientWidth)a.width=l;if(!c.clientHeight)a.height=l;a[f]+=[" scale(",(b.x/c.clientWidth).toFixed(8),z,(b.y/c.clientHeight).toFixed(8),")"].join(d)}}else if(i.transformOverlays&&I){var q=m.clientWidth,p=m.clientHeight;a.width=q+k;a.height=p+k;a.filter=[n,"M11=",(b.x/q).toFixed(8),",M22=",(b.y/p).toFixed(8),",Dx=",e.x.toFixed(8),",Dy=",e.y.toFixed(8),")"].join(d)}else{e=e.apply(g.floor);b=b.apply(g.ceil);a.left=e.x+k;a.top=e.y+k;if(o){a.width=b.x+k;a.height=b.y+k}}};u.prototype.update=function(a,b){this.scales=a instanceof y;this.bounds=new y(a.x,a.y,a.width,a.height);this.adjust=D(a instanceof m?b:E.TOP_LEFT)};V=v.Drawer=function(f,A,ib){var h=this,z=e.getElement(ib),y=e.makeNeutralElement(p?"canvas":s),gb=p?y.getContext("2d"):b,T=new S,J=new U,eb=f.minLevel,db=f.maxLevel,fb=f.tileSize,X=f.tileOverlap,H=f.height/f.width,F={},D={},r={},v=[],k={},n=[],bb=[],K=0,L=0,I=c,j=a;h.elmt=z;h.profiler=J;(function(){y.style.width=l;y.style.height=l;y.style.position=w;z.style.textAlign="left";z.appendChild(y)})();function R(a){if(!F[a])F[a]=f.getNumTiles(a);return F[a]}function M(a){if(!D[a])D[a]=f.getPixelRatio(a);return D[a]}function hb(a,b,c,l,d,e){if(!r[a])r[a]={};if(!r[a][b])r[a][b]={};if(!r[a][b][c]){var g=(d+b%d)%d,h=(e+c%e)%e,i=f.getTileBounds(a,g,h),k=f.tileExists(a,g,h),m=f.getTileUrl(a,g,h);i.x+=1*(b-g)/d;i.y+=H*(c-h)/e;r[a][b][c]=new o(a,b,c,i,k,m)}var j=r[a][b][c];j.lastTouchTime=l;return j}function cb(a,c){a.loading=T.loadImage(a.url,e.createCallback(b,Z,a,c))}function Z(d,s,n){d.loading=c;if(I){q.error("Tile load callback in middle of drawing routine.");return}else if(!n){q.log("Tile "+d+" failed to load: "+d.url);d.exists=c;return}else if(s<L){q.log("Ignoring tile "+d+" loaded before reset: "+d.url);return}d.loaded=a;d.image=n;var k=v.length;if(v.length>=W){for(var r=g.ceil(g.log(fb)/g.log(2)),e=b,i=-1,h=v.length-1;h>=0;h--){var f=v[h];if(f.level<=r||f.beingDrawn)continue;else if(!e){e=f;i=h;continue}var m=f.lastTouchTime,l=e.lastTouchTime,p=f.level,o=e.level;if(m<l||m==l&&p>o){e=f;i=h}}if(e&&i>=0){e.unload();k=i}}v[k]=d;j=a}function Y(){r={};v=[]}function x(b,d,g){if(!k[b])return c;if(d===N||g===N){var f=k[b];for(var h in f)if(f.hasOwnProperty(h)){var e=f[h];for(var i in e)if(e.hasOwnProperty(i)&&!e[i])return c}return a}return k[b][d]===N||k[b][d][g]===N||k[b][d][g]===a}function ab(a,b,c){if(b===N||c===N)return x(a+1);else return x(a+1,2*b,2*c)&&x(a+1,2*b,2*c+1)&&x(a+1,2*b+1,2*c)&&x(a+1,2*b+1,2*c+1)}function V(a,b,d,c){if(!k[a]){q.error("Setting coverage for a tile before its level's coverage has been reset: "+a);return}if(!k[a][b])k[a][b]={};k[a][b][d]=c}function O(a){k[a]={}}function P(b,a){if(!b)return a;if(a.visibility>b.visibility)return a;else if(a.visibility==b.visibility)if(a.distance<b.distance)return a;return b}function E(b){for(var a=n.length-1;a>=0;a--)if(n[a].elmt==b)return a;return -1}function Q(){j=c;var Q=y,Fb=gb,gc=z,xb=p,D=bb;while(D.length>0){var e=D.pop();e.beingDrawn=c}var ub=A.getContainerSize(),sb=ub.x,rb=ub.y;if(xb){Q.width=sb;Q.height=rb;Fb.clearRect(0,0,sb,rb)}else Q.innerHTML=d;var qb=A.getBounds(a),s=qb.getTopLeft(),r=qb.getBottomRight();if(!i.wrapHorizontal&&(r.x<0||s.x>1))return;else if(!i.wrapVertical&&(r.y<0||s.y>H))return;var Rb=R,F=M,cc=hb,Yb=ab,I=V,Ob=O,Kb=x,Sb=X,Nb=K,bc=B===C.CHROME,ec=g.abs,hc=g.ceil,jb=g.floor,T=g.log,lb=g.max,k=g.min,q=A.deltaPixelsFromPoints,E=A.pixelFromPoint,pb=f.getTileAtPoint,Tb=i.alwaysBlend,U=1e3*i.blendTime,Lb=i.immediateRender,Y=i.minZoomDimension,fc=i.minImageRatio,W=i.wrapHorizontal,Z=i.wrapVertical,vb=i.wrapOverlays;if(!W){s.x=lb(s.x,0);r.x=k(r.x,1)}if(!Z){s.y=lb(s.y,0);r.y=k(r.y,H)}var S=b,L=c,u=(new Date).getTime(),mb=A.getCenter(),Ib=E(mb),Xb=q(F(0),c).x,nb=Lb?1:Xb;Y=Y||64;var J=lb(eb,jb(T(Y)/T(2))),Wb=q(F(0),a).x,tb=k(db,jb(T(Wb/G)/T(2)));J=k(J,tb);for(var h=tb;h>=J;h--){var zb=c,ob=q(F(h),a).x;if(!L&&ob>=G||h==J){zb=a;L=a}else if(!L)continue;Ob(h);var Pb=k(1,(ob-t)/t),Jb=q(F(h),c).x,Mb=nb/ec(nb-Jb),Hb=pb(h,s),v=pb(h,r),Eb=Rb(h),Ab=Eb.x,Bb=Eb.y;if(!W)v.x=k(v.x,Ab-1);if(!Z)v.y=k(v.y,Bb-1);for(var l=Hb.x;l<=v.x;l++)for(var o=Hb.y;o<=v.y;o++){var e=cc(h,l,o,u,Ab,Bb),fb=zb;I(h,l,o,c);if(!e.exists)continue;if(L&&!fb)if(Yb(h,l,o))I(h,l,o,a);else fb=a;if(!fb)continue;var Db=e.bounds.getTopLeft(),wb=e.bounds.getSize(),Zb=E(Db,a),kb=q(wb,a);if(!Sb)kb=kb.plus(new m(1,1));var ac=E(Db,c),dc=q(wb,c),Vb=ac.plus(dc.divide(2)),Qb=Ib.distanceTo(Vb);e.position=Zb;e.size=kb;e.distance=Qb;e.visibility=Mb;if(e.loaded){if(!e.blendStart)e.blendStart=u;var yb=u-e.blendStart,ib=U===0?1:k(1,yb/U);if(Tb)ib*=Pb;e.opacity=ib;D.push(e);if(ib>=1){I(h,l,o,a);bc&&e.lastDrawnTime!==Nb&&I(h,l,o,c)}else if(yb<U)j=a;e.lastDrawnTime=u}else if(!e.loading)S=P(S,e)}if(Kb(h))break}for(var w=D.length-1;w>=0;w--){var e=D[w];if(xb)e.drawCanvas(Fb);else e.drawHTML(Q);e.beingDrawn=a}for(var Ub=n.length,w=0;w<Ub;w++){var N=n[w],Gb=N.bounds,Cb=Gb.getTopLeft();if(vb&&W)Cb.x+=jb(mb.x);if(vb&&Z);N.position=E(Cb,a);N.size=q(Gb.getSize(),a);N.drawHTML(z)}if(S){cb(S,u);j=a}K=u}h.addOverlay=function(b,d,c){var b=e.getElement(b);if(E(b)>=0)return;n.push(new u(b,d,c));j=a};h.updateOverlay=function(b,f,d){var b=e.getElement(b),c=E(b);if(c>=0){n[c].update(f,d);j=a}};h.removeOverlay=function(c){var c=e.getElement(c),b=E(c);if(b>=0){n[b].destroy();n.splice(b,1);j=a}};h.clearOverlays=function(){while(n.length>0){n.pop().destroy();j=a}};h.needsUpdate=function(){return j};h.numTilesLoaded=function(){return v.length};h.reset=function(){Y();L=(new Date).getTime();j=a};h.update=function(){J.beginUpdate();I=a;Q();I=c;J.endUpdate()};h.idle=function(){}}})();var Y,G;(function(){var L="----seadragon----",Q=e.getBrowser();G=v.ControlAnchor={NONE:0,TOP_LEFT:1,TOP_RIGHT:2,BOTTOM_RIGHT:3,BOTTOM_LEFT:4};function P(c,b,a){if(b==G.TOP_RIGHT||b==G.BOTTOM_RIGHT)a.insertBefore(c,a.firstChild);else a.appendChild(c)}function f(f,c,d){var b=this,a=e.makeNeutralElement(F);b.elmt=f;b.anchor=c;b.container=d;b.wrapper=a;a.style.display=B;a.appendChild(f);if(c==G.NONE)a.style.width=a.style.height=l;P(a,c,d)}f.prototype.destroy=function(){var a=this;a.wrapper.removeChild(a.elmt);a.container.removeChild(a.wrapper)};f.prototype.isVisible=function(){return this.wrapper.style.display!=A};f.prototype.setVisible=function(a){this.wrapper.style.display=a?B:A};f.prototype.setOpacity=function(b){if(this.elmt[L]&&Q==C.IE)e.setElementOpacity(this.elmt,b,a);else e.setElementOpacity(this.wrapper,b,a)};var k="fullpage",E="home",t="zoomin",n="zoomout",J="_rest.png",y="_grouphover.png",z="_hover.png",D="_pressed.png";function N(d){var j=b,f=c,q=b,l=b;function H(){d.viewport&&d.viewport.goHome()}function w(){d.setFullPage(!d.isFullPage());j.emulateExit();d.viewport&&d.viewport.applyConstraints()}function s(){l=(new Date).getTime();q=i.zoomPerSecond;f=a;o()}function r(){l=(new Date).getTime();q=1/i.zoomPerSecond;f=a;o()}function m(){f=c}function o(){h.setTimeout(F,p)}function F(){if(f&&d.viewport){var a=(new Date).getTime(),c=a-l,b=g.pow(q,c/1e3);d.viewport.zoomBy(b);d.viewport.applyConstraints();l=a;o()}}function v(){if(d.viewport){f=c;d.viewport.zoomBy(i.zoomPerClick/1);d.viewport.applyConstraints()}}function u(){if(d.viewport){f=c;d.viewport.zoomBy(1/i.zoomPerClick);d.viewport.applyConstraints()}}function B(){j.emulateEnter();j.emulateExit()}function e(b,a){return i.imagePath+b+a}var I=new O(x.getString("Tooltips.ZoomIn"),e(t,J),e(t,y),e(t,z),e(t,D),s,m,v,s,m),C=new O(x.getString("Tooltips.ZoomOut"),e(n,J),e(n,y),e(n,z),e(n,D),r,m,u,r,m),G=new O(x.getString("Tooltips.Home"),e(E,J),e(E,y),e(E,z),e(E,D),b,H,b,b,b),A=new O(x.getString("Tooltips.FullPage"),e(k,J),e(k,y),e(k,z),e(k,D),b,w,b,b,b);j=new R([I,C,G,A]);j.elmt[L]=a;d.addEventListener("open",B);return j.elmt}Y=v.Viewer=function(v){var n=this,t=n,P=e.getElement(v),v=e.makeNeutralElement(s),E=e.makeNeutralElement(s),eb=e.makeNeutralElement(s),fb=e.makeNeutralElement(s),db=e.makeNeutralElement(s),cb=e.makeNeutralElement(s),B=b,J=b,k=b,O=b,z=new W,D=new M(E),S=new M(v),y=[],ab=a,ib=b,L=b,kb=1e3,Ab=2e3,ib=b,ab=c,yb=r.body.style.width,wb=r.body.style.height,tb=r.body.style.overflow,ub=r.documentElement.style.overflow,bb=new m(1,1),C=b,R=0,nb=0,qb=b,ob=b,F=c,T=c,Y=c;n.container=P;n.elmt=v;n.source=b;n.drawer=b;n.viewport=b;n.profiler=b;n.tracker=D;function Jb(){var c=E.style,b=v.style,g=eb.style,i=fb.style,f=db.style,e=cb.style;b.width=l;b.height=l;b.position=u;b.left=j;b.top=j;b.textAlign="left";c.width=l;c.height=l;c.overflow=o;c.position=w;c.top=j;c.left=j;g.position=i.position=f.position=e.position=w;g.top=i.top=j;g.left=e.left=j;i.right=f.right=j;e.bottom=f.bottom=j;D.clickHandler=Fb;D.pressHandler=Gb;D.dragHandler=Hb;D.releaseHandler=Db;D.scrollHandler=Eb;D.setTracking(a);L=N(t);L.style.marginRight="4px";L.style.marginBottom="4px";t.addControl(L,G.BOTTOM_RIGHT);S.enterHandler=lb;S.exitHandler=pb;S.releaseHandler=Bb;S.setTracking(a);h.setTimeout(Q,1);v.appendChild(E);v.appendChild(eb);v.appendChild(fb);v.appendChild(db);v.appendChild(cb);P.innerHTML=d;P.appendChild(v)}function Z(f){var a="normal",c=r.createTextNode(f);E.innerHTML=d;E.appendChild(e.makeCenteredNode(c));var b=c.parentNode.style;b.fontFamily="verdana";b.fontSize="13px";b.fontSizeAdjust=A;b.fontStyle=a;b.fontStretch=a;b.fontVariant=a;b.fontWeight=a;b.lineHeight="1em";b.textAlign="center";b.textDecoration=A}function vb(){B&&zb();R=(new Date).getTime();h.setTimeout(function(){R>nb&&Z(x.getString("Messages.Loading"))},2e3);return R}function gb(g,b,f){nb=(new Date).getTime();if(g<R){q.log("Ignoring out-of-date open.");z.trigger("ignore",t);return}else if(!b){Z(f);z.trigger("error",t);return}E.innerHTML=d;C=e.getElementSize(v);if(C.x===0||C.y===0){h.setTimeout(function(){gb(g,b,f)},p);return}B=b;k=new X(C,B.dimensions);J=new V(B,k,E);O=new U;t.source=B;t.viewport=k;t.drawer=J;t.profiler=O;F=c;T=a;rb(Ib);z.trigger("open",t)}function zb(){t.source=B=b;t.viewport=k=b;t.drawer=J=b;t.profiler=O=b;E.innerHTML=d}function rb(c,a){if(F)return h.setTimeout(c,1);var b=(new Date).getTime(),a=a?a:b,d=a+1e3/60,e=g.max(1,d-b);return h.setTimeout(c,e)}function xb(){if(!B)return;O.beginUpdate();var b=e.getElementSize(v);if(!b.equals(C)&&b.x>0&&b.y>0){k.resize(b,a);C=b;z.trigger("resize",t)}var d=k.update();if(!F&&d){z.trigger("animationstart",t);hb()}if(d){J.update();z.trigger("animation",t)}else if(T||J.needsUpdate()){J.update();T=c}else J.idle();if(F&&!d){z.trigger("animationfinish",t);!Y&&Q()}F=d;O.endUpdate()}function Ib(){if(!B)return;var a=(new Date).getTime();xb();rb(arguments.callee,a)}function mb(b){for(var a=y.length-1;a>=0;a--)if(y[a].elmt==b)return a;return -1}function jb(){h.setTimeout(Cb,20)}function Cb(){if(ab){var c=(new Date).getTime(),d=c-ib,a=1-d/Ab;a=g.min(1,a);a=g.max(0,a);for(var b=y.length-1;b>=0;b--)y[b].setOpacity(a);a>0&&jb()}}function hb(){ab=c;for(var a=y.length-1;a>=0;a--)y[a].setOpacity(1)}function Q(){if(!i.autoHideControls)return;ab=a;ib=(new Date).getTime()+kb;h.setTimeout(jb,kb)}function lb(){Y=a;hb()}function pb(e,d,a){if(!a){Y=c;!F&&Q()}}function Bb(e,d,b,a){if(!a){Y=c;!F&&Q()}}function Fb(g,c,e,f){if(k&&e){var b=i.zoomPerClick,d=f?1/b:b;k.zoomBy(d,k.pointFromPixel(c,a));k.applyConstraints()}}function Gb(b,a){if(k){qb=a;ob=k.getCenter()}}function Hb(f,d,e){if(k)if(i.constrainDuringPan){var b=d.minus(qb),c=k.deltaPointsFromPixels(b.negate(),a);k.panTo(ob.plus(c));k.applyConstraints()}else k.panBy(k.deltaPointsFromPixels(e.negate(),a))}function Db(d,c,a){a&&k&&k.applyConstraints()}function Eb(e,b,d){if(k){var c=g.pow(i.zoomPerScroll,d);k.zoomBy(c,k.pointFromPixel(b,a));k.applyConstraints()}}function sb(a){a=e.getEvent(a);a.keyCode===27&&t.setFullPage(c)}n.isOpen=function(){return !!B};n.openDzi=function(a,f){var d=vb(),c=e.createCallback(b,gb,d);switch(typeof a){case I:K.createFromXml(a,f,c);break;default:K.createFromJson(a,c)}};n.openTileSource=function(b){var a=vb();h.setTimeout(function(){gb(a,b)},1)};n.close=function(){if(!B)return;zb()};n.addControl=function(a,d){var a=e.getElement(a);if(mb(a)>=0)return;var c=b;switch(d){case G.TOP_RIGHT:c=fb;a.style.position=u;break;case G.BOTTOM_RIGHT:c=db;a.style.position=u;break;case G.BOTTOM_LEFT:c=cb;a.style.position=u;break;case G.TOP_LEFT:c=eb;a.style.position=u;break;case G.NONE:default:c=v;a.style.position=w}y.push(new f(a,d,c))};n.removeControl=function(b){var b=e.getElement(b),a=mb(b);if(a>=0){y[a].destroy();y.splice(a,1)}};n.clearControls=function(){while(y.length>0)y.pop().destroy()};n.getNavControl=function(){return L};n.isDashboardEnabled=function(){for(var b=y.length-1;b>=0;b--)if(y[b].isVisible())return a;return c};n.isFullPage=function(){return v.parentNode==r.body};n.isMouseNavEnabled=function(){return D.isTracking()};n.isVisible=function(){return v.style.visibility!=o};n.setDashboardEnabled=function(b){for(var a=y.length-1;a>=0;a--)y[a].setVisible(b)};n.setFullPage=function(j){if(j==t.isFullPage())return;var q=r.body,c=q.style,i=r.documentElement.style,f=v.style,h=E.style;if(j){tb=c.overflow;ub=i.overflow;c.overflow=o;i.overflow=o;yb=c.width;wb=c.height;c.width=l;c.height=l;h.backgroundColor="black";h.color="white";f.position=H;f.zIndex="99999999";q.appendChild(v);C=e.getWindowSize();e.addEvent(r,"keydown",sb);lb()}else{c.overflow=tb;i.overflow=ub;c.width=yb;c.height=wb;h.backgroundColor=d;h.color=d;f.position=u;f.zIndex=d;P.appendChild(v);C=e.getElementSize(P);e.removeEvent(r,"keydown",sb);pb()}if(k){var p=k.getBounds();k.resize(C);var n=k.getBounds();if(j)bb=new m(n.width/p.width,n.height/p.height);else{k.update();k.zoomBy(g.max(bb.x,bb.y),b,a)}T=a;z.trigger("resize",t);xb()}};n.setMouseNavEnabled=function(a){D.setTracking(a)};n.setVisible=function(a){v.style.visibility=a?d:o};n.showMessage=function(a,b){if(!b){Z(a);return}h.setTimeout(function(){!t.isOpen()&&Z(a)},b)};n.addEventListener=function(a,b){z.addListener(a,b)};n.removeEventListener=function(a,b){z.removeListener(a,b)};Jb()}})()})(window,document,Math);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//



// Vendor Files





;
(function() {


}).call(this);
//======================================================================================================================
// Some utilities for working with gigapans.
//
// Dependencies: none
//
// Author: Chris Bartley (bartley@cmu.edu)
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
   org = {};
}
else {
   if (typeof org != "object") {
      var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
      alert(orgExistsMessage);
      throw new Error(orgExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan) {
   org.gigapan = {};
}
else {
   if (typeof org.gigapan != "object") {
      var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
      alert(orgGigapanExistsMessage);
      throw new Error(orgGigapanExistsMessage);
   }
}
//======================================================================================================================

//======================================================================================================================
// CODE
//======================================================================================================================
(function() {
   org.gigapan.GigapanUtils = function() {
   };

   /**
    * Creates the tile server URL prefix for gigapan with the given ID and (optionally) auth key. The ID can be anything
    * that can be parsed down to a positive integer.  The authKey is ignored if undefined, null, or equal to the empty
    * string after trimming.
    *
    * Throws a TypeError if the id undefined or null.
    *
    * @param id the ID of the gigapan (required)
    * @param authKey the auth key of the gigapan (optional)
    * @returns {string} the tile server URL prefix
    */
   org.gigapan.GigapanUtils.createTileSourceUrlPrefixForGigapan = function(id, authKey) {
      if (typeof id === 'undefined' || id == null) {
         throw new TypeError("GigapanUtils.createTileSourceUrlPrefixForGigapan: id cannot be null or undefined");
      }

      var intId = parseInt(id);
      if (isNaN(intId)) {
         throw new TypeError("GigapanUtils.createTileSourceUrlPrefixForGigapan: id must be parseable as an integer");
      }

      if (intId <= 0) {
         throw new TypeError("GigapanUtils.createTileSourceUrlPrefixForGigapan: id must be a positive integer");
      }

      // compute the index of the tile server for this gigapan (note: this may change in the future, perhaps without warning!)
      var tileServerIndex = '' + Math.floor(id / 1000);
      if (tileServerIndex.length < 2) {
         tileServerIndex = '0' + tileServerIndex;
      }

      var urlPrefix = "http://tile" + tileServerIndex + ".gigapan.org/gigapans0/" + id + "/tiles";

      if (typeof authKey !== 'undefined' && authKey != null) {
         var trimmedAuthKey = authKey.trim();
         if (trimmedAuthKey.length > 0) {
            urlPrefix += "." + trimmedAuthKey;
         }
      }

      return urlPrefix;
   };
})();
//======================================================================================================================
;
//======================================================================================================================
// A Seadragon.TileSource for displaying gigapans.  Based on code by Jason Buchheim.
//
// Dependencies: Microsoft Seadragon Ajax (http://livelabs.com/seadragon-ajax/)
//
// Author: Chris Bartley (bartley@cmu.edu)
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
   org = {};
}
else {
   if (typeof org != "object") {
      var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
      alert(orgExistsMessage);
      throw new Error(orgExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan) {
   org.gigapan = {};
}
else {
   if (typeof org.gigapan != "object") {
      var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
      alert(orgGigapanExistsMessage);
      throw new Error(orgGigapanExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan.seadragon) {
   org.gigapan.seadragon = {};
}
else {
   if (typeof org.gigapan.seadragon != "object") {
      var orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object";
      alert(orgGigapanSeadragonExistsMessage);
      throw new Error(orgGigapanSeadragonExistsMessage);
   }
}
//======================================================================================================================

//======================================================================================================================
// DEPENDECIES
//======================================================================================================================
if (!window.Seadragon) {
   var noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.GigapanTileSource.js";
   alert(noSeadragonMsg);
   throw new Error(noSeadragonMsg);
}
//======================================================================================================================

//======================================================================================================================
// CODE
//======================================================================================================================
(function() {
   org.gigapan.seadragon.GigapanTileSource = function(urlPrefix, width, height) {
      Seadragon.TileSource.call(this, width, height, 256, 0, 8);

      var GC_TILE = ["0", "1", "2", "3"];

      this.getTileUrl = function(level, x, y) {
         if (level < 8) {
            level = 0;
         }
         else {
            if (level >= 8) {
               level = level - 8;
            }
         }
         var name = "r";
         var bit = 1 << level >> 1;
         while (bit) {
            name = name + GC_TILE[(x & bit ? (1) : (0)) + (y & bit ? (2) : (0))];
            bit = bit >> 1;
         }

         var url = urlPrefix;

         // make sure the URL doesn't end with a slash
         if (urlPrefix != null && urlPrefix.indexOf('/', urlPrefix.length - 1) !== -1) {
            url = urlPrefix.substr(0, urlPrefix.length - 1);
         }

         var i = 0;
         while (i < name.length - 3) {
            url = url + ("/" + name.substr(i, 3));
            i = i + 3;
         }
         return (url + "/" + name + '.jpg');
      };

      this.getTileBounds = function(level, x, y) {
         var self = this;
         var dimensionsScaled = self.dimensions.times(self.getLevelScale(level));
         var px = (x === 0) ? 0 : self.tileSize * x - self.tileOverlap;
         var py = (y === 0) ? 0 : self.tileSize * y - self.tileOverlap;
         var sx = self.tileSize + (x === 0 ? 1 : 2) * self.tileOverlap;
         var sy = self.tileSize + (y === 0 ? 1 : 2) * self.tileOverlap;
         var scale = 1.0 / dimensionsScaled.x;
         return new Seadragon.Rect(px * scale, py * scale, sx * scale, sy * scale);
      };

      org.gigapan.seadragon.GigapanTileSource.prototype = new Seadragon.TileSource();
      org.gigapan.seadragon.GigapanTileSource.prototype.constructor = org.gigapan.seadragon.GigapanTileSource;
   };
})();
//======================================================================================================================
// Some utilities for working with gigapans and seadragon.
//
// Dependencies: Microsoft Seadragon Ajax (http://livelabs.com/seadragon-ajax/)
//
// Author: Chris Bartley (bartley@cmu.edu)
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
   org = {};
}
else {
   if (typeof org != "object") {
      var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
      alert(orgExistsMessage);
      throw new Error(orgExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan) {
   org.gigapan = {};
}
else {
   if (typeof org.gigapan != "object") {
      var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
      alert(orgGigapanExistsMessage);
      throw new Error(orgGigapanExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan.seadragon) {
   org.gigapan.seadragon = {};
}
else {
   if (typeof org.gigapan.seadragon != "object") {
      var orgGigapanSeadragonExistsMessage = "Error: failed to create org.gigapan.seadragon namespace: org.gigapan.seadragon already exists and is not an object";
      alert(orgGigapanSeadragonExistsMessage);
      throw new Error(orgGigapanSeadragonExistsMessage);
   }
}
//======================================================================================================================

//======================================================================================================================
// DEPENDECIES
//======================================================================================================================
if (!window.Seadragon) {
   var noSeadragonMsg = "The Seadragon library is required by org.gigapan.seadragon.SeadragonUtils.js";
   alert(noSeadragonMsg);
   throw new Error(noSeadragonMsg);
}
//======================================================================================================================

//======================================================================================================================
// CODE
//======================================================================================================================
(function() {
   org.gigapan.seadragon.SeadragonUtils = function() {
   };

   org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect = function(xmin, ymin, xmax, ymax, gigapanWidth) {
      var xmin2 = xmin / gigapanWidth;
      var ymin2 = ymin / gigapanWidth;
      var xmax2 = xmax / gigapanWidth;
      var ymax2 = ymax / gigapanWidth;

      return new Seadragon.Rect(xmin2,
                                ymin2,
                                xmax2 - xmin2,
                                ymax2 - ymin2);
   };

   org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect2 = function(rect, gigapanWidth) {
      var topLeft = rect.getTopLeft();
      var bottomRight = rect.getBottomRight();
      return org.gigapan.seadragon.SeadragonUtils.convertGigapanRectToSeadragonRect(topLeft.x,
                                                                                    topLeft.y,
                                                                                    bottomRight.x,
                                                                                    bottomRight.y,
                                                                                    gigapanWidth);
   };

   org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect = function(xmin, ymin, xmax, ymax, gigapanWidth) {
      var xmin2 = xmin * gigapanWidth;
      var ymin2 = ymin * gigapanWidth;
      var xmax2 = xmax * gigapanWidth;
      var ymax2 = ymax * gigapanWidth;
      return new Seadragon.Rect(xmin2,
                                ymin2,
                                xmax2 - xmin2,
                                ymax2 - ymin2);
   };

   org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect2 = function(rect, gigapanWidth) {
      var topLeft = rect.getTopLeft();
      var bottomRight = rect.getBottomRight();
      return org.gigapan.seadragon.SeadragonUtils.convertSeadragonRectToGigapanRect(topLeft.x,
                                                                                    topLeft.y,
                                                                                    bottomRight.x,
                                                                                    bottomRight.y,
                                                                                    gigapanWidth);
   };

   org.gigapan.seadragon.SeadragonUtils.convertSeadragonPointToGigapanPoint = function(seadragonPoint, gigapanWidth) {
      return new Seadragon.Point(seadragonPoint.x * gigapanWidth,
                                 seadragonPoint.y * gigapanWidth);
   };

   org.gigapan.seadragon.SeadragonUtils.convertSeadragonViewerCoordsToSeadragonCoords = function(pointInViewerCoords, viewer) {
      return viewer.viewport.pointFromPixel(pointInViewerCoords, true);
   };

   org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonViewerCoords = function(pointInPageCoords, viewer) {
      var viewerPositionInPageCoords = Seadragon.Utils.getElementPosition(viewer.elmt);
      return pointInPageCoords.minus(viewerPositionInPageCoords);
   };

   org.gigapan.seadragon.SeadragonUtils.convertPageCoordsToSeadragonCoords = function(pointInPageCoords, viewer) {
      var pointInViewerCoords = this.convertPageCoordsToSeadragonViewerCoords(pointInPageCoords, viewer);
      return this.convertSeadragonViewerCoordsToSeadragonCoords(pointInViewerCoords, viewer);
   };

})();
//======================================================================================================================
;
//======================================================================================================================
// A tool used for creating snapshots of gigapans.  The tool must be instantiated after page load.  The constructor
// requires one argument and has an optional second argument:
// 1) An instance of a Seadragon.Viewer in which the snapshot tool will be placed as an overlay.
// 2) A configuration object containing either or both of the following properties:
//    * aspectRatio:  The aspect ratio (width / height) to which snapshots should be constrained.  If undefined or null,
//                    the snapshot aspect ratio will not be constrained.
//    * useMask:      A boolean specifying whether the greyed-out mask around the snapshot bounds should be shown when
//                    snapshotting.  Defaults to false if undefined.
//
// Users must ensure that the setGigapanDimensions() method is called 1) before the tool is made visible and; 2) any
// time a new gigapan is loaded in the viewer.
//
// Dependencies:
// * jQuery (http://jquery.com/)
// * Microsoft Seadragon Ajax (http://livelabs.com/seadragon-ajax/)
// * org.gigapan.seadragon.SeadragonUtils
// * org.gigapan.snapshot.SnapshotTool.css
//
// Authors: Chris Bartley (bartley@cmu.edu), Jim Garrison
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "org" if it doesn't exist.  Throw an error if it does exist but is not an object.
var org;
if (!org) {
   org = {};
}
else if (typeof org != "object") {
   var orgExistsMessage = "Error: failed to create org namespace: org already exists and is not an object";
   alert(orgExistsMessage);
   throw new Error(orgExistsMessage);
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan) {
   org.gigapan = {};
}
else if (typeof org.gigapan != "object") {
   var orgGigapanExistsMessage = "Error: failed to create org.gigapan namespace: org.gigapan already exists and is not an object";
   alert(orgGigapanExistsMessage);
   throw new Error(orgGigapanExistsMessage);
}

// Repeat the creation and type-checking for the next level
if (!org.gigapan.snapshot) {
   org.gigapan.snapshot = {};
}
else if (typeof org.gigapan.snapshot != "object") {
   var orgGigapanSnapshotExistsMessage = "Error: failed to create org.gigapan.snapshot namespace: org.gigapan.snapshot already exists and is not an object";
   alert(orgGigapanSnapshotExistsMessage);
   throw new Error(orgGigapanSnapshotExistsMessage);
}
//======================================================================================================================

//======================================================================================================================
// DEPENDECIES
//======================================================================================================================
if (!window.$) {
   var nojQueryMsg = "The jQuery library is required by org.gigapan.snapshot.SnapshotTool.js";
   alert(nojQueryMsg);
   throw new Error(nojQueryMsg);
}
//----------------------------------------------------------------------------------------------------------------------
if (!window.Seadragon) {
   var noSeadragonMsg = "The Seadragon library is required by org.gigapan.snapshot.SnapshotTool.js";
   alert(noSeadragonMsg);
   throw new Error(noSeadragonMsg);
}
//----------------------------------------------------------------------------------------------------------------------
if (!window.org.gigapan.seadragon.SeadragonUtils) {
   var noSeadragonUtilsMsg = "The org.gigapan.seadragon.SeadragonUtils library is required by org.gigapan.snapshot.SnapshotTool.js";
   alert(noSeadragonUtilsMsg);
   throw new Error(noSeadragonUtilsMsg);
}
//======================================================================================================================

//======================================================================================================================
// CODE
//======================================================================================================================
(function() {
   var jQuery = window.$;
   var SeadragonUtils = org.gigapan.seadragon.SeadragonUtils;

   var DEFAULT_ASPECT_RATIO = null;    // Aspect ratio of the snapshot. If null or undefined, then no constraint is used.
   var DEFAULT_USE_MASK = false;       // whether the mask should be applied

   var gigapanWidth = null;
   var gigapanHeight = null;

   function determineShadedAreaRect(i, bounds_rect) {
      var dimensions = new Seadragon.Point(1, 1 / viewer.source.aspectRatio);
      var rv;
      if (i == 0) {
         rv = new Seadragon.Rect(0, 0, bounds_rect.x, bounds_rect.y + bounds_rect.height);
      }
      else if (i == 1) {
         rv = new Seadragon.Rect(bounds_rect.x, 0, dimensions.x - bounds_rect.x, bounds_rect.y);
      }
      else if (i == 2) {
         rv = new Seadragon.Rect(bounds_rect.x + bounds_rect.width, bounds_rect.y, dimensions.x - bounds_rect.x - bounds_rect.width, dimensions.y - bounds_rect.y);
      }
      else if (i == 3) {
         rv = new Seadragon.Rect(0, bounds_rect.y + bounds_rect.height, bounds_rect.x + bounds_rect.width, dimensions.y - bounds_rect.y - bounds_rect.height);
      }

      rv.width = Math.max(0, rv.width);
      rv.height = Math.max(0, rv.height);

      return rv;
   }

   org.gigapan.snapshot.SnapshotTool = function(viewer, desiredConfig) {
      var snapshotToolBoundsSelector = null;
      var snapshotToolBoundsHandles = new Array(8);   // in clockwise order starting from top-left corner
      var snapshotToolBoundsHandlePositionsInPointsCoords = new Array(snapshotToolBoundsHandles.length);
      var snapshotToolBoundsHandleMouseTrackers = new Array(snapshotToolBoundsHandles.length);
      var snapshotToolShadedAreas = new Array(4);
      var snapshotToolBoundsSelectorMouseTracker = null;
      var isSnapshotToolVisible = false;

      var config = {
         aspectRatio : DEFAULT_ASPECT_RATIO,
         useMask : DEFAULT_USE_MASK
      };
      if (typeof desiredConfig !== 'undefined' && desiredConfig != null) {
         if (desiredConfig.hasOwnProperty('aspectRatio')) {
            config['aspectRatio'] = desiredConfig['aspectRatio'];
         }
         if (desiredConfig.hasOwnProperty('useMask')) {
            config['useMask'] = desiredConfig['useMask'];
         }
      }
      var willUseMask = (config['useMask'] !== undefined && config['useMask'] == true);
      var willConstrainSnapshotAspectRatio = (config['aspectRatio'] !== undefined && config['aspectRatio'] != null);
      var snapshotAspectRatio = (willConstrainSnapshotAspectRatio) ? Math.abs(config['aspectRatio']) : DEFAULT_ASPECT_RATIO;

      // ------------------------------------------------------------------------------------------------------------------
      // create the snapshot tool bounds selector
      snapshotToolBoundsSelector = document.createElement("div");
      snapshotToolBoundsSelector.id = "snapshot_tool_bounds_selector";
      snapshotToolBoundsSelector.className = "snapshot_tool_bounds_selector";

      // create an inner div so we have a combination black/white border
      jQuery(snapshotToolBoundsSelector).append("<div></div>");

      // create the snapshot tool bounds handles
      jQuery.each(snapshotToolBoundsHandles,
                  function(i) {
                     snapshotToolBoundsHandles[i] = document.createElement("div");
                     snapshotToolBoundsHandles[i].id = "snapshot_tool_bounds_handle_" + i;
                     snapshotToolBoundsHandles[i].className = "snapshot_tool_bounds_handle";
                  });

      // create the snapshot tool shaded areas
      jQuery.each(snapshotToolShadedAreas,
                  function(i) {
                     snapshotToolShadedAreas[i] = jQuery('<div><div></div></div>')[0];
                     if (willUseMask) {
                        $(snapshotToolShadedAreas[i]).addClass("snapshot_tool_shaded_area");
                     }
                  });

      // ------------------------------------------------------------------------------------------------------------------
      // A listener to keep track of the the snapshot tool's bounds handle positions (in seadragon points).  We need to do
      // this because there's currently no way to query the seadragon Drawer to get the current position of an overlay.  We
      // don't want to simply compute the position from the current pixel position since the precision varies with the zoom
      // level.  See: http://getsatisfaction.com/livelabs/topics/how_to_get_current_position_of_an_overlay
      var snapshotToolBoundsHandlePositionListener = function(newBoundsHandlePositionsInPointsCoords) {
         if (newBoundsHandlePositionsInPointsCoords) {
            for (var j = 0; j < newBoundsHandlePositionsInPointsCoords.length; j++) {
               snapshotToolBoundsHandlePositionsInPointsCoords[j] = newBoundsHandlePositionsInPointsCoords[j];
            }
         }
      };

      // ------------------------------------------------------------------------------------------------------------------
      // create a mouse tracker for the snapshot bounds rectangle

      snapshotToolBoundsSelectorMouseTracker = new SnapshotBoundsMouseTracker(snapshotToolBoundsSelector, viewer, snapshotToolBoundsHandles, snapshotToolShadedAreas, snapshotToolBoundsHandlePositionListener);
      snapshotToolBoundsSelectorMouseTracker.setTracking(true);  // begin tracking

      // ------------------------------------------------------------------------------------------------------------------

      // create mouse trackers for the snapshot bounds handles
      jQuery.each(snapshotToolBoundsHandles,
                  function(i) {
                     var oppositeHandleIndex = (i + 4 >= 8) ? i - 4 : i + 4;
                     snapshotToolBoundsHandleMouseTrackers[i] = new SnapshotBoundsHandleMouseTracker(
                           i,
                           oppositeHandleIndex,
                           snapshotToolBoundsHandles,
                           viewer,
                           snapshotToolShadedAreas,
                           snapshotToolBoundsSelector,
                           snapshotToolBoundsHandlePositionListener,
                           willConstrainSnapshotAspectRatio,
                           snapshotAspectRatio);
                     snapshotToolBoundsHandleMouseTrackers[i].setTracking(true);  // begin tracking
                  });

      // ------------------------------------------------------------------------------------------------------------------

      // Create an event listener which will turn on/off the snapshot tool mouse listeners if the viewer is animating
      var setSnapshotToolEnabledBasedOnAnimationState = function(isAnimating) {
         snapshotToolBoundsSelectorMouseTracker.setTracking(!isAnimating);

         jQuery.each(snapshotToolBoundsHandles,
                     function(i) {
                        snapshotToolBoundsHandleMouseTrackers[i].setTracking(!isAnimating);
                     });

         var boundsSelectorClassName = (isAnimating) ? "snapshot_tool_bounds_selector_disabled" : "snapshot_tool_bounds_selector";
         var boundsSelectorHandlesClassName = (isAnimating) ? "snapshot_tool_bounds_handle_disabled" : "snapshot_tool_bounds_handle";

         snapshotToolBoundsSelector.className = boundsSelectorClassName;
         jQuery.each(snapshotToolBoundsHandles,
                     function(i) {
                        snapshotToolBoundsHandles[i].className = boundsSelectorHandlesClassName;
                     });

      };

      // register the listeners with the viewer
      viewer.addEventListener("animationstart",
                              function() {
                                 setSnapshotToolEnabledBasedOnAnimationState(true);
                              });
      viewer.addEventListener("animationfinish",
                              function() {
                                 setSnapshotToolEnabledBasedOnAnimationState(false);
                              });
      // ---------------------------------------------------------------------------------------------------------------
      /**
       * Registers the width and height of the gigapan with the snapshot tool.  It is critical that this method be
       * called 1) before the tool is made visible and; 2) any time a new gigapan is loaded in the viewer.
       */
      this.setGigapanDimensions = function(width, height) {
         gigapanWidth = width;
         gigapanHeight = height;

         // tell the bounds rect and the handles what the min/max coordinates are so the user can't drag the bounds rect
         // outside of the bounds of the gigapan
         var pointsCoordinatesRangeRect = new Seadragon.Rect(0, 0, 1, height / width);
         snapshotToolBoundsSelectorMouseTracker.setPointsCoordinatesRangeRect(pointsCoordinatesRangeRect);
         jQuery.each(snapshotToolBoundsHandleMouseTrackers,
                     function(i) {
                        snapshotToolBoundsHandleMouseTrackers[i].setPointsCoordinatesRangeRect(pointsCoordinatesRangeRect);
                     });
      };

      /**
       * Returns a Seadragon.Rect specifying the current bounds (in Gigapan coordinates) of the snapshot tool.
       */
      this.getToolBoundsInGigapanCoords = function() {
         var topLeftCornerInGigapanCoords = SeadragonUtils.convertSeadragonPointToGigapanPoint(snapshotToolBoundsHandlePositionsInPointsCoords[0], gigapanWidth);
         var bottomRightCornerInGigapanCoords = SeadragonUtils.convertSeadragonPointToGigapanPoint(snapshotToolBoundsHandlePositionsInPointsCoords[4], gigapanWidth);

         return new Seadragon.Rect(
               topLeftCornerInGigapanCoords.x,
               topLeftCornerInGigapanCoords.y,
               bottomRightCornerInGigapanCoords.x - topLeftCornerInGigapanCoords.x,
               bottomRightCornerInGigapanCoords.y - topLeftCornerInGigapanCoords.y
         );
      };

      /**
       * Returns a Seadragon.Rect specifying the current bounds (in Seadragon coordinates) of the snapshot tool.
       */
      this.getToolBoundsInSeadragonCoords = function() {
         var topLeftCornerInSeadragonCoords = snapshotToolBoundsHandlePositionsInPointsCoords[0];
         var bottomRightCornerInSeadragonCoords = snapshotToolBoundsHandlePositionsInPointsCoords[4];

         return new Seadragon.Rect(
               topLeftCornerInSeadragonCoords.x,
               topLeftCornerInSeadragonCoords.y,
               bottomRightCornerInSeadragonCoords.x - topLeftCornerInSeadragonCoords.x,
               bottomRightCornerInSeadragonCoords.y - topLeftCornerInSeadragonCoords.y
         );
      };

      /**
       * Sets the snapshot tool's bounds to the given Rect (in Seadragon coordinates)
       */
      this.setToolBoundsInSeadragonCoords = function(boundsRectInPointsCoords) {
         if (!this.isVisible) {
            throw "Cannot set snapshot bounds if the tool is not visible";
         }
         // fixme: add some sanity checks here.  if we're currently dragging, there may be unexpected results.
         //        On the other hand, I don't know how a user will cause this function to be called if they are dragging.

         var topLeftInPointsCoords = boundsRectInPointsCoords.getTopLeft();
         var dimensionsInPointsCoords = boundsRectInPointsCoords.getSize();
         var halfDimensionsInPointsCoords = dimensionsInPointsCoords.divide(2);

         viewer.drawer.updateOverlay(snapshotToolBoundsSelector, boundsRectInPointsCoords);

         //update the movement for all the handles
         var boundsHandlePositions = new Array(8);
         boundsHandlePositions[0] = topLeftInPointsCoords;  // top left
         boundsHandlePositions[1] = topLeftInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, 0));  // top edge
         boundsHandlePositions[2] = topLeftInPointsCoords.plus(new Seadragon.Point(dimensionsInPointsCoords.x, 0));  // top right
         boundsHandlePositions[3] = topLeftInPointsCoords.plus(new Seadragon.Point(dimensionsInPointsCoords.x, halfDimensionsInPointsCoords.y)); // right edge
         boundsHandlePositions[4] = topLeftInPointsCoords.plus(dimensionsInPointsCoords);  // bottom right
         boundsHandlePositions[5] = topLeftInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, dimensionsInPointsCoords.y)); // bottom edge
         boundsHandlePositions[6] = topLeftInPointsCoords.plus(new Seadragon.Point(0, dimensionsInPointsCoords.y));  // bottom left
         boundsHandlePositions[7] = topLeftInPointsCoords.plus(new Seadragon.Point(0, halfDimensionsInPointsCoords.y)); // left edge
         for (var i = 0; i < snapshotToolBoundsHandles.length; i++) {
            viewer.drawer.updateOverlay(
                  snapshotToolBoundsHandles[i],
                  boundsHandlePositions[i],
                  Seadragon.OverlayPlacement.CENTER);
         }

         // update shaded areas
         if (Seadragon.Utils.getBrowser() != Seadragon.Browser.IE) {
            viewer.drawer.updateOverlay(snapshotToolShadedAreas[0], determineShadedAreaRect(0, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(snapshotToolShadedAreas[1], determineShadedAreaRect(1, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(snapshotToolShadedAreas[2], determineShadedAreaRect(2, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(snapshotToolShadedAreas[3], determineShadedAreaRect(3, boundsRectInPointsCoords));
         }

         // notify the listener (if any) of the change in the bounds handle positions
         snapshotToolBoundsHandlePositionListener(boundsHandlePositions);
      };

      /**
       * Returns true if the snapshot tool is currently visible, false otherwise.
       */
      this.isVisible = function() {
         return isSnapshotToolVisible;
      };

      /**
       * Sets the visibility of the snapshot tool.  The tool is made visible if willMakeVisible is true and will be
       * hidden otherwise.
       */
      this.setVisible = function(willMakeVisible) {
         if (willMakeVisible && !isSnapshotToolVisible) {
            // ---------------------------------------------------------------------------------------------------------------
            // Compute position for snapshot bounds selector.  Do so by first finding the visible portion of the gigapan in
            // the viewer, then finding the center of the visible portion, then sizing the initial bounds rect so that it has
            // the proper aspect ratio and is centered in the visible area.

            // First get the gigapan top-left and bottom-right corners in pixel coordinates
            var gigapanBoundsInPointsCoords = SeadragonUtils.convertGigapanRectToSeadragonRect(0, 0, gigapanWidth, gigapanHeight, gigapanWidth);
            var gigapanTopLeftInPixelCoords = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getTopLeft());
            var gigapanBottomRightInPixelCoords = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getBottomRight());
            var viewportTopLeftInPixelCoords = new Seadragon.Rect(0, 0);
            var viewportBottomRightInPixelCoords = viewer.viewport.getContainerSize();

            // compute the corners of the intersection rect (algorithm from: http://coding.derkeiler.com/Archive/C_CPP/comp.lang.c/2004-12/2748.html)
            var topLeftOfVisiblePortionInPixelCoordinates = new Seadragon.Point(
                  Math.max(gigapanTopLeftInPixelCoords.x, viewportTopLeftInPixelCoords.x),
                  Math.max(gigapanTopLeftInPixelCoords.y, viewportTopLeftInPixelCoords.y)
            );
            var bottomRightOfVisiblePortionInPixelCoordinates = new Seadragon.Point(
                  Math.min(gigapanBottomRightInPixelCoords.x, viewportBottomRightInPixelCoords.x),
                  Math.min(gigapanBottomRightInPixelCoords.y, viewportBottomRightInPixelCoords.y)
            );

            // make sure the intersection is non-empty
            var boundsRectCenterInPixelCoords = null;
            var boundsRectDimensionsInPixelCoords = null;
            if (bottomRightOfVisiblePortionInPixelCoordinates.x > topLeftOfVisiblePortionInPixelCoordinates.x &&
                bottomRightOfVisiblePortionInPixelCoordinates.y > topLeftOfVisiblePortionInPixelCoordinates.y) {
               var intersectingRectInPixelCoords = new Seadragon.Rect(
                     topLeftOfVisiblePortionInPixelCoordinates.x,
                     topLeftOfVisiblePortionInPixelCoordinates.y,
                     bottomRightOfVisiblePortionInPixelCoordinates.x - topLeftOfVisiblePortionInPixelCoordinates.x,
                     bottomRightOfVisiblePortionInPixelCoordinates.y - topLeftOfVisiblePortionInPixelCoordinates.y
               );

               boundsRectCenterInPixelCoords = intersectingRectInPixelCoords.getCenter();

               // If constraining the aspect ratio, then choose bounds such that we maximize one edge up to 90%, and the
               // other edge is determined by the aspect ratio
               if (willConstrainSnapshotAspectRatio) {
                  var intersectingRectAspectRatio = intersectingRectInPixelCoords.width / intersectingRectInPixelCoords.height;
                  if (snapshotAspectRatio > intersectingRectAspectRatio) {
                     var width = 0.9 * intersectingRectInPixelCoords.width;
                     boundsRectDimensionsInPixelCoords = new Seadragon.Point(width, 1 / snapshotAspectRatio * width);
                  }
                  else {
                     var height = 0.9 * intersectingRectInPixelCoords.height;
                     boundsRectDimensionsInPixelCoords = new Seadragon.Point(snapshotAspectRatio * height, height);
                  }
               }
               else {
                  boundsRectDimensionsInPixelCoords = new Seadragon.Point(0.9 * intersectingRectInPixelCoords.width,
                                                                          0.9 * intersectingRectInPixelCoords.height);
               }
            }
            else {
               // Handle the case where there's no intersection between the gigapan and the viewer (i.e. there's no visible
               // portion).  This can happen if you go to fullscreen mode, drag the pano as far to a corner as you can,
               // then leave fullscreen mode and engage the snapshot tool.
               var gigapanDimensionsInPixelCoords = gigapanBottomRightInPixelCoords.minus(gigapanTopLeftInPixelCoords);
               boundsRectCenterInPixelCoords = gigapanDimensionsInPixelCoords.divide(2).plus(gigapanTopLeftInPixelCoords);
               boundsRectDimensionsInPixelCoords = new Seadragon.Point(
                           gigapanDimensionsInPixelCoords.x * 0.9,
                           gigapanDimensionsInPixelCoords.y * 0.9
               );
            }

            var dimensionsInPointsCoords = viewer.viewport.deltaPointsFromPixels(boundsRectDimensionsInPixelCoords);
            var halfDimensionsInPointsCoords = dimensionsInPointsCoords.divide(2);

            var boundsRectCenterInPointsCoords = viewer.viewport.pointFromPixel(boundsRectCenterInPixelCoords);
            var topLeftInPointsCoords = boundsRectCenterInPointsCoords.minus(halfDimensionsInPointsCoords);

            var boundsRectInPointsCoords = new Seadragon.Rect(
                  topLeftInPointsCoords.x,
                  topLeftInPointsCoords.y,
                  dimensionsInPointsCoords.x,
                  dimensionsInPointsCoords.y);

            // add the shaded areas
            if (Seadragon.Utils.getBrowser() != Seadragon.Browser.IE) {
               viewer.drawer.addOverlay(snapshotToolShadedAreas[0], determineShadedAreaRect(0, boundsRectInPointsCoords));
               viewer.drawer.addOverlay(snapshotToolShadedAreas[1], determineShadedAreaRect(1, boundsRectInPointsCoords));
               viewer.drawer.addOverlay(snapshotToolShadedAreas[2], determineShadedAreaRect(2, boundsRectInPointsCoords));
               viewer.drawer.addOverlay(snapshotToolShadedAreas[3], determineShadedAreaRect(3, boundsRectInPointsCoords));
            }

            // add the bounds rectangle overlay to the viewer
            viewer.drawer.addOverlay(snapshotToolBoundsSelector, boundsRectInPointsCoords);
            // ---------------------------------------------------------------------------------------------------------
            // define the positions for the bounds handles
            snapshotToolBoundsHandlePositionsInPointsCoords[0] = topLeftInPointsCoords;  // top left
            snapshotToolBoundsHandlePositionsInPointsCoords[1] = boundsRectCenterInPointsCoords.minus(new Seadragon.Point(0, halfDimensionsInPointsCoords.y));  // top edge
            snapshotToolBoundsHandlePositionsInPointsCoords[2] = boundsRectCenterInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, -halfDimensionsInPointsCoords.y));  // top right
            snapshotToolBoundsHandlePositionsInPointsCoords[3] = boundsRectCenterInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, 0)); // right edge
            snapshotToolBoundsHandlePositionsInPointsCoords[4] = boundsRectCenterInPointsCoords.plus(halfDimensionsInPointsCoords);  // bottom right
            snapshotToolBoundsHandlePositionsInPointsCoords[5] = boundsRectCenterInPointsCoords.plus(new Seadragon.Point(0, halfDimensionsInPointsCoords.y)); // bottom edge
            snapshotToolBoundsHandlePositionsInPointsCoords[6] = boundsRectCenterInPointsCoords.plus(new Seadragon.Point(-halfDimensionsInPointsCoords.x, halfDimensionsInPointsCoords.y));  // bottom left
            snapshotToolBoundsHandlePositionsInPointsCoords[7] = boundsRectCenterInPointsCoords.minus(new Seadragon.Point(halfDimensionsInPointsCoords.x, 0)); // left edge
            // ---------------------------------------------------------------------------------------------------------
            // add the bounds handles
            jQuery.each(snapshotToolBoundsHandles,
                        function(i) {
                           viewer.drawer.addOverlay(snapshotToolBoundsHandles[i], snapshotToolBoundsHandlePositionsInPointsCoords[i], Seadragon.OverlayPlacement.CENTER);
                        });
            // ---------------------------------------------------------------------------------------------------------
            isSnapshotToolVisible = true;
         }
         else if (!willMakeVisible && isSnapshotToolVisible) {
            viewer.drawer.removeOverlay(snapshotToolBoundsSelector);
            jQuery.each(snapshotToolBoundsHandles,
                        function(i) {
                           viewer.drawer.removeOverlay(snapshotToolBoundsHandles[i]);
                        });
            if (Seadragon.Utils.getBrowser() != Seadragon.Browser.IE) {
               jQuery.each(snapshotToolShadedAreas,
                           function(i) {
                              viewer.drawer.removeOverlay(snapshotToolShadedAreas[i]);
                           });
            }

            isSnapshotToolVisible = false;
         }
      };
   };
   // ==================================================================================================================
   SnapshotBoundsMouseTracker.prototype = new DraggableWidgetMouseTracker(null, null);
   SnapshotBoundsMouseTracker.prototype.constructor = SnapshotBoundsMouseTracker;

   function SnapshotBoundsMouseTracker(element, viewer, handles, shadedAreas, handlePositionListener) {
      DraggableWidgetMouseTracker.call(this, element, viewer);
      this.theElement = element;
      this.handles = handles;
      this.handlePositionListener = handlePositionListener;

      this.pressHandlerSuper = this.pressHandler;
      this.pressHandler = function(tracker, position) {
         this.pressHandlerSuper.apply(this, arguments);
         this.theElement.className = "snapshot_tool_bounds_selector_active";
      };

      this.dragHandler = function(tracker, position, delta, shift) {
         this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(delta);

         var originalLocationInPointsCoords = viewer.viewport.pointFromPixel(this.elementLocationInPixelCoords);
         var dimensionsInPixelCoords = Seadragon.Utils.getElementSize(this.theElement);
         var dimensionsInPointsCoords = viewer.viewport.deltaPointsFromPixels(dimensionsInPixelCoords);
         var halfDimensionsInPixelCoords = dimensionsInPixelCoords.divide(2);
         var halfDimensionsInPointsCoords = viewer.viewport.deltaPointsFromPixels(halfDimensionsInPixelCoords);

         var topLeftInPointsCoords = originalLocationInPointsCoords.minus(halfDimensionsInPointsCoords);

         // now make sure we're still within the bounds of the image
         if (this.getPointsCoordinatesRangeRect()) {
            var topLeftAllowed = this.getPointsCoordinatesRangeRect().getTopLeft();
            var bottomRightAllowed = this.getPointsCoordinatesRangeRect().getBottomRight();
            if (topLeftInPointsCoords.x < topLeftAllowed.x) {
               topLeftInPointsCoords.x = topLeftAllowed.x;
            }
            if (topLeftInPointsCoords.x + dimensionsInPointsCoords.x > bottomRightAllowed.x) {
               topLeftInPointsCoords.x = bottomRightAllowed.x - dimensionsInPointsCoords.x;
            }
            if (topLeftInPointsCoords.y < topLeftAllowed.y) {
               topLeftInPointsCoords.y = topLeftAllowed.y;
            }
            if (topLeftInPointsCoords.y + dimensionsInPointsCoords.y > bottomRightAllowed.y) {
               topLeftInPointsCoords.y = bottomRightAllowed.y - dimensionsInPointsCoords.y;
            }
         }

         var boundsRectInPointsCoords = new Seadragon.Rect(
               topLeftInPointsCoords.x,
               topLeftInPointsCoords.y,
               dimensionsInPointsCoords.x,
               dimensionsInPointsCoords.y);
         this.viewer.drawer.updateOverlay(this.theElement, boundsRectInPointsCoords);

         //update the movement for all the handles
         var boundsHandlePositions = new Array(8);
         boundsHandlePositions[0] = topLeftInPointsCoords;  // top left
         boundsHandlePositions[1] = topLeftInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, 0));  // top edge
         boundsHandlePositions[2] = topLeftInPointsCoords.plus(new Seadragon.Point(dimensionsInPointsCoords.x, 0));  // top right
         boundsHandlePositions[3] = topLeftInPointsCoords.plus(new Seadragon.Point(dimensionsInPointsCoords.x, halfDimensionsInPointsCoords.y)); // right edge
         boundsHandlePositions[4] = topLeftInPointsCoords.plus(dimensionsInPointsCoords);  // bottom right
         boundsHandlePositions[5] = topLeftInPointsCoords.plus(new Seadragon.Point(halfDimensionsInPointsCoords.x, dimensionsInPointsCoords.y)); // bottom edge
         boundsHandlePositions[6] = topLeftInPointsCoords.plus(new Seadragon.Point(0, dimensionsInPointsCoords.y));  // bottom left
         boundsHandlePositions[7] = topLeftInPointsCoords.plus(new Seadragon.Point(0, halfDimensionsInPointsCoords.y)); // left edge
         for (var i = 0; i < handles.length; i++) {
            this.viewer.drawer.updateOverlay(
                  this.handles[i],
                  boundsHandlePositions[i],
                  Seadragon.OverlayPlacement.CENTER);
         }

         // update shaded areas
         if (Seadragon.Utils.getBrowser() != Seadragon.Browser.IE) {
            viewer.drawer.updateOverlay(shadedAreas[0], determineShadedAreaRect(0, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[1], determineShadedAreaRect(1, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[2], determineShadedAreaRect(2, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[3], determineShadedAreaRect(3, boundsRectInPointsCoords));
         }

         // notify the listener (if any) of the change in the bounds handle positions
         if (this.handlePositionListener) {
            this.handlePositionListener(boundsHandlePositions);
         }
      };

      this.releaseHandlerSuper = this.releaseHandler;
      this.releaseHandler = function(tracker, position, insideElmtPress, insideElmtRelease) {
         this.releaseHandlerSuper.apply(this, arguments);
         this.theElement.className = "snapshot_tool_bounds_selector";
      };
   }

   // ==================================================================================================================
   SnapshotBoundsHandleMouseTracker.prototype = new DraggableWidgetMouseTracker(null, null);
   SnapshotBoundsHandleMouseTracker.prototype.constructor = SnapshotBoundsHandleMouseTracker;

   function SnapshotBoundsHandleMouseTracker(activeHandleIndex, oppositeHandleIndex, handleElements, viewer, shadedAreas, bounds, handlePositionListener, willConstrainSnapshotAspectRatio, snapshotAspectRatio) {
      DraggableWidgetMouseTracker.call(this, handleElements[activeHandleIndex], viewer);
      this.activeHandleIndex = activeHandleIndex;
      this.oppositeHandleIndex = oppositeHandleIndex;
      this.handleElements = handleElements;
      this.activeHandleElement = handleElements[activeHandleIndex];
      this.oppositeHandleElement = handleElements[oppositeHandleIndex];
      this.bounds = bounds;
      this.handlePositionListener = handlePositionListener;
      this.willConstrainSnapshotAspectRatio = willConstrainSnapshotAspectRatio;
      this.snapshotAspectRatio = snapshotAspectRatio;
      this.boundRectMinWidthInPixels = 20;
      this.boundRectMinHeightInPixels = 20;
      this.cumulativeDelta = null;

      this.xSign = [-1, 0, 1, 1, 1, 0, -1, -1][activeHandleIndex];
      this.ySign = [-1, -1, -1, 0, 1, 1, 1, 0][activeHandleIndex];
      this.isDraggingTopOrBottomEdge = (this.xSign == 0);
      this.isDraggingLeftOrRightEdge = (this.ySign == 0);

      // adjust the min width or min height of the bounding rect according to
      // whether the aspect ratio is wider than it is tall or taller than it is wide
      if (this.willConstrainSnapshotAspectRatio) {
         if (this.snapshotAspectRatio >= 1) {
            this.boundRectMinWidthInPixels = this.snapshotAspectRatio * this.boundRectMinHeightInPixels;
         }
         else {
            this.boundRectMinHeightInPixels = this.boundRectMinHeightInPixels / this.snapshotAspectRatio;
         }
      }

      this.computeSign = function(v1, v2) {
         if (v1 - v2 < 0) {
            return -1;
         }
         else if (v1 - v2 > 0) {
            return 1;
         }
         return 0;
      };

      this.pressHandlerSuper = this.pressHandler;
      this.pressHandler = function(tracker, position) {
         this.pressHandlerSuper.apply(this, arguments);
         this.activeHandleElement.className = "snapshot_tool_bounds_handle_active";

         this.activeHandleElementInPixelCoords = this.getCenterPointOfElementInPixelCoords(this.activeHandleElement);
         this.oppositeHandleElementInPixelCoords = this.getCenterPointOfElementInPixelCoords(this.oppositeHandleElement);

         this.cumulativeDelta = new Seadragon.Point(0, 0);

         this.originalActiveHandleElementPositionInPixelCoords = new Seadragon.Point(
               this.activeHandleElementInPixelCoords.x,
               this.activeHandleElementInPixelCoords.y
         );
         this.mousePositionInPixelCoords = new Seadragon.Point(
               this.originalActiveHandleElementPositionInPixelCoords.x,
               this.originalActiveHandleElementPositionInPixelCoords.y
         );
      };

      this.dragHandlerSuper = this.dragHandler;
      this.dragHandler = function(tracker, position, delta, shift) {
         this.cumulativeDelta = this.cumulativeDelta.plus(delta);
         this.mousePositionInPixelCoords = this.originalActiveHandleElementPositionInPixelCoords.plus(this.cumulativeDelta);

         // make sure the mouse is within the bounds of the panorama
         var gigapanBoundsInPointsCoords = SeadragonUtils.convertGigapanRectToSeadragonRect(0, 0, gigapanWidth, gigapanHeight, gigapanWidth);
         var gigapanTopLeftBounds = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getTopLeft());
         var gigapanBottomRightBounds = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getBottomRight());
         var topLeftBounds = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getTopLeft());
         var bottomRightBounds = viewer.viewport.pixelFromPoint(gigapanBoundsInPointsCoords.getBottomRight());
         if (this.willConstrainSnapshotAspectRatio) {
            if (this.isDraggingTopOrBottomEdge) {
               var lengthToEdge = Math.min(this.oppositeHandleElementInPixelCoords.x - topLeftBounds.x, bottomRightBounds.x - this.oppositeHandleElementInPixelCoords.x);
               var maxHeight = lengthToEdge / this.snapshotAspectRatio * 2;
               topLeftBounds.y = Math.max(topLeftBounds.y, this.oppositeHandleElementInPixelCoords.y - maxHeight);
               bottomRightBounds.y = Math.min(bottomRightBounds.y, this.oppositeHandleElementInPixelCoords.y + maxHeight);
            }
            else if (this.isDraggingLeftOrRightEdge) {
               var lengthToEdge = Math.min(this.oppositeHandleElementInPixelCoords.y - topLeftBounds.y, bottomRightBounds.y - this.oppositeHandleElementInPixelCoords.y);
               var maxWidth = lengthToEdge * this.snapshotAspectRatio * 2;
               topLeftBounds.x = Math.max(topLeftBounds.x, this.oppositeHandleElementInPixelCoords.x - maxWidth);
               bottomRightBounds.x = Math.min(bottomRightBounds.x, this.oppositeHandleElementInPixelCoords.x + maxWidth);
            }
            else {
               if (this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x) {
                  bottomRightBounds.y = Math.min(bottomRightBounds.y, this.oppositeHandleElementInPixelCoords.y + (gigapanBottomRightBounds.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio);
                  topLeftBounds.y = Math.max(topLeftBounds.y, this.oppositeHandleElementInPixelCoords.y - (gigapanBottomRightBounds.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio);
               }
               else {
                  bottomRightBounds.y = Math.min(bottomRightBounds.y, this.oppositeHandleElementInPixelCoords.y - (gigapanTopLeftBounds.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio);
                  topLeftBounds.y = Math.max(topLeftBounds.y, this.oppositeHandleElementInPixelCoords.y + (gigapanTopLeftBounds.x - this.oppositeHandleElementInPixelCoords.x) / this.snapshotAspectRatio);
               }
               if (this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y) {
                  bottomRightBounds.x = Math.min(bottomRightBounds.x, this.oppositeHandleElementInPixelCoords.x + (gigapanBottomRightBounds.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio);
                  topLeftBounds.x = Math.max(topLeftBounds.x, this.oppositeHandleElementInPixelCoords.x - (gigapanBottomRightBounds.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio);
               }
               else {
                  bottomRightBounds.x = Math.min(bottomRightBounds.x, this.oppositeHandleElementInPixelCoords.x - (gigapanTopLeftBounds.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio);
                  topLeftBounds.x = Math.max(topLeftBounds.x, this.oppositeHandleElementInPixelCoords.x + (gigapanTopLeftBounds.y - this.oppositeHandleElementInPixelCoords.y) * this.snapshotAspectRatio);
               }
            }
         }
         if (this.originalActiveHandleElementPositionInPixelCoords.x > this.oppositeHandleElementInPixelCoords.x) {
            topLeftBounds.x = Math.max(topLeftBounds.x, this.oppositeHandleElementInPixelCoords.x);
         }
         else {
            bottomRightBounds.x = Math.min(bottomRightBounds.x, this.oppositeHandleElementInPixelCoords.x);
         }
         if (this.originalActiveHandleElementPositionInPixelCoords.y > this.oppositeHandleElementInPixelCoords.y) {
            topLeftBounds.y = Math.max(topLeftBounds.y, this.oppositeHandleElementInPixelCoords.y);
         }
         else {
            bottomRightBounds.y = Math.min(bottomRightBounds.y, this.oppositeHandleElementInPixelCoords.y);
         }
         var targetPositionInPixelCoords = new Seadragon.Point(
               Math.min(Math.max(this.mousePositionInPixelCoords.x, topLeftBounds.x), bottomRightBounds.x),
               Math.min(Math.max(this.mousePositionInPixelCoords.y, topLeftBounds.y), bottomRightBounds.y)
         );

         // get the current bounds
         var currentBoundsDimesionsInPixels = Seadragon.Utils.getElementSize(bounds);

         // compute new desired dimensions of the bounding box (correcting them if dragging on an edge)
         var desiredDimensions = this.oppositeHandleElementInPixelCoords.minus(targetPositionInPixelCoords).apply(Math.abs);
         if (this.isDraggingTopOrBottomEdge) {
            desiredDimensions.x = currentBoundsDimesionsInPixels.x;
         }
         else if (this.isDraggingLeftOrRightEdge) {
            desiredDimensions.y = currentBoundsDimesionsInPixels.y;
         }

         // adjust the desired dimensions to the desired aspect ratio, if necessary
         if (this.willConstrainSnapshotAspectRatio) {
            if (this.isDraggingTopOrBottomEdge) {
               desiredDimensions.x = desiredDimensions.y * this.snapshotAspectRatio;
            }
            else if (this.isDraggingLeftOrRightEdge) {
               desiredDimensions.y = desiredDimensions.x / this.snapshotAspectRatio;
            }
            else {
               // Compute the two possible dimensions which conform to the desired aspect ratio, then pick the one
               // that works.  The one that works will equal the desired dimension along one axis and be greater
               // along the other axis.
               var possibleDimensions1 = new Seadragon.Point(desiredDimensions.x, desiredDimensions.x / this.snapshotAspectRatio);
               var possibleDimensions2 = new Seadragon.Point(desiredDimensions.y * this.snapshotAspectRatio, desiredDimensions.y);
               desiredDimensions = (possibleDimensions1.y >= desiredDimensions.y) ? possibleDimensions1 : possibleDimensions2;
            }
         }

         // make sure bounding box isn't too small.
         desiredDimensions.x = Math.max(this.boundRectMinWidthInPixels, desiredDimensions.x);
         desiredDimensions.y = Math.max(this.boundRectMinHeightInPixels, desiredDimensions.y);

         // compute the top-left and bottom-right corners of the bounding box
         var topLeftCornerInPixelCoords = null;
         var bottomRightCornerInPixelCoords = null;
         if (this.isDraggingTopOrBottomEdge) {
            // update the position of the active handle element
            this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * desiredDimensions.y;

            var halfWidth = desiredDimensions.x / 2;
            topLeftCornerInPixelCoords = new Seadragon.Point(
                        this.oppositeHandleElementInPixelCoords.x - halfWidth,
                        Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)
            );
            bottomRightCornerInPixelCoords = new Seadragon.Point(
                        this.oppositeHandleElementInPixelCoords.x + halfWidth,
                        Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)
            );
         }
         else if (this.isDraggingLeftOrRightEdge) {
            // update the position of the active handle element
            this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * desiredDimensions.x;

            var halfHeight = desiredDimensions.y / 2;
            topLeftCornerInPixelCoords = new Seadragon.Point(
                  Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                  this.oppositeHandleElementInPixelCoords.y - halfHeight
            );
            bottomRightCornerInPixelCoords = new Seadragon.Point(
                  Math.max(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                  this.oppositeHandleElementInPixelCoords.y + halfHeight
            );
         }
         else {
            // update the position of the active handle element
            this.activeHandleElementInPixelCoords.x = this.oppositeHandleElementInPixelCoords.x + this.xSign * desiredDimensions.x;
            this.activeHandleElementInPixelCoords.y = this.oppositeHandleElementInPixelCoords.y + this.ySign * desiredDimensions.y;

            topLeftCornerInPixelCoords = new Seadragon.Point(
                  Math.min(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                  Math.min(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)
            );
            bottomRightCornerInPixelCoords = new Seadragon.Point(
                  Math.max(this.activeHandleElementInPixelCoords.x, this.oppositeHandleElementInPixelCoords.x),
                  Math.max(this.activeHandleElementInPixelCoords.y, this.oppositeHandleElementInPixelCoords.y)
            );
         }

         // ensuring the bounding box was not too small may have moved it outside the bounds of the
         // panorama.  If this is the case, we exit right now without updating anything
         if (this.activeHandleElementInPixelCoords.x < gigapanTopLeftBounds.x
                   || this.activeHandleElementInPixelCoords.y < gigapanTopLeftBounds.y
                   || this.activeHandleElementInPixelCoords.x > gigapanBottomRightBounds.x
               || this.activeHandleElementInPixelCoords.y > gigapanBottomRightBounds.y) {
            return;
         }

         // call the parent method, now that we are sure we are updating
         this.dragHandlerSuper.apply(this, arguments);

         // update the position of the bounds rect
         var topLeftInPointsCoords = this.viewer.viewport.pointFromPixel(topLeftCornerInPixelCoords);
         var boundsDimensionsInPointsCoords = viewer.viewport.deltaPointsFromPixels(bottomRightCornerInPixelCoords.minus(topLeftCornerInPixelCoords));
         var boundsRectInPointsCoords = new Seadragon.Rect(
               topLeftInPointsCoords.x,
               topLeftInPointsCoords.y,
               boundsDimensionsInPointsCoords.x,
               boundsDimensionsInPointsCoords.y
         );
         this.viewer.drawer.updateOverlay(this.bounds, boundsRectInPointsCoords);

         // update the positions of all the handles
         var halfBoundsDimensionsInPointsCoords = boundsDimensionsInPointsCoords.divide(2);
         var boundsCenterInPointsCoords = topLeftInPointsCoords.plus(halfBoundsDimensionsInPointsCoords);
         var boundsHandlePositions = new Array(8);
         boundsHandlePositions[0] = topLeftInPointsCoords;  // top left
         boundsHandlePositions[1] = boundsCenterInPointsCoords.minus(new Seadragon.Point(0, halfBoundsDimensionsInPointsCoords.y));  // top edge
         boundsHandlePositions[2] = boundsCenterInPointsCoords.plus(new Seadragon.Point(halfBoundsDimensionsInPointsCoords.x, -halfBoundsDimensionsInPointsCoords.y));  // top right
         boundsHandlePositions[3] = boundsCenterInPointsCoords.plus(new Seadragon.Point(halfBoundsDimensionsInPointsCoords.x, 0)); // right edge
         boundsHandlePositions[4] = boundsCenterInPointsCoords.plus(halfBoundsDimensionsInPointsCoords);  // bottom right
         boundsHandlePositions[5] = boundsCenterInPointsCoords.plus(new Seadragon.Point(0, halfBoundsDimensionsInPointsCoords.y)); // bottom edge
         boundsHandlePositions[6] = boundsCenterInPointsCoords.plus(new Seadragon.Point(-halfBoundsDimensionsInPointsCoords.x, halfBoundsDimensionsInPointsCoords.y));  // bottom left
         boundsHandlePositions[7] = boundsCenterInPointsCoords.minus(new Seadragon.Point(halfBoundsDimensionsInPointsCoords.x, 0)); // left edge
         for (var i = 0; i < this.handleElements.length; i++) {
            this.viewer.drawer.updateOverlay(
                  this.handleElements[i],
                  boundsHandlePositions[i],
                  Seadragon.OverlayPlacement.CENTER);
         }

         // update shaded areas
         if (Seadragon.Utils.getBrowser() != Seadragon.Browser.IE) {
            viewer.drawer.updateOverlay(shadedAreas[0], determineShadedAreaRect(0, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[1], determineShadedAreaRect(1, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[2], determineShadedAreaRect(2, boundsRectInPointsCoords));
            viewer.drawer.updateOverlay(shadedAreas[3], determineShadedAreaRect(3, boundsRectInPointsCoords));
         }

         // notify the listener (if any) of the change in the bounds handle positions
         if (this.handlePositionListener) {
            this.handlePositionListener(boundsHandlePositions);
         }
      };

      this.releaseHandlerSuper = this.releaseHandler;
      this.releaseHandler = function(tracker, position, insideElmtPress, insideElmtRelease) {
         this.releaseHandlerSuper.apply(this, arguments);
         this.activeHandleElement.className = "snapshot_tool_bounds_handle";
         this.cumulativeDelta = new Seadragon.Point(0, 0);
      };
   }

   // ==================================================================================================================
})();

// ==================================================================================================================
DraggableWidgetMouseTracker.prototype = new Seadragon.MouseTracker();
DraggableWidgetMouseTracker.prototype.constructor = DraggableWidgetMouseTracker;

function DraggableWidgetMouseTracker(element, viewer) {
   Seadragon.MouseTracker.call(this, element);
   this.viewer = viewer;
   this.theElement = element;
   this.pointsCoordinatesRangeRect = null;

   // TODO: Move this to SeadragonUtils
   this.getCenterPointOfElementInPixelCoords = function(elmt) {
      var elementHalfDimensions = Seadragon.Utils.getElementSize(elmt).divide(2);

      var topLeftCorner = Seadragon.Utils.getElementPosition(elmt).minus(Seadragon.Utils.getElementPosition(this.viewer.elmt));

      return topLeftCorner.plus(elementHalfDimensions);
   };

   this.getCenterPointInSeadragonCoords = function() {
      return this.viewer.viewport.pointFromPixel(this.getCenterPointOfElementInPixelCoords(this.theElement));
   };

   this.pressHandler = function(tracker, position) {
      this.viewer.setMouseNavEnabled(false);

      // remember where the widget was originally drawn
      this.elementLocationInPixelCoords = this.getCenterPointOfElementInPixelCoords(this.theElement);
   };

   this.dragHandler = function(tracker, position, delta, shift) {
      // update the overlay's location by adding the delta
      this.elementLocationInPixelCoords = this.elementLocationInPixelCoords.plus(delta);

      // update the overlay
      this.viewer.drawer.updateOverlay(
            this.theElement,
            this.viewer.viewport.pointFromPixel(this.elementLocationInPixelCoords),
            Seadragon.OverlayPlacement.CENTER);
   };

   this.releaseHandler = function(tracker, position, insideElmtPress, insideElmtRelease) {
      if (!insideElmtPress) {
         return;         // ignore releases from outside
      }

      this.elementLocationInPixelCoords = null;

      this.viewer.setMouseNavEnabled(true);
   };

   // Defines the area in which the object controlled by this MouseTracker is allowed to move.
   this.setPointsCoordinatesRangeRect = function(pointsCoordinatesRangeRect) {
      this.pointsCoordinatesRangeRect = pointsCoordinatesRangeRect;
   };

   // Returns a Seadragon.Rect representing the area in which the object controlled by this MouseTracker is allowed to
   // move.  Coordinates are in Seadragon points.
   this.getPointsCoordinatesRangeRect = function() {
      return this.pointsCoordinatesRangeRect;
   };

   // Returns a Seadragon.Rect representing the area in which the object controlled by this MouseTracker is allowed to
   // move.  Coordinates are in pixels.
   this.getPixelCoordinatesRangeRect = function() {
      var topLeftInPointsCoords = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getTopLeft());
      var bottomRightInPointsCoords = this.viewer.viewport.pixelFromPoint(this.pointsCoordinatesRangeRect.getBottomRight());
      return new Seadragon.Rect(
            topLeftInPointsCoords.x,
            topLeftInPointsCoords.y,
            bottomRightInPointsCoords.x - topLeftInPointsCoords.x,
            bottomRightInPointsCoords.y - topLeftInPointsCoords.y
      );
   };
}

// ==================================================================================================================

