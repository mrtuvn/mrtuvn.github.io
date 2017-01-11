const config = require('./../config').config;

const settings = {
	paths: {
		bitmaps_test: 'tests/visual/backstop_data/bitmaps_test',
		compare_data: 'tests/visual/backstop_data/server/bitmaps_test/compare.json',
		casper_scripts: 'tests/visual/backstop_data/casper_scripts',
		bitmaps_reference: 'tests/visual/backstop_data/bitmaps_reference'
	},
	id: 'gdb',
	viewports: [
		{
			name: 'phone',
			width: 320,
			height: 480
		},
		{
			name: 'tablet',
			width: 568,
			height: 1024
		},
		{
			name: 'desktop',
			width: 1024,
			height: 768
		}
	],
	scenarios: [
		{
			label: 'Index',
			url: config.url,
			hideSelectors: [],
			removeSelectors: [],
			selectors: [
				'.nav',
				'.logo',
				'.header-group',
				'.skills-section',
				'.portfolio-section',
				'.contact-section',
				'.footer'
			],
			readyEvent: null,
			delay: 3000,
			misMatchThreshold: 0.2,
			onBeforeScript: null,
			onReadyScript: null
		}
	],
	casperFlags: [
		'--ignore-ssl-errors=true',
		'--ssl-protocol=any'
	],
	debug: false,
	port: config.port,
	engine: 'slimerjs'
};

switch (process.env.npm_package_config_env) {
	case 'develop':
	case 'release':
		settings.report = ['CLI'];
		settings.scenarios[0].selectors = ['.nav'];
		settings.scenarios[0].misMatchThreshold = 10;
		break;
	default:
		settings.report = ['CLI', 'browser'];
}

module.exports = settings;