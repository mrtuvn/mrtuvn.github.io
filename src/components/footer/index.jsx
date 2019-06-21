import React from 'react';

 import './index.css';

 const logoSrc = require('./../../img/logo/scythe-and-spade.svg');

 const Index = () => {
    const {ga} = window;

    const YEAR = new Date().getFullYear().toString().substring(2);
    const LOVE_URL = 'https://www.pornhub.com/';
    const REACT_URL = 'https://facebook.github.io/react/';
    const VSCODE_URL = 'https://code.visualstudio.com/';

     return (
        <footer className="footer container">
            <div className="footer-seal-wrap">
                <div className="footer-seal">
                    <img
                        className="footer-seal-img"
                        src={logoSrc}
                        width="98"
                        height="98"
                        alt="Scythe and spade"
                    />
                    <span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--1">20</span>
                    <span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--2">t</span>
                    <span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--3">{YEAR}</span>
                    <span className="font-family--emphasis footer-seal-quarter footer-seal-quarter--4">n</span>
                </div>
            </div>
            <p className="footer-copyright none-to-S">
				<span className="text-size--xs">
					Made with&nbsp;
					<a 
						className="link"
                        href={LOVE_URL}
                        onClick={ga.bind(null, 'send', 'event', 'footer', 'click_love', {transport: 'beacon'})}
                        rel="noopener noreferrer"
                        target="_blank"
                        >love</a>&nbsp;and&nbsp;
                    <a
                        className="link"
                        href={REACT_URL}
                        onClick={ga.bind(null, 'send', 'event', 'footer', 'click_react', {transport: 'beacon'})}
                        rel="noopener noreferrer"
                        target="_blank"
                        >react</a>&nbsp;and&nbsp;
                    <a
                        className="link"
                        href={VSCODE_URL}
                        onClick={ga.bind(null, 'send', 'event', 'footer', 'click_vscode', {transport: 'beacon'})}
                        rel="noopener noreferrer"
                        target="_blank"
                        >vcode</a>
				</span>
            </p>
        </footer>
    );
};

 export default Index