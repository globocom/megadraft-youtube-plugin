/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default class extends React.Component {
	render() {
		return (
			<svg {...this.props} width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor" d="M18.1 18.5H5.9c-1.7 0-3.1-1.4-3.1-3.1v-7c0-1.7 1.4-3.1 3.1-3.1h12.2c1.7 0 3.1 1.4 3.1 3.1v7c0 1.8-1.4 3.1-3.1 3.1zM15.9 12c0-.3-.1-.4-.3-.6l-5.2-3.3c-.2-.1-.4-.1-.7.1-.2.1-.3.3-.3.5v6.5c0 .3.1.4.3.6.1.1.2.1.3.1.1 0 .3 0 .3-.1l5.2-3.3c.3-.1.4-.2.4-.5z"/>
			</svg>
		);
	}
}
