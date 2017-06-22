import React from 'react';

import Spinner from './../../spinner/spinner.jsx';

export default class SitesImage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: this.props.isLoading,
			isClicked: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isLoading: nextProps.isLoading
		});
	}

	/**
	 * Indicate click on current el
	 * @param e
	 */
	onClick(e) {
		if (!this.props.isLoading) { // check if gallery is currently loading
			this.setState({
				isClicked: true
			});
			this.props.onImageClick(e);
		}
		e.preventDefault();
		this.props.gaEvent();
	}
	
	render() {

		const isSealed = this.state.isClicked && this.props.isLoading; // if current el is clicked and gallery starts loading

		return(
			<a
				className={`sites-image-link${isSealed ? ' sites-image-link--loading' : ''}${this.props.isLoading ? ' sites-image-link--inactive' : ''}`}
				title={this.props.title}
				href={this.props.url}
				onClick={this.onClick.bind(this)}>
				<img
					className={this.props.imageClass}
					width={this.props.width}
					height={this.props.height}
					src={this.props.imageSource}
					srcSet={this.props.imageSourceSet}
					alt={this.props.title}/>
				{ isSealed ? <Spinner/> : null }
			</a>
		);
	}
}

SitesImage.propTypes = {
	title: React.PropTypes.string.isRequired,
	url: React.PropTypes.string.isRequired,
	imageClass: React.PropTypes.string.isRequired,
	imageSource: React.PropTypes.string.isRequired,
	imageSourceSet: React.PropTypes.string.isRequired,
	onImageClick: React.PropTypes.func.isRequired,
	isLoading: React.PropTypes.bool.isRequired,
	width: React.PropTypes.number.isRequired,
	height: React.PropTypes.number.isRequired,
	gaEvent: React.PropTypes.func.isRequired
};
