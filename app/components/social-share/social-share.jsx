import React from 'react';

import './social-share.scss';

const SocialShare = () => {
	const SITE_NAME = 'https://godban.github.io';

	// Facebook
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=263072313724602';
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	return (
		<div className="social-share">
			<div className="social-share-item social-share-item--facebook">
				<div id="fb-root"></div>
				<div
					className="fb-like"
					data-href={SITE_NAME}
					data-layout="button_count"
					data-action="like"
					data-size="small"
					data-show-faces="false"
					data-share="false">Facebook</div>
			</div>
			<div className="social-share-item social-share-item--twitter">
				<a
					href="https://twitter.com/b_plieshka"
					className="twitter-follow-button"
					data-show-screen-name="false"
					data-show-count="false">Twitter</a>
			</div>
			<div className="social-share-item social-share-item--github">
				<a
					className="github-button"
					href="https://github.com/godban"
					data-count-href="/godban/followers"
					data-count-api="/users/godban#followers"
					data-count-aria-label="# followers on GitHub"
					aria-label="Follow @godban on GitHub">GitHub</a>
			</div>
			<div className="social-share-item social-share-item--google">
				<div
					className="g-plusone"
					data-size="medium"
					data-href={SITE_NAME}>G+</div>
			</div>
		</div>
	);
};

export default SocialShare
