import React from 'react';

export default class SitesList extends React.Component {
	constructor(props) {
		super(props);
	}

	handlePick(i, e) {
		e.preventDefault();
		this.props.onPickSite(i);
	}

	handleToggle(i, e) {
		e.preventDefault();
		this.props.onToggleSites(i);
	}

	render() {
		return (
			<ul className="sites-list">
				{this.props.sites.map((site, i) => {

					const isCurrent = this.props.site.name == site.name;
					const testClassName = ` test_sites-list-item--${site.name
						.toLowerCase()
						.replace(/[^a-zA-Z0-9 ]/g, '')
						.replace(/ /g, '-')}`;

					return (
						<li className={'sites-list-item-wrap' + (site.parent ? ' sites-list-item-wrap--sub' : '')}
							key={site.name + i}>
							<a
								className={`action sites-list-item${testClassName}${site.parent ? ' sites-list-item--sub' : ''}${isCurrent ? ' action--active' : ''}`}
								href={`#${site.name}`}
								ref={site.name}
								onClick={this.handlePick.bind(this, i)}
							>{site.name}</a>
						</li>
					);
				})}
				<li
					className="sites-list-item-wrap sites-list-item-wrap--action"
					key="more-sites">
					<a
						className="action sites-list-item sites-list-item--action"
						onClick={this.handleToggle.bind(this, null)}
						href="#sites">
						<span className="">
							{`${(this.props.chop) ? '↓ more' : '↑ less'}`}
						</span>
					</a>
				</li>
			</ul>
		);
	}
}

SitesList.propTypes = {
	site: React.PropTypes.object.isRequired,
	sites: React.PropTypes.array.isRequired,
	chop: React.PropTypes.bool.isRequired,
	onPickSite: React.PropTypes.func.isRequired,
	onToggleSites: React.PropTypes.func.isRequired
};
