import React from 'react';

const MAX_DESCRIPTION_CHARS = 250;

export default class Description extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			collapsed: true
		};
	}

	componentWillReceiveProps() {
		this.setState({
			collapsed: true
		});
	}

	toggle() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		const isLong = this.props.text.length > MAX_DESCRIPTION_CHARS;
		const isCollapsed = this.state.collapsed;

		return (
			<p className="skills-card-description">
				{ (!isLong || !isCollapsed) ? this.props.text : `${this.props.text.substring(0, MAX_DESCRIPTION_CHARS)}...` }
				{ isLong ?
					<button
						className="link ml--05 test_expand-description"
						onClick={this.toggle.bind(this)}>
						{isCollapsed ? '↓ more' : '↑ less'}
					</button> : ''
				}
			</p>
		);
	}
}
