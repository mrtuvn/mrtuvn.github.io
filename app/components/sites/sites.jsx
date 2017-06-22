import React from 'react';
import LocalStorageParser from 'local-storage-parser/dist/local-storage-parser.es5';

import dataSites from './../../data/sites.json';
import './sites.scss';

import SitesList from './partials/sites-list.jsx';
import SitesCard from './partials/sites-card.jsx';

const SHOW_MAX = 27;
const LS_NAME = 'Site';
const localStorageParser = new LocalStorageParser(LS_NAME);

let sites = [];
let sitesLength = 0;
let sitesChopped = [];

/**
 * Lazy Load Gallery assets
 * @returns {Promise}
 */
function loadGallery() {
	return new Promise((resolve, reject) => {
		try {
			require.ensure([], require => {
				const $ = require('jquery');
				require('magnific-popup');
				require('magnific-popup/src/css/main.scss');

				resolve($);
			})
		}
		catch (err) {
			reject(err)
		}
	});
}

export default class Sites extends React.Component {
	constructor() {
		super();

		this.state = {
			site: {
				contribution: '', // contribution description
				country: '',  // country emoji
				description: '', // site description
				finished: '', // date when I finished work on site
				images: {
					all: [], // array of images
					lead: '' // lead image
				},
				name: '', // site name
				parent: '', // [optional], parent site
				technologies: [], // technologies array
				url: '', // link url
				website: '' // link name
			},
			sites: [], // array of site objects
			chop: true, // show by default only certain amount of sites
			isGalleryLoading: false, // state of image gallery
			isGalleryLoaded: false // state of image gallery
		};
	}

	componentWillMount() {
		fetch(dataSites)
			.then(
				response => response.json()
			)
			.then(
				data => {
					let site;
					const storedName = localStorageParser.get(LS_NAME).name;

					sites = data;
					sitesChopped = sites.slice(0, SHOW_MAX);

					sitesLength = sites.length;

					// Fill sub site with parent site data
					sites.find((el, i, arr) => {
						if (el.parent) { // is it sub site?
							arr.find(parent => { // find sub site parent
								if (parent.name === el.parent) {
									for (let prop in parent) { // go thru all parent properties
										if (parent.hasOwnProperty(prop) && !el[prop]) { // if property missing in sub
											el[prop] = parent[prop];  // assign parent properties to sub site
										}
									}
								}
							});
						}
					});

					if (storedName && sites.some(obj => obj.name === storedName)) { // check if site name exist in data & set stored site
						sites.forEach(obj => { // lookup for stored value
							if (obj.name === storedName) {
								site = obj;
							}
						});
					} else { // set default site to first occurrence
						site = sites[0];
					}

					this.setState({
						site: site,
						sites: this.state.chop ? sitesChopped : sites
					})
				}
			);
	}

	pickSite(i) {
		const site = this.state.sites[i];

		localStorageParser.set({name: site.name}); // store last chosen site name

		this.setState({site});
		ga('send', 'event', 'sites', 'pick_site', site.name);
	}

	toggleSites() {
		const chop = this.state.chop;

		this.setState({
			sites: chop ? sites : sitesChopped,
			chop: !chop
		});
	}

	/**
	 * Load gallery assets & change states of controls
	 * @param e
	 */
	showImage(e) {

		if (!this.state.isGalleryLoaded) {

			e.preventDefault();

			const TARGET_CLASS_NAME = 'sites-image-link';
			const TARGET_LOADING_CLASS_NAME = 'sites-image-link--loading';

			const target = e.target.parentElement.classList.contains(TARGET_CLASS_NAME) ? e.target.parentElement : e.target; // check if target is delegate

			this.setState({
				isGalleryLoading: true
			});

			loadGallery()
				.then($ => {
					// Magnific popup init
					$('.sites-card').magnificPopup({
						delegate: `.${TARGET_CLASS_NAME}`,
						type: 'image',
						gallery: {
							enabled: true,
							preload: [0, 2]
						},
						titleSrc: 'title'
					});
				})
				.then(() => {
					this.setState({
						isGalleryLoading: false,
						isGalleryLoaded: true
					});
					target.click();
				})
				.catch(err => err);
		}
	}

	render () {
		return (
			<section id="portfolio" className="container portfolio-section">
				<h2 className="section-title font-family--emphasis section-title--right">
					<span className="section-title-text">
						<span className="text--non-accent">Port</span>folio
					</span>
				</h2>
				<p className="section-description mb--2">
					My portfolio currently contains {sitesLength} projects. Of course this number isn't quite truthful, it's just amount of projects that are reflected on this page. Some of my projects I can't divulge, some projects are not worth mentioning, so tried go gather only those projects
					that I'm proud of and cherish, projects cultivated with my pedantically and scrupulously contribution.
				</p>
				<div className="row row-gutter u-pos--rel">
					<div className="S7 M8 L9 S--order1">
						<SitesCard
							site={this.state.site}
							onImageClick={this.showImage.bind(this)}
							isLoading={this.state.isGalleryLoading}
						/>
					</div>
					<div className="S5 M4 L3">
						<SitesList
							site={this.state.site}
							sites={this.state.sites}
							chop={this.state.chop}
							onPickSite={this.pickSite.bind(this)}
							onToggleSites={this.toggleSites.bind(this)}
						/>
					</div>
				</div>
			</section>
		);
	}
}
