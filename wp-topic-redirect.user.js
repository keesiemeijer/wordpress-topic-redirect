// ==UserScript==
// @name        WordPress topic redirect
// @namespace   WordPress_topic_redirect
// @description Forces https, adds view=all to topic urls and redirects if needed in the WordPress support forums.
// @version     1.0.0
// @grant       none
// @run-at      document-start
// @include    *://*wordpress.org/support/topic/*
// @include    *://wordpress.org/support/users/*
// @include    *://wordpress.org/support/theme/*
// @include    *://wordpress.org/support/plugin/*
// @include     *://wordpress.org/support/forum/*
// @downloadURL https://github.com/keesiemeijer/wordpress-topic-redirect/raw/master/wp-topic-redirect.user.js
// @updateURL https://github.com/keesiemeijer/wordpress-topic-redirect/raw/master/wp-topic-redirect.user.js
// ==/UserScript==

( function() {

	var search = window.location.search;
	var https_protocol = window.location.protocol.replace( /http\:/g, 'https:' );
	var url = https_protocol + "//" + window.location.host + window.location.pathname;
	var new_url = ( https_protocol != window.location.protocol ) ? url : false;

	if ( search ) {

		var pattern = /view=all/g;

		if ( !pattern.test( search ) ) {
			new_url = ( ( new_url ) ? new_url : url ) + search + '&view=all';
		}

	} else {
		new_url = ( ( new_url ) ? new_url : url ) + '?view=all';
	}

	if ( new_url ) {
		window.location.replace( new_url + window.location.hash );
	}

} )();