import React from 'react';

const SkillsCategories = ({skill, skills}) => {

	let categories = [];

	const getActiveClassName = (cat) => {
		const cats = skill.categories;

		return (cats && cats.indexOf(cat) > -1) ? ' skills-categories-item--active' : '';
	};
	// eslint-disable-next-line
	skills.map(skill => {

		if (skill.categories) {
			// eslint-disable-next-line
			skill.categories.map(category => {

				// check if item in array
				if (categories.indexOf(category) === -1) {
					categories.push(category);
				}

			});
		}
	});

	return (
		<div className="skills-categories-wrap none-to-M">
			<ul className="skills-categories">
				{categories.map(category =>
					<li
						className={`action skills-categories-item${getActiveClassName(category)}`}
						key={category}>{category}</li>
				)}
			</ul>
		</div>
	);
};

export default SkillsCategories
