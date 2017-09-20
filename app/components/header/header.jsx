import React from 'react';

import './header.scss';

import Logo from './../logo/logo.jsx';
import SocialShare from './../social-share/social-share.jsx';

const imgSrc = require.context('./../../img/pictures', true);

const dates = {
	now: new Date(),
	birthday: new Date(1991, 9, 21),
};

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

const Header = () => {
	const HEADER_IMAGE_NAME = 'body';
	const GA = {
		header: 'header',
		navigation: 'nav'
	};

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
									target="_blank">
									cod<span className="text--non-accent">ing</span>
								</a>,&nbsp;
								<a
									className="link link--text link--text-title"
									href="https://www.youtube.com/user/mrtuvn/videos"
									onClick={ga.bind(null, 'send', 'event', GA.header, 'click_creating', {transport: 'beacon'})}
									target="_blank">
									creat<span className="text--non-accent">ing</span>
								</a>,&nbsp;
								<a
									className="link link--text link--text-title"
									href="#"
									onClick={ga.bind(null, 'send', 'event', GA.header, 'click_gaming', {transport: 'beacon'})}
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
									href="/"
								>Home</a>
								<a
									className="action nav-link"
									href="https:/mrtuvn.blogspot.com"
									onClick={ga.bind(null, 'send', 'event', GA.navigation, 'click_blog', {transport: 'beacon'})}
									target="_blank"
								>Blog</a>
								<a
									className="action nav-link"
									onClick={ga.bind(null, 'send', 'event', GA.navigation, 'click_projects', {transport: 'beacon'})}
									href="https://github.com/mrtuvn?tab=repositories"
									target="_blank"
								>Projects</a>
							</nav>
						</div>
					</div>
				</div>
					<div className="header-description">
						<p className="text mb--1">
							{'Hey there, I\'m a '}
							Frontend Engineer
							{'. Preach and practice automation, focus on performance and believe in infinity maintenance... or at least I am trying to do that.'}
						</p>
						<p className="text mb--1 none-to-M header-description-image-support">
							{'Staying up to date with rapidly changeable web development can be a true challenge, on the other hand it\'s the greatest interest. Involvement in sharing ideas, sketches of prototyping, complex architecture, pre- post- processors, continuous integration and design is awesome. Proudly sharing '}
							<a
								className="link link--text"
								href="#portfolio"
								onClick={ga.bind(null, 'send', 'event', GA.header, 'click_parenting')}
							>my work</a>
							{' with millions users.'}
						</p>
						<p className="text mb--1 none-to-M">
							{'I\'m living in '}
							<a
								className="link link--text"
								href="https://en.wikipedia.org/wiki/Hanoi"
								onClick={ga.bind(null, 'send', 'event', GA.header, 'click_berlin', {transport: 'beacon'})}
								target="blank"
							>Hanoi</a>
							{`. Have ${timePassed(dates.birthday)} of life behind my back`}
							<br/>
						</p>
					</div>
					<SocialShare/>
				</div>
		</header>
	);
};

export default Header
