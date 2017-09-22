import React from 'react';
import {config} from './../../../config';

import './footer.scss';

const logoSrc = require('./../../img/logo/scythe-and-spade.svg');

const Footer = () => {
	const YEAR = new Date().getFullYear().toString().substring(2);
	const LOVE_URL = 'https://en.wikipedia.org/wiki/Love';
	const REACT_URL = 'https://facebook.github.io/react/';
	const FLEXGRID_URL = 'http://godban.com.ua/projects/flexgrid/';
	const NO_SHEET_RESET_URL = 'https://github.com/godban/no-sheet-reset';
	const PUG_URL = 'https://github.com/pugjs/pug';
	const WEBPACK_URL = 'https://webpack.github.io/';

	return (
		<footer className="footer container">
			<div className="footer-seal-wrap">
				<div className="footer-seal">
					<img
						className="footer-seal-img"
						src={logoSrc}
						width="98"
						height="98"
						alt="Scythe and spade"/>
					<span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--1">20</span>
					<span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--2">t</span>
					<span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--3">{YEAR}</span>
					<span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--4">n</span>
				</div>
			</div>
			<p className="footer-copyright none-to-S">
				<span className="text-size--xs">
					Proudly made with&nbsp;
					<span className="none-to-M">
						<a
							className="link"
							href={LOVE_URL}
							onClick={ga.bind(null, 'send', 'event', 'footer', 'click_love', {transport: 'beacon'})}
							target="_blank">love</a>,&nbsp;
					</span>
					<a
						className="link"
						href={WEBPACK_URL}
						onClick={ga.bind(null, 'send', 'event', 'footer', 'click_webpack', {transport: 'beacon'})}
						target="_blank">webpack</a>,&nbsp;
					<a
						className="link"
						href={PUG_URL}
						onClick={ga.bind(null, 'send', 'event', 'footer', 'click_pug', {transport: 'beacon'})}
						target="_blank">pug</a>,&nbsp;
					<a
						className="link"
						href={REACT_URL}
						onClick={ga.bind(null, 'send', 'event', 'footer', 'click_react', {transport: 'beacon'})}
						target="_blank">react</a>,&nbsp;
					<a
						className="link"
						href={FLEXGRID_URL}
						onClick={ga.bind(null, 'send', 'event', 'footer', 'click_flexgrid', {transport: 'beacon'})}
						target="_blank">flexgrid</a>&nbsp;&&nbsp;
					<a
						className="link"
						href={NO_SHEET_RESET_URL}
						onClick={ga.bind(null, 'send', 'event', 'footer', 'click_no_sheet', {transport: 'beacon'})}
						target="_blank">no sheet</a>
					<span className="none-to-M">
						, v{config.version}
					</span>
				</span>
			</p>
		</footer>
	);
};

export default Footer
