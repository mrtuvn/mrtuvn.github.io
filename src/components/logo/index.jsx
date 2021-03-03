import React from 'react';

import './index.css';

import logoSrc from './../../img/logo/scythe-and-spade.svg';

const gags = [
	'If you know what I mean',
	'Doh... Yes, I can move',
	'You lose. Try again',
	'Stop clicking me!',
	'I see darkside behind you...',
	'What are you doing here?',
	'Are you QA? \n Why are you testing me?',
	'Are you HR? \n Well... \n I don\'t know... \n Maybe later?',
	'No refresh, bro. You know I\'m single page',
	'Welcome on board!',
	'Sometimes... \n I\'m thinking who I am, where I come from... \n But then I\'m just flip',
	'If you know what I mean',
	'Nope',
	'Yes!',
	'Fuck it, Dude, let\'s go bowling'
];

const {ga} = window;

export default class Logo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			flipped: false,
			text: ''
		}
	}

	handleClick(e) {
		const isNotFlipped = !this.state.flipped;

		e.preventDefault();

		if (isNotFlipped) {
			this.setState({
				text: gags[Math.floor(Math.random() * gags.length)]
			});
		}

		this.setState({
			flipped: isNotFlipped
		});

		ga('send', 'event', 'Logo', 'click_logo');
	}

	render() {
		let flippedClass = this.state.flipped ? ' logo--flipped' : '';

		return (
			<span
				className={'logo' + flippedClass}
				onClick={this.handleClick.bind(this)}>
				<span className="logo-head">
					<img
						className="logo-img"
						src={logoSrc}
						width="50"
						height="50"
						alt="Scythe and spade"/>
					<span className="logo-title font-family--emphasis">T/N</span>
					<small className="logo-est">EST. 1991</small>
				</span>
				<span className="logo-tail">
					<span className="logo-text">{this.state.text}</span>
				</span>
			</span>
		);
	}
}
