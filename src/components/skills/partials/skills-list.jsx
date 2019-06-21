import React from 'react';

const {ga} = window;

export default class SkillsList extends React.Component {

	constructor(props) {
		super(props);
	}

	handlePick (i, e) {
		e.preventDefault();
		this.props.onPickSkill(i);
		ga('send', 'event', 'skills', 'pick_skill', this.props.skills[i].name);
	}

	handleSearch() {
		this.props.onUserInput(
			this.refs.skillsSearchInput.value
		);
	}
	
	render() {
		let counter = null;

		return (
			<div className="skills-list-wrap">
				<input
					className="input input--skills-filter"
					ref="skillsSearchInput"
					onClick={ga.bind(null, 'send', 'event', 'skills', 'click_search')}
					onChange={this.handleSearch.bind(this)}
					value={this.props.searchText}
					placeholder="Search..."
					type="text"/>
				<div className="skills-list">
					{this.props.skills.map( (skill, i) => {

						const isCurrent = this.props.skill.name === skill.name;
						const testClassName = ` test_skills-list-item--${skill.name
							.toLowerCase()
							.replace(/[^a-zA-Z0-9 ]/g, '')
							.replace(/ /g, '-')}`;

						if (this.props.searchText) {
							if (skill.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) === -1) {
								return null;
							};
						}

						counter++;

						return (
							<a
								className={`action skills-list-item${testClassName}${isCurrent ? ' action--active' : ''}`}
								href={'#' + skill.name}
								key={skill.name}
								ref={skill.name}
								tabIndex={isCurrent ? '-1' : 0}
								onClick={this.handlePick.bind(this, i)}>{skill.name}</a>
						);
					} )}
				</div>
			</div>
		);
	}
}
