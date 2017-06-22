import React from 'react';

const imgSrc = require.context('./../../../../img/icons', true);

const Stars = ({ level }) => {
	const MAX_STARS = 5;

	let stars = [];
	let i = 0;

	for (i; i < MAX_STARS; i++) {
		if (i < level) {
			stars.push(
				<img
					className="icon"
					width="16"
					height="16"
					src={imgSrc('./star.svg')}
					key={i}
					alt="star"/>
			);
		} else {
			stars.push(
				<img
					className="icon"
					width="16"
					height="16"
					src={imgSrc('./star-empty.svg')}
					key={i}
					alt="empty star"/>
			);
		}
	}

	return (
		<div className="skills-card-level">
			<span className="text--non-accent">Level:</span>{stars}
		</div>
	);
};

Stars.propTypes = {
	level: React.PropTypes.number
};

export default Stars
