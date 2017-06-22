import React from 'react';
import LocalStorageParser from 'local-storage-parser/dist/local-storage-parser.es5';

import dataSkills from './../../data/skills.json';
import './skills.scss';

import SkillsCard from './partials/skills-card.jsx';
import SkillsCategories from './partials/skills-categories.jsx';
import SkillsList from './partials/skills-list.jsx';

const LS_NAME = 'Skill';
const localStorageParser = new LocalStorageParser(LS_NAME);

export default class Skills extends React.Component {
	constructor() {
		super();

		this.state = {
			searchText: '', // skills search filter
			skill: {
				categories: [], // category array
				description: '', // skill description
				image: '', // image source
				level: 0, // knowledge level
				name: '', // skill name
				status: '' // interest status
			},
			skills: []
		}
	}

	componentWillMount() {
		fetch(dataSkills)
			.then(
				response => response.json()
			)
			.then(
				data => {
					const name = localStorageParser.get(LS_NAME).name;
					let skill = data[0]; // set default value to first occurrence

					if (data.some(obj => obj.name === name)) { // check if skill name exist in data
						data.forEach(obj => { // lookup for stored value
							if(obj.name === name) {
								skill = obj; // set site as stored site
							}
						});
					}

					this.setState({
						skill: skill,
						skills: data
					})
				}
			);
	}

	pickSkill(i) {
		localStorageParser.set({
			name: this.state.skills[i].name
		});

		this.setState({
			skill: this.state.skills[i]
		});
	}

	handleUserInput(searchText) {
		this.setState({
			searchText: searchText
		});
	}

	render() {
		return (
			<section className='container skills-section'>
				<h2 className="section-title font-family--emphasis">
					<span className="section-title-text">
						<span className="text--non-accent">S</span>kill<span className="text--non-accent">s</span>
					</span>
				</h2>
				<p className="section-description mb--1">
					Well it's always hard to understand what technologies a person is skilled in.
					In varying levels I know {this.state.skills.length} different languages, libs, frameworks, technologies, tools, etc.
				</p>
				<div className="row row--gutter">
					<div className="M7">
						<div className="skills-card-wrap">
							<SkillsCard
								skill={this.state.skill}/>
							<SkillsCategories
								skill={this.state.skill}
								skills={this.state.skills}/>
						</div>
					</div>
					<div className="M5">
						<SkillsList
							skill={this.state.skill}
							skills={this.state.skills}
							searchText={this.state.searchText}
							onPickSkill={this.pickSkill.bind(this)}
							onUserInput={this.handleUserInput.bind(this)}/>
					</div>
				</div>
			</section>
		);
	}
}
