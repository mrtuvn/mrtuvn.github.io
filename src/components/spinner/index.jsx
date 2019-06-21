import React from 'react';

import './index.css';

const Spinner = ({modifier = ''}) => (
	<span className={`spinner${modifier}`}>
		<span className="spinner-dot spinner-dot-1" />
		<span className="spinner-dot spinner-dot-2" />
		<span className="spinner-dot spinner-dot-3" />
	</span>
);

export default Spinner
