import React from 'react';

import Stars from '../partials/skills-card/skills-card-stars.jsx';
import Description from '../partials/skills-card/skills-card-description.jsx';

// Import all images in image folder

const imgSrc = require.context('../logos', true);

const SkillsCard = ({ skill }) => (
	<div className="skills-card">
		<div className="skills-card-inner-wrap row X--stretch">
			<div className="X12">
				<div className="skills-card-image-wrap">
					<div className="skills-card-image-innerWrap">
						<img
							className="skills-card-image"
							src={skill.image ? imgSrc(`./${skill.image}`) : ''}
							width="70"
							height="70"
							alt={skill.name}/>
					</div>
				</div>
				<h3 className="skills-card-title font-family--emphasis">{skill.name}</h3>
				<Description text={skill.description}/>
			</div>
			<div className="X12 X--flex-end">
				{skill.level ? <Stars level={skill.level}/> : ''}
				{skill.status ? <div className="skills-card-status"><span className="text--non-accent">Thought:</span> {skill.status}</div> : ''}
			</div>
		</div>
	</div>
);

export default SkillsCard
