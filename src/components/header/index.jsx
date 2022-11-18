import React from 'react';

import './index.css';

import Logo from '../logo/index.jsx';

const dates = {
	now: new Date(),
	birthday: new Date(1991, 9, 21),
};

const realAge = timePassed(dates.birthday);

function timePassed(date) {
	const currentMonth = dates.now.getMonth();
	const dateMonth = date.getMonth();
	const yearsPassed = dates.now.getFullYear() - date.getFullYear() - ((currentMonth < dateMonth) ? 1 : 0);
	const monthsPassed = (currentMonth > dateMonth) ? (currentMonth - dateMonth) : (currentMonth + 12 - dateMonth);

	return (
		(yearsPassed > 0) ?
			`${yearsPassed} ${yearsPassed === 1 ? 'year' : 'years'}` :
			(monthsPassed > 0) ?
				`${monthsPassed} ${monthsPassed === 1 ? 'month' : 'months'}` :
				'recently'
	);
}

const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

class Header extends React.Component {
	text = `Hey there! My name is Tu. I'm Frontend Engineer. Preach and practice automation.
	Staying up to date with rapidly changeable web development.
	Involvement in sharing ideas, sketches of prototyping, complex architecture, continuous integration and design is awesome.
	I'm living in Hanoi. Have ${realAge} of life behind my back.`;

    state = {
        finished: false,
        output: '',
    };

    constructor() {
        super();
        this.forceFinish = this.forceFinish.bind(this);
    }

    forceFinish() {
        this.setState({finished: true});
    }

    type(text, i = 0) {
        this.setState({
            output: this.state.output + text.charAt(i),
        }, () => {
            setTimeout(() => {
                if (i < text.length) {
                    i++;
                    this.type(text, i);
                } else {
                    this.setState({finished: true})
                }
            }, getRandomArbitrary(10, 100));
        });
    }

    componentDidMount() {
        this.type(this.text);
    }

	render() {
		const {ga} = window;
		const GA = {
			header: 'header',
			navigation: 'nav'
		};
		const {state} = this;

		return (
			<header className="header">
				<div className="header-container container cf">
					<Logo/>
					<div className="header-group">
						<div className="header-group-inner-wrap">
							<div className="heading-group">
								<h1 className="header-title font-family--emphasis">Tu <span className="block none-from-S"/> Nguyen</h1>
								<h2 className="header-subtitle font-family--emphasis">
									<a
										className="link link--text link--text-title"
										href="https://github.com/mrtuvn"
										onClick={ga.bind(null, 'send', 'event', GA.header, 'click_coding', {transport: 'beacon'})}
										rel="noopener noreferrer"
										target="_blank">
										cod<span className="text--non-accent">ing</span>
									</a>,&nbsp;
									<a
										className="link link--text link--text-title"
										href="https://www.youtube.com/user/mrtuvn/videos"
										onClick={ga.bind(null, 'send', 'event', GA.header, 'click_creating', {transport: 'beacon'})}
										rel="noopener noreferrer"
										target="_blank">
										creat<span className="text--non-accent">ing</span>
									</a>,&nbsp;
									<a
										className="link link--text link--text-title"
										href="http://steamcommunity.com/id/mrtu9vn"
										onClick={ga.bind(null, 'send', 'event', GA.header, 'click_gaming', {transport: 'beacon'})}
										rel="noopener noreferrer"
										target="_blank">
										gam<span className="text--non-accent">ing</span>
									</a>
								</h2>
							</div>
							<div className="nav-wrap">
								<nav className="nav">
									<a
										className="action action--active nav-link"
										onClick={ga.bind(null, 'send', 'event', GA.navigation, 'click_home')}
										rel="noopener noreferrer"
										href="/"
									>Home</a>
									<a
										className="action nav-link"
										href="https:/mrtuvn.blogspot.com"
										onClick={ga.bind(null, 'send', 'event', GA.navigation, 'click_blog', {transport: 'beacon'})}
										rel="noopener noreferrer"
										target="_blank"
									>Blog</a>
									<a
										className="action nav-link"
										onClick={ga.bind(null, 'send', 'event', GA.navigation, 'click_projects', {transport: 'beacon'})}
										rel="noopener noreferrer"
										href="/projects"
										target="_blank"
									>Projects</a>
								</nav>
							</div>
						</div>
					</div>
					{!state.finished &&
					<div
						className="header-description"
						onClick={this.forceFinish}
					>
                    {state.output}
					</div>}
					{state.finished &&
					<div className="header-description"
					>
						<p className="text mb--1">
							{'Hey there! My name is Tu. I\'m a '}
							Frontend Engineer
							{'. Preach and practice automation. '}
							<br />
							{'Staying up to date with rapidly changeable web development. Involvement in sharing ideas, sketches of prototyping, complex architecture, continuous integration and design is awesome.'}
							<br />
							{'I\'m living in '}
							<a
								className="link link--text"
								href="https://en.wikipedia.org/wiki/Hanoi"
								onClick={ga.bind(null, 'send', 'event', GA.header, 'click_hanoi', {transport: 'beacon'})}
								target="blank"
							>Hanoi</a>
							{`. Have ${realAge} of life behind my back`}
							<br/>
						</p>
					</div>}
				</div>
			</header>
		);
	}
}

export default Header
