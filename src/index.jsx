// vendor
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';


// styles
import 'no-sheet-reset';
import './index.css';
import './styles/grid.css';
import './styles/structure.css';
import './styles/text.css';
import './styles/link.css';
import './styles/action.css';
import './styles/input.css';
import './styles/section.css';

 // components
import Header from './components/header/index';
import Skills from './components/skills/index';
import Contacts from './components/contact/index';
import Footer from './components/footer/index';
import Content from './components/content/index';

 ReactDOM.render(
    <Fragment>
        <Header />
		<Skills />
        <Content />
		<Contacts />
		<Footer />
    </Fragment>,
    document.getElementById('root')
);
