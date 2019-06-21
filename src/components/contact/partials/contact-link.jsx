import React from 'react';

const imgSrc = require.context('./../../../img/icons', true);

const ContactLink = (props) =>  {
	const ICON_SIZE = 16;

	return (
		<div className={`contact-item text-size--s${props.modifier ? props.modifier : ''}`}>
			<span className="inline-block align--v--t">
				<div className="table-cell contact-item-image-wrap align--v--m align--h--r pr--05">
					<img
						className="contact-item-image"
						src={imgSrc(`./${props.iconName}.svg`)}
						width={props.size ? props.size : ICON_SIZE}
						height={props.size ? props.size : ICON_SIZE}
						alt={props.title}/>
				</div>
				<div className="table-cell pr--03">{props.name ? props.name : `${props.iconName}:`}</div>
			</span>
			<span className="inline-block align--v--t">
				<a
					className="link"
					href={props.link}
					title={props.title}
					onClick={props.gaEvent}
					rel="noopener noreferrer"
					target="_blank">
					{
						Array.isArray(props.text)
							? props.text.map((html, i) => <span key={i}>{html}</span>)
							: props.text
					}
				</a>
			</span>
		</div>
	);
};

export default ContactLink
