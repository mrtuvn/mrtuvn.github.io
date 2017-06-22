import FontFaceObserver from 'fontfaceobserver';
import './fonts.scss';

const fontOpenSansRegular = new FontFaceObserver('Open Sans', { weight: 400 });
const fontOpenSansSemibold = new FontFaceObserver('Open Sans', { weight: 600 });
const fontRalewayLight = new FontFaceObserver('Raleway', { weight: 200 });

const html = document.documentElement;
const FONT_LOAD_GIVEUP = 7000;

/**
 * Observe font loading
 */
Promise.all([ // make sure that all fonts loaded in the same time
	fontOpenSansRegular.load(null, FONT_LOAD_GIVEUP),
	fontOpenSansSemibold.load(null, FONT_LOAD_GIVEUP),
	fontRalewayLight.load(null, FONT_LOAD_GIVEUP)
])
	.then(() => { // Fonts are loaded
		html.classList.remove('fonts-loading');
		html.classList.add('fonts-loaded');
		localStorage.setItem('isFontsLoaded', true);
	})
	.catch(() => { // FONT_LOAD_GIVEUP time up or error
		html.classList.remove('fonts-loading');
		html.classList.add('fonts-failed');
		localStorage.setItem('isFontsLoaded', false);
		console.info(`Slow connection: Fancy fonts were loading more then ${FONT_LOAD_GIVEUP}ms, sorry, that's too much, we will use default fonts.`); // eslint-disable-line no-console
	});