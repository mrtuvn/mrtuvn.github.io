import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import './components/fonts/fonts';

import 'no-sheet-reset/dist/_no-sheet-reset.scss'
import './styles/main.scss';

import Header from './components/header/header';
import Skills from './components/skills/skills';
import Sites from './components/sites/sites';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import Body from './components/body/body';

ReactDOM.render(
	<div>
		<Header/>
		<Skills/>
		<Body/>
		<Footer/>
	</div>,
	document.getElementById('main')
);
