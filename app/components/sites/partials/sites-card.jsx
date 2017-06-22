import React from 'react';
import './../../../../node_modules/Stickyfill/dist/stickyfill';

import SitesImage from './sites-image.jsx';

const imgSitesSrc = require.context('./../../../img/sites', true);
const imgSitesPreviewSrc = require.context('./../../../img/sites-preview', true);
const imgSitesPreview2xSrc = require.context('./../../../img/sites-preview-2x', true);

const SitesCard = props => {
	const site = props.site;
	const imgSrcLead = site.images.lead;

	return (
		<section
			className="sites-card u-pos--sticky"
			ref={el => { if (el) setTimeout(() => { Stickyfill.add(el) }, 1000); }} // position sticky polyfill
		>
			<div className="sites-card-inner-wrap row row--gutter">
				<div className="M6 L5">
					<div className="sites-image-wrap">
						<SitesImage
							{...props}
							title={site.name}
							width={310}
							height={310}
							url={imgSrcLead ? imgSitesSrc(`./${imgSrcLead}`) : ''}
							gaEvent={ga.bind(null, 'send', 'event', 'sites', 'click_lead_image', site.images.lead)}
							imageClass="sites-image"
							imageSource={imgSrcLead ? imgSitesPreviewSrc(`./${imgSrcLead}`) : ''}
							imageSourceSet={imgSrcLead ?`${imgSitesPreviewSrc(`./${imgSrcLead}`)} 1x, ${imgSitesPreview2xSrc(`./${imgSrcLead}`)} 2x` : ''}
						/>
					</div>
					<div className="none-to-M row">
						{site.images.all.map(
							(img, i) =>
								<div
									className="X6"
									key={site.name + i}>
									<div className={'sites-image-wrap--sub ' + (i % 2 === 0 ? 'sites-image-wrap--sub--odd' : 'sites-image-wrap--sub--even')}>
										<SitesImage
											{...props}
											title={site.name}
											width={127}
											height={50}
											url={imgSitesSrc(`./${img}`)}
											onImageClick={props.onImageClick}
											gaEvent={ga.bind(null, 'send', 'event', 'sites', 'click_image', site.images.lead)}
											imageClass="sites-image--sub"
											imageSource={imgSitesPreviewSrc(`./${img}`)}
											imageSourceSet={`${imgSitesPreviewSrc(`./${img}`)} 1x, ${imgSitesPreview2xSrc(`./${img}`)} 2x`}
										/>
									</div>
								</div>
						)}
					</div>
				</div>
				<div className="M6 L7">
					<span className="sites-country">{site.country}</span>
					<h2 className="sites-title font-family--emphasis">{site.name}</h2>
					<a
						className="block link text--nowrap mb--2"
						href={site.url}
						target="_blank">
						<span className="link-marker">
							<span className="link-marker-ico">↑</span>
						</span>
						{site.website}
					</a>
					<p className="mb--2 sites-description">
						<strong className="text--bold">Description: </strong>
						{site.description}
					</p>
					<p className="mb--2 sites-description">
						<strong className="text--bold">Contribution: </strong>
						{site.contribution}
					</p>
					<div className="mb--2">
						<span className="text--bold">Technologies: </span>
						{site.technologies.join(', ')}
					</div>
					<div>
						<span className="text--bold">Finished: </span>
						{site.finished}
					</div>
				</div>
			</div>
		</section>
	);
};

SitesCard.propTypes = {
	site: React.PropTypes.object.isRequired,
	onImageClick: React.PropTypes.func.isRequired,
	isLoading: React.PropTypes.bool.isRequired
};

export default SitesCard