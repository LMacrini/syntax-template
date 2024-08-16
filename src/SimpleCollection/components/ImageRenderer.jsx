import React from "react";
import { Icon, Image, getPageProfile } from "@uniwebcms/module-sdk";

function getImageInfo({ url, alt, value, info }) {
	return {
		url,
		alt,
		value: value || info?.identifier,
	};
}

export default function ImageRenderer({ content, ...props }) {
	if (!content) return null;

	if (typeof content === "string" || content.type === "Icon") {
		return <Icon icon={content.attrs?.svg ?? content} {...props} />;
	}

	if (typeof content === "object") {
		const imageInfo = getImageInfo(content);
		return <Image profile={getPageProfile()} {...imageInfo} {...props} />;
	}

	return null;
}

ImageRenderer.defaultProps = {
	content: null,
};
