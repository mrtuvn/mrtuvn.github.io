const config = require('./../../config').config;
const env = require('system').env;
const galleryImgSelector = '.mfp-img';

config.timeout = 10000;

casper.options.viewportSize = {width: 1024, height: 768};

casper.test.begin('Testing index page', 17, function (test) {
	casper
		.start(config.url)
		.then(function () {
			this.echo('1. Title', 'COMMENT');
			test.assertTitle('Bogdan Plieshka | Frontend Engineer', 'Has correct title');
		})
		.then(function () {
			this.echo('2. Navigation', 'COMMENT');
			test.assertExists('.nav-link[href="/"]', 'Navigation link \'Home\' is exist');
			test.assertExists('.nav-link[href="https://medium.com/@bogdan_plieshka"]', 'Navigation link \'Blog\' is exist');
			test.assertExists('.nav-link[href="https://github.com/godban?tab=repositories"]', 'Navigation link \'Projects\' exist');
		})
		.then(function () {
			this.echo('3. Flip logo', 'COMMENT');
			this.click('.logo');
			test.assertExists('.logo--flipped', 'Logo is flipping');
		})
		.then(function () {
			const skill = 'JavaScript';

			this.echo('4. Skills', 'COMMENT');
			this.echo('4.1 Pick skill', 'COMMENT');
			this.echo('Switch skill card from CSS to ' + skill);
			this.click('.test_skills-list-item--css');
			this.click('.test_skills-list-item--javascript');
			this.waitForResource(/javascript.*svg$/, function () {
				this.echo('I\'m sure skill card is updated in the DOM and I see ' + skill + ' logo image');
			}, null, config.timeout);
			test.assertSelectorHasText('.skills-card-title', skill, 'Skill card title is ' + skill);
			this.reload(function () {
				this.echo('4.2 Save picked skill', 'COMMENT');
				this.echo('Page is reloaded', 'PARAMETER')
			})
				.then(function () {
					test.assertSelectorHasText('.skills-card-title', skill, 'Skill card title is ' + skill);
				});
		})
		.then(function () {
			const descriptionHiddenText = 'By the way it\'s always nice to hear "wooooow" while user sizing a window';

			this.echo('4.3 Expand skill card description', 'COMMENT');
			this.echo('Switch skill card from JavaScript to Responsive Web Design');
			this.click('.test_skills-list-item--responsive-web-design');
			this.waitForResource(/responsive.*png$/, function () {
				this.echo('I\'m sure skill card is updated in the DOM and I see RWD logo image');
			}, null, config.timeout);
			test.assertSelectorDoesntHaveText('.skills-card-description', descriptionHiddenText, 'I don\'t see hidden skill description text');
			this.click('.test_expand-description');
			test.assertSelectorHasText('.skills-card-description', descriptionHiddenText, 'I see skill whole description text after exand');
		})
		.then(function () {
			const filter = 'Webpack';

			this.echo('4.4 Skills filter', 'COMMENT');
			this.echo('Filter skills by ' + filter + ' keyword');
			this.fillSelectors('.skills-list-wrap', {'.input--skills-filter': filter}, false);
			test.assertElementCount('.skills-list-item', 1, 'There is only one skill item left');
			test.assertSelectorHasText('.skills-list-item', filter, 'Skill item is ' + filter);
		})
		.then(function () {
			const site = 'Moneyhouse.com';

			this.echo('5. Sites', 'COMMENT');
			this.echo('5.1 Pick site', 'COMMENT');
			this.echo('Switch site card from Magento 2 to ' + site);
			this.click('.test_sites-list-item--magento-2');
			this.waitForResource(/magento-promo.*jpg$/, function () {
				this.echo('I\'m sure sites card is updated in the DOM and I see Magento 2 promo image');
			}, null, config.timeout);
			this.click('.test_sites-list-item--moneyhousecom');
			this.waitForResource(/moneyhouse-com-promo.*jpg$/, function () {
				this.echo('I\'m sure sites card is updated in the DOM and I see ' + site + ' promo image');
			}, null, config.timeout);
			test.assertSelectorHasText('.sites-title', site, 'Skill card title is ' + site);
			this.reload(function () {
				this.echo('5.2 Save picked site', 'COMMENT');
				this.echo('Page is reloaded', 'PARAMETER');
			})
				.then(function () {
					test.assertSelectorHasText('.sites-title', site, 'Skill card title is ' + site);
				});
		})
		.then(function () {
			const image = /sites\/moneyhouse\/moneyhouse-com-promo.*jpg$'/;

			this.echo('5.3 Call gallery with promo image', 'COMMENT');
			this.click('.sites-image-wrap .sites-image-link');
			this.waitForResource(
				image,
				function () { // image is loaded
					test.assertResourceExists(image, 'image is loaded');
				},
				function () { // image is not loaded
					this.waitForSelector(galleryImgSelector, function () {
						test.assertVisible(galleryImgSelector, 'I\'m not sure that image loaded but the gallery is here');
					});
				},
				config.timeout
			);
		})
		.then(function () {
			const image = /sites\/moneyhouse\/moneyhouse-com-results.*jpg$/;

			this.echo('5.4 Call gallery with sub image', 'COMMENT');
			this.click('.sites-image-wrap--sub .sites-image-link:first-child');
			this.waitForResource(
				image,
				function () { // image is loaded
					test.assertResourceExists(image, 'image is loaded');
				},
				function () { // image is not loaded
					this.waitForSelector(galleryImgSelector, function () {
						test.assertVisible(galleryImgSelector, 'I\'m not sure that image loaded but the gallery is here');
					});
				},
				config.timeout
			);
		})
		.then(function () {
			const hiddenSkill = '.test_sites-list-item--essayherocouk';

			this.echo('5.3 Show all sites', 'COMMENT');
			test.assertDoesntExist(hiddenSkill, 'I don\'t see hidden site item');
			this.click('.sites-list-item--action');
			test.assertExists(hiddenSkill, 'I see hidden previously site item');
		})
		.run(function () {
			test.done()
		})
		.on('step.error', function (err) {
			const snapshot = 'tests/functional/log/index-func.png';
			this.echo('Capture error state snapshot into ' + snapshot, 'WARN_BAR');
			this.capture(snapshot);
			this.die('Step has failed: ' + err);
		});
});