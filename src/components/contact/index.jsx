import React from 'react';

import './index.css';

import ContactLink from './partials/contact-link.jsx';

const imgSrc = require.context('./../../img/pictures', true);

const Contacts = () => {
	const {ga} = window;
	const MAIL_NAME = 'tuna9x.it@gmail.com';
	const SKYPE_USERNAME = 'tunguyenanhvn';
	const GITHUB_USERNAME = 'mrtuvn';
	const LINKEDIN_USERNAME = 'mrtuvn';
	const STACKOVERFLOW_USERNAME = 'mrtuvn';
	const MEDIUM_USERNAME = 'mrtuvn';
	const FACEBOOK_USERNAME = 'mrtu.vn';
	const INSTAGRAM_USERNAME = 'mrtuvn';
	const TWITTER_USERNAME = 'tuna2191';
	const CONTACT_IMAGE_NAME = 'me';

	return (
		<section className="container contact-section">
			<h2 id="contacts" className="section-title font-family--emphasis">
				<span className="section-title-text">
					<span className="text--non-accent">In</span>Touch
				</span>
			</h2>
			<div className="row X--middle mt--4 mt--2--from-M">
				<div className="X--flex-end none-to-M M4 L3 align--h--c align--h--l--from-M">
					<img
						className="contact-image align--v--b"
						width="170"
						height="280"
						src={imgSrc(`./${CONTACT_IMAGE_NAME}.png`)}
						srcSet={`${imgSrc(`./${CONTACT_IMAGE_NAME}.png`)} 1x, ${imgSrc(`./${CONTACT_IMAGE_NAME}.png`)} 2x`}
						alt="me put on glasses"/>
				</div>
				<div className="X10 X--offset2 S10 S--offset1 M8 M--offset0 L9 L--offset0 row">
					<div className="contact-section M6 none-from-L">
						<h3 className="contact-section-title font-family--emphasis">
							Email
						</h3>
						<ContactLink
							link={`mailto:${MAIL_NAME}`}
							gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_email', {transport: 'beacon'})}
							iconName="gmail"
							size={14}
							title={MAIL_NAME}
							text={['', <span className="link-text--non-accent">tuna9x.it</span>, '@gmail.com' ]}
						/>
					</div>
					<div className="contact-section M6 L4">
						<div className="row">
							<div className="mb--2 none-to-L">
								<h3 className="contact-section-title font-family--emphasis">
									Email
								</h3>
								<ContactLink
									link={`mailto:${MAIL_NAME}`}
									gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_email', {transport: 'beacon'})}
									iconName="gmail"
									size={14}
									title={MAIL_NAME}
									text={['', <span className="link-text--non-accent">tuna9x.it</span>, '@gmail.com' ]}
								/>
							</div>
							<h3 className="contact-section-title font-family--emphasis X12">
								Instant messengers
							</h3>
							<ContactLink
								modifier=" S6 M12"
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_skype', {transport: 'beacon'})}
								link={`skype:${SKYPE_USERNAME}?chat`}
								iconName="skype"
								title={SKYPE_USERNAME}
								text="send message"
							/>

						</div>
					</div>
					<div className="contact-section M6 L4">
						<div className="row">
							<h3 className="contact-section-title font-family--emphasis X12">
								Technical profiles
							</h3>
							<ContactLink
								modifier=" S6 M12"
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_github', {transport: 'beacon'})}
								link={`https://github.com/${GITHUB_USERNAME}`}
								iconName="github"
								title={GITHUB_USERNAME}
								text={GITHUB_USERNAME}
							/>
							<ContactLink
								modifier=" S6 M12"
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_stackoverflow', {transport: 'beacon'})}
								link={`https://stackoverflow.com/users/2807737/${STACKOVERFLOW_USERNAME}`}
								iconName="stackoverflow"
								title={STACKOVERFLOW_USERNAME}
								text={STACKOVERFLOW_USERNAME}
							/>
							<ContactLink
								modifier=" S6 M12"
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_linkedin', {transport: 'beacon'})}
								link={`https://www.linkedin.com/in/${LINKEDIN_USERNAME}`}
								iconName="linkedin"
								title={LINKEDIN_USERNAME}
								text={['tu', <span className="link-text--non-accent">nguyen</span>]}
							/>
							<ContactLink
								link={`https://medium.com/@${MEDIUM_USERNAME}`}
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_medium', {transport: 'beacon'})}
								iconName="medium"
								size={14}
								title={MEDIUM_USERNAME}
								text={MEDIUM_USERNAME}
							/>
						</div>
					</div>
					<div className="contact-section M6 L4">
						<div className="row">
							<h3 className="contact-section-title font-family--emphasis X12">
								Social networks
							</h3>
							<ContactLink
								modifier=" S6 M12"
								link={`https://www.facebook.com/${FACEBOOK_USERNAME}`}
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_facebook', {transport: 'beacon'})}
								iconName="facebook"
								title={FACEBOOK_USERNAME}
								text={FACEBOOK_USERNAME}
							/>
							<ContactLink
								modifier=" S6 M12"
								link={`https://www.instagram.com/${INSTAGRAM_USERNAME}`}
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_instagram', {transport: 'beacon'})}
								iconName="instagram"
								title={INSTAGRAM_USERNAME}
								text={INSTAGRAM_USERNAME}
							/>
							<ContactLink
								modifier=" S6 M12"
								link={`https://twitter.com/${TWITTER_USERNAME}`}
								gaEvent={ga.bind(null, 'send', 'event', 'contact', 'click_twitter', {transport: 'beacon'})}
								iconName="twitter"
								title={TWITTER_USERNAME}
								text={TWITTER_USERNAME}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
};

export default Contacts
