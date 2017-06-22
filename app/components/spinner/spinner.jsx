import React from 'react';

import './spinner.scss';

const Spinner = ({ modifier = '' }) => (
	<span className={`spinner${modifier}`}>
		<span className="spinner-dot spinner-dot-1"/>
		<span className="spinner-dot spinner-dot-2"/>
		<span className="spinner-dot spinner-dot-3"/>
	</span>
);

Spinner.propTypes = { modifier: React.PropTypes.string };

export default Spinner
