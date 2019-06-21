// vendor
import React from 'react';

 // styles
import './index.css';

 class SocialShare extends React.PureComponent {
    componentDidMount() {
        
    }

     render() {
        return (
            <div className="social-share">
                <div className="social-share-item social-share-item--github">
                    <a
                        className="github-button"
                        href="https://github.com/mrtuvn"
                        data-show-count="true"
                        aria-label={`Follow @mrtuvn on GitHub`}
                    >GitHub</a>
                </div>
                <div className="social-share-item social-share-item--twitter">
                    <a
                        href="https://twitter.com/intent/tweet?screen_name=tuna2191"
                        className="twitter-share-button"
                    >Tweet me</a>
                </div>
            </div>
        );
    }
}

 export default SocialShare